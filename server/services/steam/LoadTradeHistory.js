import di from '../../di';
const db = di.get('db');
const TradesModel = db.models.trades;
const config = di.get('config');

export default class LoadTradeHistory {
    async exec({userID, type}){
        const trades = await TradesModel.find({
            userID: userID,
            type,
        })
            .populate('items');
        return {trades};
    }
}