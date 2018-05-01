import di from '../../di';
import botManager from '../../lib/BotManager';
const db = di.get('db');
const UserModel = db.models.users;
const TradeModel = db.models.trades;
const InventoryItemModel = db.models.InventoryItem;

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
const WITHDRAW_STATUS = {
    "DEFAULT": "DEFAULT",
    "USER_STATUS": "USER_STATUS",
    "BALANCE": "BALANCE",
    "ITEMS": "ITEMS",
};
const priceRate = 1000;

export default class CreateDepositOffer {
    async exec({ids, userID}) {
        let status = WITHDRAW_STATUS.DEFAULT;
        const items = [];
        const botsItems = {};
        const offerLinks = [];
        let price = 0;
        const successTrades = [];

        try {
            if (ids.length > MAX_ITEMS_IN_TRADE) {
                throw new Error('Max items in trade is ' + MAX_ITEMS_IN_TRADE);
            } else if (!ids.length) {
                throw new Error('No items selected');
            }

            let user = await UserModel.findOneAndUpdate(
                {
                    _id: userID,
                    tradeStatus: USER_TRADE_STATUS.FREE
                },
                {
                    tradeStatus: USER_TRADE_STATUS.WITHDRAW_OFFER,
                }
            );
            if (!user) {
                throw new Error('User have no FREE status. Check active trade offers');
            }
            status = WITHDRAW_STATUS.USER_STATUS;
            if (!user.tradeURL) {
                throw new Error('No trade url');
            }

            for (let i = 0; i < ids.length; i++) {
                const item = await InventoryItemModel.findOneAndUpdate(
                    {
                        _id: ids[i],
                        status: ITEM_STATUS.FREE,
                        tradableFrom: {$lt: new Date()}
                    },
                    {status: ITEM_STATUS.WITHDRAW_OFFER},
                    {new: true})
                    .populate('data');

                if (!item || !item.data || !item.data.price) {
                    continue;
                }
                price += item.data.price;
                items.push(item);
                if (!botsItems[item.botID]) {
                    botsItems[item.botID] = [];
                }
                botsItems[item.botID].push(item);
            }
            status = WITHDRAW_STATUS.ITEMS;

            user = await UserModel.findOneAndUpdate(
                {
                    _id: userID,
                    balance: {$gte: price * priceRate},
                },
                {
                    $inc: {balance: -(price * priceRate)},
                    $set: {withdrawBalance: price * priceRate},
                }
            );
            if (!user) {
                throw new Error('Not enough balance');
            }
            status = WITHDRAW_STATUS.BALANCE;


            const botsLength = Object.keys(botsItems).length;
            let botCounter = botsLength;
            for (let key in botsItems) {
                try {
                    const {offer, bot} = await this.__createOffer(user.tradeURL, key);

                    let price = 0;
                    let itemsIDs = [];
                    offer.addMyItems(botsItems[key].map(item => {
                        price += item.data.price;
                        itemsIDs.push(item._id);
                        return {
                            assetid: item.assetID,
                            appid: 730,
                            contextid: 2,
                        }
                    }));
                    await this.__sendOffer(offer);
                    await this.__confirmOutstandingTrades(bot);
                    await new TradeModel({
                        type: TRADE_TYPE.WITHDRAW,
                        user: userID,
                        bot: key,
                        date: new Date(),
                        items: itemsIDs,
                        status: TRADE_STATUS.SENT,
                        offerID: offer.id,
                        price,
                    }).save();
                    offerLinks.push(`https://steamcommunity.com/tradeoffer/${offer.id}`);
                    successTrades.push(price);
                } catch (error) {
                    console.error(error);
                    botCounter--;
                    botsItems[key].forEach(async item => {
                        await InventoryItemModel.findByIdAndUpdate(
                            item._id,
                            {
                                status: ITEM_STATUS.FREE
                            }
                        )
                    })
                }
            }

            if (botCounter <= 0) {
                await UserModel.findOneAndUpdate(
                    {_id: userID},
                    {tradeStatus: USER_TRADE_STATUS.FREE}
                )
            }

            if (offerLinks.length) {
                offerLinks.unshift(`https://steamcommunity.com/profiles/${user._id}/tradeoffers`)
            } else {
                throw new Error('No valid items');
            }
            return {offerLinks};
        } catch (error) {
            switch (status) {
                case WITHDRAW_STATUS.BALANCE: {
                    let successPriceAmount;
                    if (successTrades.length === 0) {
                        successPriceAmount = 0
                    } else if (successTrades.length === 1) {
                        successPriceAmount = successTrades[0]
                    } else {
                        successPriceAmount = successTrades.reduce((prev, current) => prev + current);
                    }

                    await UserModel.findOneAndUpdate(
                        {_id: userID},
                        {
                            $inc: {balance: ((price - successPriceAmount) < price ? (price * priceRate) : ((price - successPriceAmount) * priceRate))},
                            $set: {withdrawBalance: successPriceAmount * priceRate},
                        }
                    );
                    console.info('FIX: ' + WITHDRAW_STATUS.BALANCE);
                }
                case WITHDRAW_STATUS.ITEMS: {
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        await InventoryItemModel.findOneAndUpdate(
                            {_id: item._id},
                            {status: ITEM_STATUS.FREE},
                        );
                        console.info('FIX: ' + WITHDRAW_STATUS.ITEMS);
                    }
                }
                case WITHDRAW_STATUS.USER_STATUS: {
                    if (!offerLinks.length) {
                        await UserModel.findOneAndUpdate(
                            {_id: userID},
                            {
                                tradeStatus: USER_TRADE_STATUS.FREE,
                            }
                        );
                        console.info('FIX: ' + WITHDRAW_STATUS.USER_STATUS);
                    }
                    break;
                }
                case WITHDRAW_STATUS.DEFAULT: {
                    console.info('FIX: ' + WITHDRAW_STATUS.DEFAULT);
                    break;
                }
                default: {
                    throw error
                }
            }

            if (offerLinks.length) {
                console.info('Send all success trades');
                return {offerLinks};
            } else {
                throw error;
            }
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

    __confirmOutstandingTrades(bot) {
        return new Promise((resolve, reject) => {
            bot.Trade.confirmOutstandingTrades((confirmations) => {
                resolve(confirmations);
            });
        })
    }

}