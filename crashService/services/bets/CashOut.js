import di from '../../di';
// import Clients from "../../lib/Clients";
import WSServer from '../../lib/WSServer';

const db = di.get('db');
const crash_games = db.model('crash_games');
const crash_bets = db.model('crash_bets');
const users = db.model('users');
const config = di.get('config');
const crashConfig = config.crashConfig;
const wsMessageType = config.wsMessageType;

export default class CashOut {

    async exec(data) {
        const id = data.userID;
        const bet = await this.__Rewards(id);
        try {
            let user = await users.findOne({_id: id});
                // {
                //     crashStatus: crashConfig.STATUS.FREE,
                //     $inc: { "balance" : profit},
                //     crashGameProfit: {
                //         $inc: { "profit" : profit, "wins" : 1},
                //     }
                // }
            user.crashStatus = crashConfig.STATUS.FREE;
            user.balance += bet.amount + bet.profit;
            user.crashGameProfit.profit += bet.profit;
            user.crashGameProfit.wins++;
            user.save();
            const userData = {
                type: wsMessageType.WS_CRASH_UPDATE_USER_STATUS,
                payload: crashConfig.STATUS.FREE,
            };
            WSServer.send(id, userData);
            WSServer.send(id,
                {
                    type: wsMessageType.WS_BALANCE_UPDATE,
                    payload: {user},
                });
        } catch (error) {
            console.error(error);
            return WSServer.send(
                id,
                {
                    type: wsMessageType.WS_CRASH_ERROR,
                    payload: {
                        message: `Error in sending: ${error.message || error.toString()}`
                    }
                }
            )
        }
    }

    async __Rewards (id) {
        const game = await crash_games.findOne({status: crashConfig.STATUS.IN_GAME});
        const currentTime = (Date.now() - Date.parse(game.gameStart))/1000;
        const currentValue = (1 + 0.02 * currentTime * currentTime / 2).toFixed(2);
        console.log('currentValue', currentValue);
        let bet = await crash_bets.findOne({
                userID: id,
                status: crashConfig.STATUS.IN_GAME,
                crashID: game._id,});
        bet.status = crashConfig.STATUS.FINISHED;
        bet.cashOut = currentValue;
        bet.result = 'won';
        let cashOutAmount = currentValue * bet.amount - bet.amount;
        bet.profit = Math.floor(cashOutAmount);
        bet.save();
        return bet;

        // const data = {
        //     type: wsGameConfig.UPDATE_USER_INVENTORY,
        //     payload: {items},
        // };
        // WSServer.send(id, data);
        // const Betdata = {
        //     type: wsGameConfig.USER_BET_RESULT,
        //     payload: 'won',
        // };
        // WSServer.send(id, Betdata);
    }
}