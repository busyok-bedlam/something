import di from '../../di';
import request from 'request-promise';

const config = di.get('config');
const ItemsData = di.get('db').models['items_data'];

export default class UpdatePrices {
    async exec() {
        try {
            console.log('Update items prices');
            const data = await this.downloadData(config.botsConfig.APP_ID);
            for (let item in data) {

                const oldItem = await ItemsData.findOne({'market_hash_name': item});
                if (oldItem) {
                    await ItemsData.findByIdAndUpdate(oldItem._id, {price: data[item]});
                }
            }
            console.log('Finish update items prices');
        } catch (error) {
            //TODO remove console.error
            console.error(error);
            return Promise.reject();
        }
    }

    async downloadData(app_id) {
        try {
            let options = {
                method: 'GET',
                uri: `https://api.steamapi.io/market/prices/${app_id}?key=7995737ad7afe6ce3e305ffade56fdcd`,
                json: true // Automatically stringifies the body to JSON
            };

            return await request(options);
        } catch (error) {
            //TODO remove cosole.error
            console.error(error);

            return Promise.reject();
        }
    }
}
