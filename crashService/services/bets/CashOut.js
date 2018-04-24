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
        try {
            await users.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    status: crashConfig.STATUS.FREE
                }
            );
            const userData = {
                type: wsMessageType.WS_CRASH_UPDATE_USER_STATUS,
                payload: crashConfig.STATUS.FREE,
            };
            WSServer.send(id, userData);
            await this.__Rewards(id);
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
        const bet = await crash_bets.findOneAndUpdate(
            {
                userId: id,
                status: crashConfig.STATUS.IN_GAME,
                gameId: game._id,
            },
            {
                status: crashConfig.STATUS.FINISHED,
                cashOut: currentValue,
                result: 'won',
            });
        let cashOutAmount = currentValue * bet.amount;
        bet.profit = cashOutAmount.toFixed(2);
        bet.save();

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