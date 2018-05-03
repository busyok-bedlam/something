import di from '../../di';
const db = di.get('db');
const SkinDataModel = db.models.SkinData;
const config = di.get('config');
console.log(config);
const SteamApiIO = di.get('SteamApiIO');
SteamApiIO.setKey('4bd8e38ac4c67172ffcd96e92ceafaf7');

export default class UpdateItems {
    async exec() {
        for (const key in config.MARKETPLACE_GAMES) {
            await this.updateSkinsData(key);
            await this.updateSkinsPrices(key);
        }
    }

    async updateSkinsData(key) {
        const items = await SteamApiIO.getItemsData(key);
        for (let name in items) {
            await SkinDataModel.findOneAndUpdate(
                {
                    market_hash_name: name,
                    gameID: key,
                },
                {...items[name], gameID: key},
                {
                    upsert: true,
                },
            )
        }
    }

    async updateSkinsPrices(key) {
        const prices = await SteamApiIO.getItemsPrices(key);
        for (let name in prices) {
            await SkinDataModel.findOneAndUpdate(
                {
                    market_hash_name: name,
                    gameID: key,
                },
                {price: prices[name]},
            )
        }
    }
}