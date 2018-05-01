import di from '../../di';
const db = di.get('db');
const UserModel = db.models.users;
const TradeModel = db.models.trades;

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

export default class HandleCancelDepositOffer {
    async exec({offer}) {
        const userSteamID = offer.partner.getSteamID64();
        const offerID = offer.id;
        await UserModel.findOneAndUpdate(
            {_id: userSteamID},
            {tradeStatus: USER_TRADE_STATUS.FREE},
        );
        await TradeModel.findOneAndUpdate(
            {offerID},
            {status: TRADE_STATUS.CANCELED}
        );
    }
}