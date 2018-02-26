import BotCollection from './BotCollection';
import di from '../../di';

const db = di.get('db');
const ItemsModel = db.models.items;
const UserModel = db.models.users;

class Marketplace {

    constructor() {
        this.botCollection = new BotCollection();
    }

    //  create offer with random bot
    //  (!!! do not use for withdraw,
    // because bot selecting random, and items can not be in this bot)
    async createOffer(user, items, type, options, gameID) {
        const bot = this.botCollection.getMostFreeBot();
        if (bot && bot.user.publicIP) {
            return await bot.createOffer(user, items, type, options, gameID);
        } else {
            throw new Error('Bot is not logged in. Try later');
        }
    }

    //  create tradeOffer with bot with specific id
    async createOfferSpecificBot(botID, userObject, items, type, options) {
        try {
            const bot = this.botCollection.getBot(botID);
            // const user = await UserModel.findById(userID);

            if (!userObject) {
                throw new Error('No user to trade with specific bot');
            }

            if (!bot) {
                throw new Error('BOT NOT FOUND OR DISABLED');
            }
            return await bot.createOffer(userObject, items, type, options);
        } catch (error) {
            //TODO remove console.error
            console.error(error);

            throw error;
        }
    }

    //  replace items from one bot to another
    async botItemsTransfer(bot1, bot2, items, options) {
        const botFrom = this.botCollection.getBot(bot1);
        const botTo = this.botCollection.getBot(bot2);

        if(!botFrom || !botTo){
            throw new Error('Error in bot items transfer. BotFrom: '+bot1+' BotTo: '+bot2+' items: '+items.toString());
        } else {
            return await botFrom.createOfferBot(botTo, items, options);
        }
    }


    // get inventory in shop (dynamic params)
    async getShopInventory(query = {}, sort = {}, populates = []) {

        return await ItemsModel
            .find(query, ['user', 'isSteam', 'gameID', 'steamOptions.itemData', 'steamOptions.exterior', 'price', 'enabled', 'status'])
            .populate(populates[0] ? populates[0] : '', populates[1]);
    }
}

export default new Marketplace();