import di from '../../di';
import Clients from "../../lib/Clients";
import WSServer from '../../lib/WSServer';

const db = di.get('db');
const GamesModel = db.models.games;
const BetsModel = db.models.bets;
const ItemsModel = db.models.items;
const UsersModel = db.models.users;
const config = di.get('config');
const gameConfig = config.gameConfig;
const wsGameConfig = config.wsGameMessageType;

export default class CreateBet {

    async exec(betData) {
        console.log('create BBBEEEETTTTT');
        const {items, autoCashOut, selectedSkin} = betData.data;
        try {
            var amount = 0;
            for (let i = 0; i < items.length; i++){
                const item = await ItemsModel.findOneAndUpdate(
                    {
                        _id: items[i],
                        status: 'FREE'
                    },
                    {
                        status: gameConfig.STATUS.IN_GAME,
                    }
                );
                amount = amount + item.price;
            }
            const game = await GamesModel.findOneAndUpdate(
                {
                    status: gameConfig.STATUS.BETTING
                },
                {
                    $inc: { "totalAmount" : amount, "totalUsers": 1 },
                });
            const user = await UsersModel.findOneAndUpdate(
                {
                    _id: betData.userId,
                },
                {
                    status: gameConfig.STATUS.IN_GAME
                }
            );
            const userData = {
                type: wsGameConfig.UPDATE_USER_STATUS,
                payload: gameConfig.STATUS.IN_GAME,
            };
            WSServer.send(betData.userId, userData);
            await new BetsModel({
                gameId: game._id,
                userId: betData.userId,
                items: items,
                amount: amount,
                autoCash: autoCashOut,
                selectedSkin: selectedSkin,
                createdAt:Date.now(),
                gameType: user.gameType,
            }).save();
        } catch (error ) {
            console.error(error.message);
        }
    }
}