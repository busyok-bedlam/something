import di from '../../di';
// import Clients from "../../lib/Clients";
import WSServer from '../../lib/WSServer';

const db = di.get('db');
// const GamesModel = db.models.games;
const crash_games = db.model('crash_games');
// const BetsModel = db.models.bets;
const crash_bets = db.model('crash_bets');
// const ItemsModel = db.models.items;
// const UsersModel = db.models.users;
const users = db.model('users');
const config = di.get('config');
// const gameConfig = config.gameConfig;
const crashConfig = config.crashConfig;
// const wsGameConfig = config.wsGameMessageType;
const wsMessageType = config.wsMessageType;

export default class BetResults {

    async exec() {
        console.log('resalt bet');
        try {
            const game = await crash_games.findOne({status: {'$ne': crashConfig.STATUS.FINISHED}});
            const bets = await crash_bets.find({gameId: game._id, status: crashConfig.STATUS.IN_GAME,});
            if (bets) {
                for (let i = 0; i < bets.length; i++) {
                    bets[i].profit = -bets[i].amount;
                    bets[i].result = "lose";
                    bets[i].save();
                    await crash_bets.findOneAndUpdate(
                        {
                            _id: bets[i]._id
                        },
                        {
                            status: crashConfig.STATUS.FREE,
                        }
                    )
                    await users.findOneAndUpdate(
                            {
                                _id: bets[i].userID,
                            },
                            {
                                crashStatus: crashConfig.STATUS.FREE,
                                $inc: { "balance" : -bets[i].profit},
                                crashGameProfit: {
                                    $inc: { "profit" : -bets[i].profit, "losses" : 1},
                                }
                            }
                        );
                        const userData = {
                            type: wsMessageType.WS_CRASH_UPDATE_USER_STATUS,
                            payload: crashConfig.STATUS.FREE,
                        };
                        WSServer.send(bets[i].userID, userData);
                }
            }
        } catch (error ) {
            console.error(error.message);
        }
    }
}