import request from 'request-promise';
import db from '../../../db';

const ItemsData = db.models['items_data'];
const BotsModel = db.models.bots;

export default class SteamAPI{
    static async loadUserInventory (userID, app_id){
        const options = {
            method: 'GET',
            uri: `https://api.steamapi.io/user/inventory/${userID}/${app_id}/2?key=216bf5941bc32a942e83096e052a17be`,
            json: true,
        };

        const result = await request(options);
        await SteamAPI.getPrices(result);
        return result;
    }

    static async getPrices(items) {
        for (let i in items) {
            const item = items[i];
            const data = await ItemsData.findOne({market_hash_name: item.market_hash_name});

            if (data && item.tradable && item.marketable) {
                item.itemData = data;
                item.app_id = data.app_id;
            } else {
                delete items[i];
            }
        }
    }
}
