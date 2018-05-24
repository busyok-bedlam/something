import di from '../../di';
const db = di.get('db');
const InventoryItemModel = db.models.InventoryItem;
const config = di.get('config');
const ITEMS_PER_PAGE = 60;
import botManager from '../../lib/BotManager';

export default class LoadInventory {
    async exec({params}) {

        if(!params) {params = {}}
        const bots = botManager.getAccounts();
        const onlineBots = [];
        bots.forEach(bot => {
            if (bot.Auth.loggedIn) {
                onlineBots.push(bot.SteamID.getSteamID64());
            }
        });

        const options = {
            status: 'FREE',
            name: new RegExp(params.search || '', "i"),
            botID: {$in: onlineBots},
        };

        // if (tradable === 'true') {
        //     options.tradableFrom = {$lt: new Date()}
        // }

        if (parseInt(params.selectedGame)){
            options.gameID = parseInt(params.selectedGame);
        }

        console.log(options);

        const inventory = await InventoryItemModel.find(
            options,
            'name status assetID _id tradableFrom',
            {
                skip: (parseInt(params.page) || 0) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE,
                sort: {
                    price: parseInt(params.price) || 1
                }
            })
            .populate('data');

        return {
            inventory,
            params: {
                page: (parseInt(params.page) || 0),
                search: params.search || '',
                price: parseInt(params.price || 1),
                selectedGame: parseInt(params.selectedGame) || 0
            }
        };
    }
}