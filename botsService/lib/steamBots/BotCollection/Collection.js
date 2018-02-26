import SteamBot from './SteamBot';
import di from '../../../di';

const db = di.get('db');
const model = db.model("bots");

export default class Collection {

    constructor() {
        this.onConstructor();
    }

    async onConstructor() {
        try {
            this.__container = {};
            const bots = await model.find({enabled: true});

            bots.forEach(async (botData) => {
                try {
                    this.__container[botData._id] = botData;
                    const steamBot = new SteamBot(
                        botData._doc,
                        {
                            onPollFailure: this.restartBot.bind(this),
                            onSessionExpired: this.restartBot.bind(this),
                        });

                    const bot = await steamBot.run();
                    bot.point = 0;

                    this.__container[botData._id] = bot;
                } catch (error) {
                    //TODO remove console.error
                    console.error(error);

                    this.disableBot(botData._id);
                }
            });
        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }
    }

    async disableBot(id) {
        try {
            await model.findByIdAndUpdate(id, {$set: {enabled: false}});
            const bot = this.__container[id];
            if (bot) {
                bot.cancelAllOffers && bot.cancelAllOffers();
                bot.manager && bot.manager.shutdown();
                bot.user && bot.user.logOff();
                delete this.__container[id];
            }

            return id;

        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }
    }

    async enableBot(id) {

        try {
            const foundBot = await model.findByIdAndUpdate(id, {$set: {enabled: true}}, {new: true});

            if (foundBot === null) {
                throw new Error("Bot was not found.")
            }

            const steamBot = new SteamBot(
                foundBot._doc,
                {
                    onPollFailure: this.restartBot.bind(this),
                    onSessionExpired: this.restartBot.bind(this),
                });
            this.__container[id] = await steamBot.run();
            this.__container[id].point=0;
            return id;
        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }
    }

    async restartBot(id) {
        await this.disableBot(id);
        setTimeout(this.enableBot.bind(this, id), 10000);
    }

    getBot(id) {
        return this.__container[id];
    }

    getBotsSteamURL() {
        let urls = [];
        for (let i in this.__container) {
            urls.push(this.__container[i].steamURL)
        }
        return urls;
    }

    isBotEnabled(id) {
        return (id in this.__container);
    }

    getMostFreeBot() {
        const container = this.__container;
        let bot = container[Object.keys(container)[0]];
        bot = bot && bot.user.publicIP ? bot : undefined;

        for (let i in container) {
            if (
                ((!bot ||bot.point === undefined) && container[i].point >=0 && container[i].user.publicIP) ||
                ((container[i].point < bot.point) && container[i].user.publicIP))
            {
                bot = container[i];
            }
        }
        if(bot && bot.user.publicIP){
            return bot;
        } else {
            throw new Error('No free bots. Try later!')
        }
    }
}