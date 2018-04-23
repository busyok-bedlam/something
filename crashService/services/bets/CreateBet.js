import di from '../../di';
// import Clients from "../../lib/Clients";
import WSServer from '../../lib/WSServer';

const db = di.get('db');
const crash_games = db.model('crash_games');
const crash_bets = db.model('crash_bets');
const BetsModel = db.models.bets;
const users = db.model('users');
const config = di.get('config');
const crashConfig = config.crashConfig;
const wsMessageType = config.wsMessageType;

export default class CreateBet {

    async exec(betData) {
        console.log('create BBBEEEETTTTT');
        const {amount, userID} = betData.data;
        try {
            const game = await crash_games.findOneAndUpdate(
                {
                    status: crashConfig.STATUS.BETTING
                },
                {
                    $inc: { "totalAmount" : amount, "totalUsers": 1 },
                });
            const user = await users.findOneAndUpdate(
                {
                    _id: userID,
                },
                {
                    crashStatus: crashConfig.STATUS.IN_GAME,
                    $inc: { "balance" : -amount}
                }
            );
            const userData = {
                type: wsMessageType.WS_CRASH_UPDATE_USER_STATUS,
                payload: crashConfig.STATUS.IN_GAME,
            };
            WSServer.send(userID, userData);
            await new crash_bets({
                crashID: game._id,
                userID: userID,
                amount: amount,
                createdAt:Date.now(),
            }).save();
            WSServer.send(userID,
                {
                    type: wsMessageType.WS_BALANCE_UPDATE,
                    payload: {user},
                });
        } catch (error ) {
            console.error(error.message);
        }
    }
}