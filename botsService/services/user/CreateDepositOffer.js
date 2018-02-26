import di from '../../di';
import steamBots from '../../lib/steamBots';
import NotificationEmitter from '../../lib/notificationEmitter';
const NE = new NotificationEmitter();
const db = di.get('db');
const config = di.get('config');
const ItemsModel = db.models.items;
const ItemsDataModel = db.models['items_data'];
const TradesModel = db.models.trades;
const BotsModel = db.models.bots;
const UserModel = db.models.users;
const {TRADE_STATUS, TRADE_TYPE, ITEM_STATUS, ITEM_INVENTORY_STATUS, MIN_ITEM_PRICE, MAX_ITEM_PRICE} = config.botsConfig;

export default class CreateDepositOffer {
    async exec(data) {

        let {
            userID,
            assetIDs
        } = data;

        const user = await UserModel.findById(userID);
        if (!user || !user.tradeURL) {
            throw new Error('No user trade URL');
        }

        return await steamBots.createOffer(
            {userID, tradeURL: user.tradeURL},
            assetIDs,
            'deposit',
            {
                // price,
                onOfferCancel: this.onOfferCancel.bind(this),
                onOfferComplete: this.onOfferComplete.bind(this),
                onOfferSent: this.onOfferSent.bind(this),
            },
            config.botsConfig.APP_ID,
        );
    }

    async onOfferCancel(offer, bot) {
        try {
            console.info("OFFER CANCEL | SERVICE | CreateDepositOffer");
            const trade = await TradesModel.findOneAndUpdate({offerID: offer.id}, {status: 'canceled'});
            await NE.send(trade.user, `Offer #${offer.id}: Canceled`);
            await NE.sendEvent(trade.user, {
                type: TRADE_STATUS.CANCELED,
                message: 'Offer canceled',
                offerID: offer.id
            });
        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }

    }

    async onOfferComplete(offer, bot, options) {

        try {
            console.info("OFFER COMPLETE | SERVICE | MoveItemToSell");

            const itemsToReceive = await bot.__getReceivedItems(offer);
            const trade = await TradesModel.findOneAndUpdate({offerID: offer.id}, {status: TRADE_STATUS.ACCEPTED});
            // await BotsModel.findByIdAndUpdate(bot._id, {$inc: {itemsCount: 1}});

            const user = await UserModel.findById(offer.partner.getSteamID64());
            if(!user){
                return null;
            }
            for (let i = 0; i < itemsToReceive.length; i++) {
                const item = itemsToReceive[i];
                const itemData = await ItemsDataModel
                    .findOne({'market_hash_name': item['market_hash_name']});

                let newItem = new ItemsModel({
                    name: itemData.market_hash_name,
                    user: user._id,
                    assetID: item.assetid,
                    // price: options.price,
                    status: ITEM_STATUS.FREE,
                    enabled: true,
                    botID: bot._id,
                    botSteamID: bot.steamID,
                    itemData: itemData._id,
                    tags: item.tags || [],
                    // itemInventoryStatus: ITEM_INVENTORY_STATUS.BOT_OWNER,

                });
                newItem = await newItem.save();
                trade.items.push({itemID: newItem._id});
                // await NE.send(newItem.user, `ITEM "${newItem.name}": RECEIVED`);
                // await NE.sendEvent(newItem.user, {
                //     type: STEAM_ITEM_TO_SELL_COMPLETED,
                //     offerID: offer.id
                // });
            }

            await trade.save();
        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }

    }

    async onOfferSent(offer, bot) {
        try {
            const partner = offer.partner.getSteamID64();
            const user = await UserModel.findById(partner);
            const trade = new TradesModel({
                status: TRADE_STATUS.SENT,
                userID: user._id,
                botID: bot._id,
                offerID: offer.id,
                type: TRADE_TYPE.DEPOSIT,
                items: [],
            });

            await trade.save();
            // await NE.send(trade.user, `Moving item to sell. Accept offer on your Steam account`);
            // await NE.sendEvent(partner, {
            //     type: STEAM_ITEM_TO_SELL_SENT,
            //     offerID: offer.id
            // });
        } catch (error) {
            //TODO remove console.error
            console.error(error);

            throw new Error(error.message);
        }
    }

    __getExterior(descriptions) {
        for (let i = 0; i < descriptions.length; i++) {
            const item = descriptions[0];
            if (item.value.indexOf('Exterior:') >= 0) {
                let value = item.value;
                value = value.replace('Exterior:', '').replace(' ', '');
                return value;
            }
        }

        return 'unknown';
    }

    __getInspectLink(item, botSteamID) {
        let value = undefined;
        for (let i = 0; i < item.actions.length; i++) {
            const action = item.actions[0];
            if (action.name === 'Inspect in Game...') {
                value = action.link;
            }
        }

        if (value) {
            value = value
                .replace('%owner_steamid%', botSteamID)
                .replace('%assetid%', item.id);

            return value;
        } else {
            return null;
        }
    }
}

