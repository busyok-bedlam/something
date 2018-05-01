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
const priceRate = 1000;

export default class HandleAcceptDepositOffer {
    async exec({offer}) {

        const userSteamID = offer.partner.getSteamID64();
        const offerID = offer.id;
        const trade = await TradeModel.findOneAndUpdate(
            {offerID, status: TRADE_STATUS.SENT},
            {status: TRADE_STATUS.ACCEPTED}
        );
        if (!trade) {
            return;
        }
        const user = await UserModel.findOneAndUpdate(
            {_id: userSteamID},
            {
                $inc: {
                    withdrawBalance: -(trade.price * priceRate),
                }
            },
            {new: true},
        );
        if (user.withdrawBalance <= 0) {
            user.withdrawBalance = 0;
            user.tradeStatus = USER_TRADE_STATUS.FREE;
            await user.save();
        }

        trade.items.forEach(async itemID => {
            await InventoryItemModel.findOneAndUpdate(
                {_id: itemID, status: ITEM_STATUS.WITHDRAW_OFFER},
                {status: ITEM_STATUS.SOLD},
            );
        })

    }
}