import di from '../../di';
import botManager from '../../lib/BotManager';
const db = di.get('db');
const UserModel = db.models.users;
const TradeModel = db.models.trades;
const SkinDataModel = db.models.SkinData;
const UserItemsCacheModel = db.models.UserItemsCache;
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

export default class HandleAcceptDepositOffer {
    async exec({offer}) {
        const userSteamID = offer.partner.getSteamID64();
        const offerID = offer.id;
        const trade = TradeModel.findOneAndUpdate({
            offerID,
            status: TRADE_STATUS.SENT
        }, {status: TRADE_STATUS.ACCEPTED}, {new: true});
        if (!trade) {
            return;
        }
        //Items in this offer object have old assetIDs (from owner), so we have to get new assetIDs
        const items = await this.__getReceivedItems(offer);
        const itemsToReceive = offer.itemsToReceive;

        const itemsNames = [];
        const itemsData = {};
        let price = 0;

        //Getting data
        itemsToReceive.forEach(item => {
            itemsNames.push(item.market_hash_name);
        });
        const data = await SkinDataModel.find({market_hash_name: {$in: itemsNames}});

        data.forEach(skinData => {
            itemsData[skinData.market_hash_name] = skinData;
        });

        //Saving
        itemsToReceive.forEach(async (item, i) => {
            console.log('isssssss');
            console.log(item);
            price += itemsData[item.market_hash_name].price;
            try {
                await UserItemsCacheModel.findOneAndRemove({assetID: item.assetid});
                const inventoryItem = {
                    assetID: items && items[i] ? items[i].assetid : items[i].assetid,
                    botID: trade.bot,
                    name: item.market_hash_name,
                    status: !items || !items[i] ? ITEM_STATUS.DEPOSIT_WITH_ERROR : ITEM_STATUS.FREE,
                    data: itemsData[item.market_hash_name],
                    price: itemsData[item.market_hash_name].price,
                };
                await new InventoryItemModel(inventoryItem).save();
            } catch (error) {
                console.error(error);
            }
        });

        let user = await UserModel.findOneAndUpdate(
            {_id: userSteamID},
            {
                $inc: {
                    balance: price * 1000,
                    totalDeposit: price * 1000,
                },
                $set: {tradeStatus: USER_TRADE_STATUS.FREE},
            },
            {
                new: true,
            }
        );
        // trade.status = TRADE_STATUS.ACCEPTED;
        trade.price = price;
        await trade.save();


    }

    __getReceivedItems(offer) {
        return new Promise((resolve, reject) => {
            offer.getReceivedItems(true, (err, items) => {
                if (!err) {
                    resolve(items);
                } else {
                    console.error(err);
                    resolve([]);
                }
            });
        })
    }


}