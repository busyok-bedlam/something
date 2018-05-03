import di from '../../di';
import botManager from '../../lib/BotManager';
const db = di.get('db');
const UserModel = db.models.users;
const TradeModel = db.models.trades;

const TRADE_STATUS = {
    SENT: "SENT",
    ACCEPTED: "ACCEPTED",
    CANCELED: "CANCELED",
};
const ITEM_STATUS = {
    FREE: "FREE",
    DEPOSIT_OFFER: "DEPOSIT_OFFER",
    WITHDRAW_OFFER: "WITHDRAW_OFFER",
    SOLD: "SOLD",
    DEPOSIT_WITH_ERROR: "DEPOSIT_WITH_ERROR",
};
const USER_TRADE_STATUS = {
    FREE: "FREE",
    DEPOSIT_OFFER: "DEPOSIT_OFFER",
    WITHDRAW_OFFER: "WITHDRAW_OFFER",
};
const TRADE_TYPE = {
    DEPOSIT: "DEPOSIT",
    WITHDRAW: "WITHDRAW",
};
const MAX_ITEMS_IN_TRADE = 10;

export default class CreateDepositOffer {
    async exec({ids, userID}) {
        try {
            if (ids.length > MAX_ITEMS_IN_TRADE) {
                throw new Error('Max items in trade is ' + MAX_ITEMS_IN_TRADE);
            } else if (!ids.length) {
                throw new Error('No items selected');
            }
            const user = await UserModel.findOneAndUpdate(
                {
                    _id: userID,
                    tradeStatus: USER_TRADE_STATUS.FREE
                },
                {
                    tradeStatus: USER_TRADE_STATUS.DEPOSIT_OFFER,
                }
            );
            if (!user) {
                throw new Error('User have no FREE status. Check active trade offers');
            } else if (!user.tradeURL) {
                throw new Error('No trade url');
            }
            const {offer, bot} = await this.__createOffer(user.tradeURL);

            offer.addTheirItems(ids.map(id => {
                return {
                    assetid: id.assetID,
                    appid: id.gameID,
                    contextid: 2,
                }
            }));
            await this.__sendOffer(offer);
            await new TradeModel({
                type: TRADE_TYPE.DEPOSIT,
                user: userID,
                userName: user.nickname,
                bot: bot.Community.Auth.BotAccount.SteamID.getSteamID64(),
                date: new Date(),
                items: ids,
                status: TRADE_STATUS.SENT,
                offerID: offer.id,
            }).save();
            return offer;
        } catch (error) {
            await UserModel.findOneAndUpdate(
                {_id: userID},
                {tradeStatus: USER_TRADE_STATUS.FREE}
            );
            throw error;
        }
    }

    __sendOffer(offer, counter = 1) {
        return new Promise((resolve, reject) => {
            offer.send(async (error, status) => {
                try {
                    if (error) {
                        if (error.message.indexOf('Please try again later') >= 0) {
                            console.info(error.message);
                            console.info('Resending offer');
                            if (counter < 10) {
                                setTimeout(() => resolve(this.__sendOffer(offer, counter + 1)), 1000);
                            } else {
                                reject(new Error('Can not send offer (10 fails)'));
                            }
                        } else {
                            console.error('Error in sending offer');
                            console.error(error);
                            reject(error);
                        }
                    } else {
                        resolve(offer);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        })
    }

    __createOffer(userSteamID, botID = false) {
        return new Promise(async (resolve, reject) => {
            try {
                const bot = await this.__getBot(botID);

                bot.Trade.createOffer(userSteamID, (err, offer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({offer, bot});
                    }
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    __getBot(botID) {
        return new Promise(async (resolve, reject) => {
            const bot = botID ? await this.__findBot(botID) : botManager.randomBot();
            if (!bot) {
                reject(new Error('Bot not found'));
            }
            const loggedIn = await this.__loggedIn(bot);
            if (!loggedIn) {
                let timeoutID = setTimeout(() => reject('Bot not auth'), 10000);
                bot.on('loggedIn', () => {
                    clearTimeout(timeoutID);
                    resolve(bot)
                });
                bot.Auth.loginAccount();
            } else {
                resolve(bot);
            }
        });
    }

    __findBot(key) {
        return new Promise((resolve, reject) => {
            botManager.findBot(key, (error, bot) => {
                if (!error) {
                    return resolve(bot);
                } else {
                    reject(error);
                }
            })
        })
    }

    __loggedIn(bot) {
        return new Promise((resolve, reject) => {
            bot.community.loggedIn((err, loggedIn) => {
                if (err) {
                    reject(err);
                } else if (loggedIn) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })
    }

}