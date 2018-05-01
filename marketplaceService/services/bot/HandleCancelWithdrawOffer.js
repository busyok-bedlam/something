import di from '../../di';
const db = di.get('db');
const UserModel = db.models.users;
const TradeModel = db.models.trades;
const InventoryItemModel = db.models.InventoryItem;

const TRADE_STATUS = {
    SENT: "SENT",
    ACCEPTED: "ACCEPTED",
    CANCELED: "CANCELED",
};
const USER_TRADE_STATUS = {
    FREE: "FREE",
    DEPOSIT_OFFER: "DEPOSIT_OFFER",
    WITHDRAW_OFFER: "WITHDRAW_OFFER",
};
const ITEM_STATUS = {
    FREE: "FREE",
    DEPOSIT_OFFER: "DEPOSIT_OFFER",
    WITHDRAW_OFFER: "WITHDRAW_OFFER",
    SOLD: "SOLD",
    DEPOSIT_WITH_ERROR: "DEPOSIT_WITH_ERROR",
};
const priceRate = 1000;

export default class HandleCancelDepositOffer {
    async exec({offer}) {
        const userSteamID = offer.partner.getSteamID64();
        const offerID = offer.id;
        const trade = await TradeModel.findOneAndUpdate(
            {offerID, status: TRADE_STATUS.SENT},
            {status: TRADE_STATUS.CANCELED}
        );
        if (!trade) {
            return;
        }
        const user = await UserModel.findOneAndUpdate(
            {_id: userSteamID},
            {
                $inc: {
                    withdrawBalance: -(trade.price * priceRate),
                    balance: trade.price * priceRate
                }
            },
            {new: true},
        );
        if (user.withdrawBalance <= 0) {
            user.withdrawBalance = 0;
            user.tradeStatus = USER_TRADE_STATUS.FREE;
            await user.save();
        }
        offer.itemsToGive.forEach(async item => {
            await InventoryItemModel.findOneAndUpdate(
                {assetID: item.id, status: ITEM_STATUS.WITHDRAW_OFFER},
                {status: ITEM_STATUS.FREE},
            );
        })
    }
}