import di from '../../di';
import Clients from "../../lib/Clients";
import WSServer from '../../lib/WSServer';

const db = di.get('db');
// const GamesModel = db.models.games;
const crash_games = db.model('crash_games');
const config = di.get('config');
const crashConfig = config.crashConfig;
const wsMessageType = config.wsMessageType;


export default class CreateGame {

    async exec() {
        console.log('create game');
        const inProcess = await crash_games.findOne({status: {'$ne': crashConfig.STATUS.FINISHED}});

        if (inProcess) {
            throw new Error('in procces');
        } else {
            let dateNow = Date.now();
            let gameStart = dateNow + 9000;
            let game = await new crash_games({
                status: crashConfig.STATUS.BETTING,
                createdAt: dateNow,
                gameStart: gameStart,
            }).save();
            const data = {
                    type: wsMessageType.WS_CURRENT_CRASH_GAME,
                    payload: game,
                };
            WSServer.sendToAll(data);
            await this.__done();
        }
    }

    __done() {
        return new Promise(resolve => {
            setTimeout(resolve, 9000);
        })
    }
}