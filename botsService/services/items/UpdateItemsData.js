import di from '../../di';
import request from 'request-promise';

const config = di.get('config');
const ItemsData = di.get('db').models['items_data'];

export default class UpdateItemsData {
    async exec() {
        try {
            console.log('Start update items data');
            const data = await this.downloadData(config.botsConfig.APP_ID);
            for (let item in data) {

                const oldItem = await ItemsData.findOne({'market_hash_name': item});
                if (oldItem) {
                    await ItemsData.findByIdAndUpdate(oldItem._id, data[item]);
                } else {
                    const newItem = new ItemsData(data[item]);
                    await newItem.save();
                }
            }
            console.log('Finish update items data');
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
                uri: `https://api.steamapi.io/market/items/${app_id}?key=bf16328ce7546c966772e8544f77da89`,
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
