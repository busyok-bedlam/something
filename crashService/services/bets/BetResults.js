import di from '../../di';
// import Clients from "../../lib/Clients";
import WSServer from '../../lib/WSServer';

const db = di.get('db');
const GamesModel = db.models.games;
const BetsModel = db.models.bets;
const ItemsModel = db.models.items;
const UsersModel = db.models.users;
const config = di.get('config');
const gameConfig = config.gameConfig;
const wsGameConfig = config.wsGameMessageType;

export default class BetResults {

    async exec(value) {
        console.log('resalt bet');
        try {
            const game = await GamesModel.findOne({status: {'$ne': gameConfig.STATUS.FINISHED}});
            const bets = await BetsModel.find({gameId: game._id, status: gameConfig.STATUS.IN_GAME,});
            if (bets) {
                for (let i = 0; i < bets.length; i++) {
                    await this.__Rewards(bets[i], value);
                    await BetsModel.findOneAndUpdate(
                        {
                            _id: bets[i]._id
                        },
                        {
                            status: gameConfig.STATUS.FINISHED,
                        }
                    )
                }
            }
            console.log(value);
        } catch (error ) {
            console.error(error.message);
        }
    }

    async __Rewards(bet, value) {
        let items = bet.items;
        await UsersModel.findOneAndUpdate(
            {
                _id: bet.userId,
            },
            {
                status: 'FREE'
            }
        );
        const userData = {
            type: wsGameConfig.UPDATE_USER_STATUS,
            payload: 'FREE',
        };
        WSServer.send(bet.userId, userData);
        for (let i = 0; i < items.length; i++){
            console.log('autoCash', bet.autoCash);
            if (value >= bet.autoCash && bet.autoCash > 1.00) {
                console.log('return status FREE');
                bet.cashOut = bet.autoCash;
                bet.result = 'won';
                await bet.save();
                await ItemsModel.findOneAndUpdate(
                    {
                        _id: items[i],
                        status: gameConfig.STATUS.IN_GAME
                    },
                    {
                        status: 'FREE'
                    }
                );
            } else {
                bet.result = 'lose';
                await bet.save();
                await ItemsModel.findOneAndUpdate(
                    {
                        _id: items[i],
                        status: gameConfig.STATUS.IN_GAME
                    },
                    {
                        user: '',
                        status: 'FREE'
                    }
                );
            }
        }

        items = await ItemsModel.find(
            {
                user: bet.userId,
                app_id: bet.gameType === 'csgo' ? 730 : 578080,
            }).populate('itemData');
        const data = {
            type: "UPDATE_USER_INVENTORY",
            payload: {items},
        };
        WSServer.send(bet.userId, data);
    }
}