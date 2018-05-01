// run "node botConfigCreator" in Terminal (it creates bot's config file in config/data)
const botManger = require('node-steam-bot-manager');
const bot = new botManger();
bot.startManager(err => bot.errorDebug('Failed to start Bot Manager'));