import di from '../../di';
import request from 'request-promise';

const config = di.get('config');
const db = di.get('db');
const {URLS, apiKey} = config;
const ItemsData = db.models['items_data'];

export default class DownloadUserInventory {
    async exec({userID, appID}) {
        const data = await this.downloadData(userID, appID);
        await this.getPrices(data);

        return data;
    }

    async downloadData(userID, appID) {
        try {
            let options = {
                method: 'GET',
                uri: URLS.STEAM_API.USER_INVENTORY
                    .replace('${userID}', userID)
                    .replace('${appID}', appID)
                    .replace('${apiKey}', apiKey),
                json: true
            };

            return await request(options);
        } catch (error) {
            //TODO remove cosole.error
            console.error(error);

            return Promise.reject();
        }
    }

    async getPrices(items) {
        for (let i in items) {
            const item = items[i];
            const data = await ItemsData.findOne({market_hash_name: item.market_hash_name})

            if (data && item.tradable && item.marketable) {
                item.price = data.price;
            } else {
                delete items[i];
            }
        }
    }
}
