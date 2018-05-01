import di from '../../di';
const db = di.get('db');
const InventoryItemModel = db.models.InventoryItem;
const SkinDataModel = db.models.SkinData;
const config = di.get('config');
const ITEM_STATUS = {
    FREE: "FREE",
    DEPOSIT_OFFER: "DEPOSIT_OFFER",
    WITHDRAW_OFFER: "WITHDRAW_OFFER",
    SOLD: "SOLD",
    DEPOSIT_WITH_ERROR: "DEPOSIT_WITH_ERROR",
};
import botManager from '../../lib/BotManager';

export default class LoadInventory {
    async exec(){
        const bots = botManager.getAccounts();
        const botIDs = [];

        for (let i = 0; i < bots.length; i++) {
            const bot = bots[i];
            const botObj = await this.__findBot(bot.username);
            const items = await this.__getBotInventory(botObj);
            botIDs.push(bot.SteamID.getSteamID64());
            const assetIDs = [];

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                assetIDs.push(item.assetid);
                const savedItem = await InventoryItemModel.findOne({
                    assetID: item.assetid,
                    status: {$nin: [ITEM_STATUS.SOLD, ITEM_STATUS.DEPOSIT_WITH_ERROR]},
                });
                if (!savedItem) {
                    const itemData = await SkinDataModel.findOne({market_hash_name: item.market_hash_name});
                    if (!itemData || !item.tradable) {
                        continue;
                    }

                    const inventoryItem = {
                        assetID: item.assetid,
                        botID: bot.SteamID.getSteamID64(),
                        name: item.market_hash_name,
                        status: ITEM_STATUS.FREE,
                        data: itemData._id,
                        price: itemData.price,
                        tradableFrom: new Date(),
                    };
                    await new InventoryItemModel(inventoryItem).save();
                }
            }
            await InventoryItemModel.remove({assetID: {$nin: assetIDs}, status: ITEM_STATUS.FREE, botID: bot.SteamID.getSteamID64()})
        }
        await InventoryItemModel.remove({botID: {$nin: botIDs}, status: ITEM_STATUS.FREE})
    }

    async getSkinsData(names) {
        if (!names) {
            throw new Error('No items in params')
        }

        const skins = await SkinDataModel.find({market_hash_name: {$in: names}});
        const result = {};
        skins.forEach(skin => {
            result[skin.market_hash_name] = {
                name: skin.market_hash_name,
                price: skin.price,
                iconUrl: skin.icon_url,
                type: skin.type,
            }
        });
        return result;
    }

    __findBot(key) {
        return new Promise((resolve, reject) => {
            botManager.findBot(key, (error, bot) => {
                if (!error) {
                    return resolve(bot);
                } else {
                    reject(error);
                }
            })
        })
    }

    __getBotInventory(bot) {
        return new Promise(resolve => {
            bot.getInventory(730, 2, true, (error, items) => {
                if (!error) {
                    resolve(items);
                } else {
                    resolve([])
                }
            })
        })
    }
}