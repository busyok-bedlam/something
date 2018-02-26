import di                  from '../../di';
import steamBots           from '../../lib/steamBots';
import NotificationEmitter from '../../lib/notificationEmitter';
const NE = new NotificationEmitter();
const db = di.get('db');
const config = di.get('config');
const ItemsModel = db.models.items;
const TradesModel = db.models.trades;
const UserModel = db.models.users;
const {TRADE_STATUS, TRADE_TYPE, ITEM_STATUS} = config.botsConfig;

export default class CreateWithdrawOffer {
    async exec(data) {

        let {
            userID,
            ids
        } = data;

        const user = await UserModel.findById(userID);
        if (!user || !user.tradeURL) {
            throw new Error('No user trade URL');
        }

        if (!ids || !ids.length) {
            throw new Error('No ids');
        }
        await ItemsModel.update({
                assetID: {$in: ids},
                user: userID,
                status: ITEM_STATUS.FREE,
                enabled: true,
            },
            {
                status: ITEM_STATUS.IN_WITHDRAW,
                enabled: false,
            },
            {
                multi: true,
            }
        );

        const items = await ItemsModel.find({
                assetID: {$in: ids},
                user: userID,
                status: ITEM_STATUS.IN_WITHDRAW,
                enabled: false,
            },
        );

        const assetIDs = {};
        items.forEach(item => {
            if (!assetIDs[item.botID]) {
                assetIDs[item.botID] = [];
            }
            assetIDs[item.botID].push(item.assetID);
        });

        const returnIDs = [];

        for (let botID in assetIDs) {
            returnIDs.concat(assetIDs[botID]);
            await steamBots.createOfferSpecificBot(
                botID,
                {userID, tradeURL: user.tradeURL},
                assetIDs[botID],
                'withdraw',
                {
                    onOfferCancel: this.onOfferCancel.bind(this),
                    onOfferComplete: this.onOfferComplete.bind(this),
                    onOfferSent: this.onOfferSent.bind(this),
                },
            );
        }

        return {ids: returnIDs};
    }

    async onOfferCancel(offer) {
        try {
            console.info("OFFER CANCEL | SERVICE | RemoveItemFromSell");
            const trade = await TradesModel.findOneAndUpdate(
                {offerID: offer.id},
                {status: TRADE_STATUS.CANCELED}
            );
            const {itemsToGive} = offer;
            const ids = [];
            itemsToGive.forEach(item => {
                ids.push(item.id);
            });
            await ItemsModel.update(
                {
                    assetID: {$in: ids},
                    user: trade.userID,
                },
                {
                    $set: {
                        status: ITEM_STATUS.FREE,
                        enabled: true,
                    }
                },
                {
                    multi: true,
                }
            );
        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }
    }

    async onOfferComplete(offer) {
        try {
            console.info("OFFER COMPLETE | SERVICE | RemoveItemFromSell");
            const trade = await TradesModel.findOneAndUpdate({offerID: offer.id}, {status: TRADE_STATUS.ACCEPTED});
            const {itemsToGive} = offer;
            const ids = [];
            itemsToGive.forEach(item => {
                ids.push(item.id);
            });
            await ItemsModel.update(
                {
                    assetID: {$in: ids},
                    user: trade.userID,
                },
                {
                    $set: {status: ITEM_STATUS.WITHDRAW_DONE},
                },
                {
                    multi: true,
                }
            );
            const items =  await ItemsModel.find({
                assetID: {$in: ids},
                user: trade.userID,
            });
            items.forEach(item=>{
                trade.items.push({itemID: item._id});
            });
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
                type: TRADE_TYPE.WITHDRAW,
                items: [],
            });

            await trade.save();
        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }
    }
}

