import di   from '../di';
import Base from './Base';

import SteamAPI from '../lib/SteamAPI';

const db = di.get('db');
const ItemsModel = db.models.items;
const BotsModel = db.models.bots;
const ItemsDataModel = db.models['items_data'];
const config = di.get('config');


export default class Bots extends Base {

    async listBots(ctx) {
        const {page, search, searchField, searchValue, botsSelectType} = ctx.query;
        const options = {};
        if (!page || page < 0) {
            throw new Error('Invalid page number');
        }
        if (search === 'true') {
            options[searchField] = {"$regex": searchValue, "$options": "i"};
        }
        if (botsSelectType && config.adminConfig.BOTS_PER_PAGE[botsSelectType]) {
            options.createdAt = {$gte: config.adminConfig.BOTS_PER_PAGE[botsSelectType].getValue()}
        }

        const bots = await BotsModel
            .find(options)
            .sort({createdAt: -1})
            .skip((page) * config.adminConfig.BOTS_PER_PAGE)
            .limit(config.adminConfig.BOTS_PER_PAGE);

        ctx.body = {bots};
    }

    async botInGameItems(ctx) {
        const {id, gameType} = ctx.query;
        let items = [];
        try {
            items = await ItemsModel.find({botID: id, user: '', app_id: gameType === 'csgo' ? 730 : 578080});
            ctx.body = {items};
        } catch (error) {
            console.error(error);
            ctx.body = {items};
        }
    }

    async botItems(ctx) {
        const {id, gameType} = ctx.query;

        let bot = await BotsModel.findOne({_id: id});
        let items = [];
        try {
            const botItems = await SteamAPI.loadUserInventory(bot.steamID, gameType === 'csgo' ? 730 : 578080);
            const inGameItems = await ItemsModel.find({botID: id});
            for (let i = 0; i < inGameItems.length; i ++){
                // let key = ;
                delete botItems[inGameItems[i].assetID];
            }

            for (let key in botItems) {
                const itemData = await ItemsDataModel
                    .findOne({'market_hash_name': botItems[key]['market_hash_name']});
                items.push({
                    name: botItems[key].market_hash_name,
                    // user: '',
                    assetID: botItems[key].assetid,
                    price: itemData.price,
                    // status: 'FREE',
                    // enabled: true,
                    botID: bot._id,
                    botSteamID: bot.steamID,
                    // itemData: itemData._id,
                    // tags: botItems[key].tags || [],
                })
            }
            ctx.body = {items};
        } catch (error) {
            console.error(error);
            ctx.body = {items};
        }
    }

    async deleteItems(ctx) {
        const {id, items, gameType} = ctx.request.body;
        for (let i = 0; i < items.length; i++) {
            await ItemsModel.remove({botID: id, user: '', _id: items[i], status: 'FREE', app_id: gameType === 'csgo' ? 730 : 578080});
        }

        return ctx.body = {
            botID: id,
        };
    }

    async addItems(ctx) {
        const {id, items, gameType} = ctx.request.body;
        let bot = await BotsModel.findOne({_id: id});
        const botItems = await SteamAPI.loadUserInventory(bot.steamID, gameType === 'csgo' ? 730 : 578080);
        for (let i = 0; i < items.length; i++){
            let newItem = new ItemsModel({
                name: botItems[items[i]].market_hash_name,
                user: '',
                assetID: botItems[items[i]].assetid,
                price: botItems[items[i]].itemData.price,
                status: 'FREE',
                enabled: true,
                botID: bot._id,
                botSteamID: bot.steamID,
                itemData: botItems[items[i]].itemData._id,
                tags: botItems[items[i]].tags || [],
                app_id: botItems[items[i]].app_id,
            });
            newItem = await newItem.save();
        }

        return ctx.body = {
            botID: id,
        };
    }
}
