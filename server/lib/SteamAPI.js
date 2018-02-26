import request from 'request-promise';
import db from '../../db';

const ItemsData = db.models['items_data'];

export default class SteamAPI{
    static async loadUserInventory (userID){
        const options = {
            method: 'GET',
            uri: `https://api.steamapi.io/user/inventory/${userID}/730/2?key=bf16328ce7546c966772e8544f77da89`,
            json: true,

        };

        const result = await request(options);
        await SteamAPI.getPrices(result);
        console.log(result);
        return result;
    }

    static async getPrices(items) {
        for (let i in items) {
            const item = items[i];
            const data = await ItemsData.findOne({market_hash_name: item.market_hash_name});

            if (data && item.tradable && item.marketable) {
                item.itemData = data;
            } else {
                delete items[i];
            }
        }
    }
}
