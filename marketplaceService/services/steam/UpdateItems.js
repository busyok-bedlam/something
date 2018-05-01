import di from '../../di';
const db = di.get('db');
const SkinDataModel = db.models.SkinData;
const config = di.get('config');
const SteamApiIO = di.get('SteamApiIO');
SteamApiIO.setKey('4bd8e38ac4c67172ffcd96e92ceafaf7');

export default class UpdateItems {
    async exec(){
      await this.updateSkinsData();
      await this.updateSkinsPrices();
    }

    async updateSkinsData() {
        const items = await SteamApiIO.getItemsData();
        for (let name in items) {
            await SkinDataModel.findOneAndUpdate(
                {
                    market_hash_name: name,
                },
                items[name],
                {
                    upsert: true,
                },
            )
        }
    }

    async updateSkinsPrices() {
        const prices = await SteamApiIO.getItemsPrices();
        for (let name in prices) {
            await SkinDataModel.findOneAndUpdate(
                {
                    market_hash_name: name,
                },
                {price: prices[name]},
            )
        }
    }
}