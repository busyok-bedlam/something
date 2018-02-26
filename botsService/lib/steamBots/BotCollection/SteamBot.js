import di from "../../../di";
import EOfferFilter from "steam-tradeoffer-manager/resources/EOfferFilter";
import ETradeOfferState from "steam-tradeoffer-manager/resources/ETradeOfferState";
import SteamUser        from 'steam-user';
import steamTotp        from 'steam-totp';
import Community        from 'steamcommunity';
import TradeOfferManager from 'steam-tradeoffer-manager';

const TradesModel = di.get('db').models.trades;
const UsersModel = di.get('db').models.users;
const BotsModel = di.get('db').models.bots;
const ItemsModel = di.get('db').models.items;

export default class SteamBot {

    constructor(data, options) {
        Object.assign(this, data);
        this.point = 0;
        this.community = new Community();
        this.user = new SteamUser(null, {promptSteamGuardCode: false});
        this.manager = new TradeOfferManager({
            steam: this.user,
            community: this.community,
            domain: "localhost",
            language: "en",
            pollInterval: 15000,
        });
        this.options = options;
        this.__sessionExpired = false;

    }

    async __onSession() {
        try {
            const webCookies = await this.__onSessionWebSession();
            await this.__onSessionSetCookies(webCookies);

            this.manager.on("newOffer", this.acceptOffer.bind(this));
            this.manager.on("sentOfferChanged", this.changeOffer.bind(this));
            this.manager.on("pollFailure", this.__onPollFailure.bind(this));

            this.cancelAllOffers();

            console.info(`Bot "${this.account_name}" is running.`);
            return {};
        } catch (error) {
            //TODO remove console.error
            console.error(error);

            return new Error("ERROR SETTING BOT SESSION");
        }
    }

    __onSessionWebSession() {
        return new Promise(resolve => {
            this.user.on('webSession', (sessionID, webCookie) => {
                resolve(webCookie);
            });
        })
    }

    __onSessionSetCookies(webCookie) {
        return new Promise((resolve, reject) => {
            this.manager.setCookies(webCookie, err => {
                if (err) {
                    //TODO remove console.error
                    console.error(err);

                    if (err.message != "Access Denied") {
                        return reject(err);
                    }
                } else {
                    resolve({});
                }
            });
        });
    }

    __onGuard = () => {
        return new Promise((resolve, reject) => {
            this.user.on('steamGuard', (domain, callback) => {
                steamTotp.getTimeOffset((err, offset) => {
                    if (err) {
                        return reject(err);
                    }
                    const code = steamTotp.getAuthCode(this.shared_secret, offset);

                    callback(code);
                    resolve();
                });
            });
        });
    };

    __onPollFailure(error) {
        //TODO remove console.error
        console.error(error);
        console.error('ON POLL FAILURE');
        console.error(error.message);

        if (this.options.onPollFailure) {
            this.options.onPollFailure(this._id);
        }
    }

