import di from '../../di';
const db = di.get('db');
const UserModel = db.models.users;
const UserItemsCacheModel = db.models.UserItemsCache;
const SkinDataModel = db.models.SkinData;
const config = di.get('config');
const SteamApiIO = di.get('SteamApiIO');
const ITEMS_PER_PAGE = 60;

export default class LoadInventory {
    async exec({userID, params}){
        if(!params) { params = {}}

        let user = await UserModel.findOneAndUpdate(
            {
                _id: userID,
                needInventoryUpdate: {$lte: new Date()},
            },
            {
                needInventoryUpdate: new Date() + (1000 * 60 * 5),
            },
            {
                new: true
            }
        );

        if (user) {
            user = await UserModel.findOneAndUpdate(
                {
                    steamId: userID,
                },
                {
                    $set: {needInventoryUpdate: new Date().setMinutes(new Date().getMinutes() + 5)}
                },
                {
                    new: true,
                }
            );

            await UserItemsCacheModel.find({user: userID}).remove();

            const userItems = await SteamApiIO.getUserInventory(userID);
            const itemsNames = [];
            for (let key in userItems) {
                itemsNames.push(userItems[key].market_hash_name);
            }

            const skinsData = await this.getSkinsData(itemsNames);
            for (let key in userItems) {
                const data = skinsData[userItems[key].market_hash_name];
                if (data && data.price) {
                    userItems[key].price = data.price;
                    userItems[key].type = data.type;
                    userItems[key].iconUrl = data.iconUrl;
                    userItems[key].name = data.name;
                    userItems[key].user = userID;
                    userItems[key].assetID = key;
                    await new UserItemsCacheModel(userItems[key]).save();
                }
            }

        }

        const inventory = await UserItemsCacheModel.find(
            {
                user: userID,
                name: new RegExp(params.search || '', "i"),
            },
            '',
            {
                skip: (parseInt(params.page) || 0) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE,
                sort: {price: parseInt(params.price) || 1}
            },
        );

        return {
            inventory: inventory,
            needInventoryUpdate: user ? user.needInventoryUpdate : false,
            params: {
                search: params.search,
                page: (parseInt(params.page) || 0),
                price: (parseInt(params.price) || 1),
            }
        };
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
}