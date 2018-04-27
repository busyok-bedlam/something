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
        console.log('result bet');
        try {
            const game = await crash_games.findOne({status: {'$ne': crashConfig.STATUS.FINISHED}});
            const bets = await crash_bets.find({crashID: game._id, status: crashConfig.STATUS.IN_GAME,});
            if (bets) {
                for (let i = 0; i < bets.length; i++) {
                    bets[i].profit = -bets[i].amount;
                    bets[i].result = "lose";
                    bets[i].status = crashConfig.STATUS.FREE;
                    bets[i].save();
                    let user = await users.findOne({_id: bets[i].userID,});
                    user.crashStatus = crashConfig.STATUS.FREE;
                    user.balance += bets[i].profit;
                    user.crashGameProfit.profit += bets[i].profit;
                    user.crashGameProfit.losses++;
                    user.save();
                    const userData = {
                        type: wsMessageType.WS_CRASH_UPDATE_USER_STATUS,
                        payload: crashConfig.STATUS.FREE,
                    };
                    WSServer.send(bets[i].userID, userData);
                    WSServer.send(bets[i].userID,
                        {
                            type: wsMessageType.WS_BALANCE_UPDATE,
                            payload: {user},
                        });
                }
            }
        } catch (error ) {
            console.error(error.message);
        }
    }
}