    __onSessionExpired(error) {
        //TODO remove console.error
        console.error('ON SESSION EXPIRED');
        console.error(error);
        console.log(this.options);
        if (this.options.onSessionExpired && !this.__sessionExpired) {
            console.log(`Restarting ${this.account_name}`);
            this.__sessionExpired = true;
            this.options.onPollFailure(this._id);
        }
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    __getInventory(gameID) {
        return new Promise((resolve, reject) => {
            this.manager.getInventoryContents(gameID, 2, true, (error, inventory) => {
                if (error) {
                    //TODO remove console.error
                    console.error(error);
                    reject(error);
                } else {
                    resolve(inventory);
                }
            });
        })

    }

    __confirmOffer(offer) {
        return new Promise((resolve, reject) => {
            this.community.acceptConfirmationForObject(
                this.identity_secret, offer.id, err => {
                    err ? reject(err) : resolve()
                }
            );
        });
    }

    __sendOffer(offer) {
        const options = offer.data('options');
        const type = offer.data('type');

        return new Promise((resolve, reject) => {
            offer.send(async (error, status) => {
                try {
                    if (error) {
                        if(error.message.indexOf('Please try again later') >=0){
                            console.info(error.message);
                            console.log('Resending offer');
                            resolve(this.__sendOffer(offer));
                        } else {
                            console.error('Error in offer type: '+type);
                            console.error(error);
                            reject(error);
                        }

                    } else {
                        if (options.onOfferSent) {
                            await options.onOfferSent(offer, this);
                        }
                        resolve(offer);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        })
    }

    __selectItem(inventory, items) {
        const itms = [];

        for (let i = 0; i < inventory.length; i++) {
            let item = inventory[i];
            if (items.indexOf(item.id) >= 0) {
                itms.push(item);
            }
        }

        return itms;
    }

    __loadPartnerInventory(offer, gameID) {
        return new Promise((resolve, reject) => {
            offer.loadPartnerInventory(gameID, 2, (error, inventory) => {
                if (!error) {
                    resolve(inventory);
                } else {
                    reject(error);
                }
            });
        })

    }

    __getReceivedItems(offer) {
        return new Promise(resolve => {
            offer.getReceivedItems(true, (err, items) => {
                if (!err) {
                    resolve(items);
                } else {
                    resolve(undefined);
                }
            });
        })
    }

    async acceptOffer(offer) {
        try {
            const partner = offer.partner.getSteamID64();

            //  find who did this offer, if bot or if admin user -> offer accept
            const user = await UsersModel.findById(partner);
            // const bot = await BotsModel.findOne({steamID: partner});
            //
            // if (bot) {
            //     offer.accept((error, status) => {
            //         if (error || status !== 'accepted') {
            //             setTimeout(this.acceptOffer.bind(this, offer), 60000);
            //         }
            //     });
            /*} else*/ if (user) {
                if (!user.isAdmin) return this.cancelOffer(offer);

                const newOffer = this.manager.createOffer(user.tradeURL);
                newOffer.data('type', 'adminOffer');
                newOffer.addMyItems(offer.itemsToGive);
                newOffer.addTheirItems(offer.itemsToReceive);
                this.__cancelAdminOffer(offer, newOffer);
            } else {
                this.cancelOffer(offer);
            }

        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }
    }

    __cancelAdminOffer(offer, newOffer) {
        //TODO fix error . throw error but offer is canceled
        offer.cancel(err => {
            // if (err) {
                //TODO  offer.data("error", true);
            // } else {
                newOffer.send((err, status) => {
                    if (err) {
                        return this.cancelOffer(newOffer);
                    }

                    if (newOffer.itemsToGive && newOffer.itemsToGive.length) {
                        this.__confirmOffer(newOffer)
                            .then((res) => {
                                console.info('ADMIN OFFER IS CONFIRMED');
                            })
                            .catch(err => {
                                console.error('ADMIN OFFER CONFIRMATION ERROR');
                                console.error(err);
                            })
                    }
                })
            // }
        });
    }

    cancelOffer(offer) {
        offer.cancel(err => {
            if (err) {
                offer.data("error", true);
            }
        })
    }

    cancelAllOffers() {
        this.manager
            .getOffers(EOfferFilter.ActiveOnly, (err, sent, received) => {
                if (err) {
                    //return this.disable(err);
                    return;
                }
                sent.concat(received).forEach(offer => this.cancelOffer(offer));
            })
    }

    async changeOffer(offer) {
        const isOurOffer = offer.isOurOffer;

        if (!isOurOffer) {
            return false;
        }

        switch (offer.state) {
            case ETradeOfferState.Accepted:
                console.info('OFFER ACCEPTED');
                await this.onOfferComplete(offer);
                break;

            case ETradeOfferState.Canceled:
                console.info('OFFER CANCELED');
                await this.onOfferCancel(offer);
                break;

            case ETradeOfferState.Declined:
                console.info('OFFER DECLINED');
                await this.onOfferCancel(offer);
                break;

            default:
                console.info('OFFER DEFAULT');
                break;

        }
    }

    async onOfferComplete(offer) {
        const options = offer.data('options');
        this.point -= this.point > 0 ? 1: 0;

        if (options && options.onOfferComplete) {
            options.onOfferComplete(offer, this, options);
        } else {
            console.error('onOfferComplete is NOT DEFINED ');
            console.error(options);
        }
    }

    async onOfferCancel(offer) {
        const options = offer.data('options');
        this.point -= this.point > 0 ? 1: 0;

        if (options && options.onOfferCancel) {
            options.onOfferCancel(offer, this);
        } else {
            console.error('onOfferCancel is NOT DEFINED ');
            console.error(options);
        }
    }

    // create offer with user
    // user - id | items - [array with items ids] | type - 'withdraw/deposit'
    // | options - {onOfferComplete: function, onOfferCancel: function, .......}
    async createOffer(user, items, type, options = {}, gameID = 730) {

        if (!user.tradeURL) {
            throw new Error("Trade url not found, set it in profile settings");
        }
        this.point++;


        if (type === 'deposit') {
            const offer = this.manager.createOffer(user.tradeURL);
            const userInventory = await this.__loadPartnerInventory(offer, gameID);
            const itms = this.__selectItem(userInventory, items);

            if (itms.length) {

                offer.data('options', options);

                offer.addTheirItems(itms);
                return await this.__sendOffer(offer);
            } else {
                throw new Error("ITEM NOT FOUND OR ITEM IS NOT TRADABLE");
            }

        } else if (type === 'withdraw') {
            const offer = this.manager.createOffer(user.tradeURL);
            offer.data('type', 'withdraw');
            offer.data('userID', user.userID);
            offer.data('options', options);
            offer.addMyItems(items.map(assetid => {
                return {
                    assetid,
                    appid: 730,
                    contextid: 2,
                }
            }));

            await this.__sendOffer(offer);
            await this.__confirmOffer(offer);
        } else {
            throw new Error("UNKNOWN OFFER TYPE");
        }
    }

    // creating offers between bots in shop
    // (use when need replace items to one bot, before creating
    // trade with user)
    async createOfferBot(botTo, items, options) {
        const offer = this.manager.createOffer(botTo.tradeURL);
        offer.data('type', 'botOffer');
        offer.data('options', options);
        const itemsData = await ItemsModel.find({
            'steamOptions.itemID': {$in: items}
        });
        offer.addMyItems(itemsData.map(item => {
            return {
                assetid: item.steamOptions.itemID,
                appid: item.gameID,
                contextid: 2,
            }
        }));
        await this.__sendOffer(offer);
        await this.__confirmOffer(offer);
    }

    //login bot and start working
    async run() {

        try {
            this.user.on('error', error => {
                //TODO remove console.error
                console.error('ERROR STEAM USER');
                console.error(error);

                if (this.options.onPollFailure) {
                    this.options.onPollFailure(this._id);
                }
            });

            this.community.on("sessionExpired", this.__onSessionExpired.bind(this));

            this.user.logOn({
                accountName: this.account_name,
                password: this.password
            });

            await this.__onGuard();
            await this.__onSession();

            return this;
        } catch (error) {
            //TODO remove console.error
            console.error(error);

            return undefined;
        }
    }
}
