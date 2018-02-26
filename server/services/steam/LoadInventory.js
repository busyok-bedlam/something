import di from '../../di';
const db = di.get('db');
const ItemsModel = db.models.items;
const config = di.get('config');

export default class LoadSteamInventory {
    async exec({userID}){
        const items = await ItemsModel.find({
            user: userID,
            status: {$ne: config.botsConfig.ITEM_STATUS.WITHDRAW_DONE}
        })
            .populate('itemData');
        return {items};
    }
}