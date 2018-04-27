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

export default class CreateBet {

    async exec(betData) {
        console.log('create BBBEEEETTTTT');
        console.log(betData);
        const {amount, userID} = betData;
        try {
            const game = await crash_games.findOneAndUpdate(
                {
                    status: crashConfig.STATUS.BETTING
                },
                {
                    $inc: { "totalAmount": amount, "totalUsers": 1 },
                });
            const user = await users.findOne({_id: userID,});
            user.crashStatus = crashConfig.STATUS.IN_GAME;
            user.balance = user.balance - amount;
            user.save();
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