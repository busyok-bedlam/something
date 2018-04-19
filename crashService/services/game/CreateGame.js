import di from '../../di';
import Clients from "../../lib/Clients";
import WSServer from '../../lib/WSServer';

const db = di.get('db');
const GamesModel = db.models.games;
const config = di.get('config');
const gameConfig = config.gameConfig;
const wsGameConfig = config.wsGameMessageType;


export default class CreateGame {

    async exec() {
        console.log('create game');
        const inProcess = await GamesModel.findOne({status: {'$ne': gameConfig.STATUS.FINISHED}});

        if (inProcess) {
            throw new Error('in procces');
        } else {
            let dateNow = Date.now();
            let gameStart = dateNow + 9000;
            let game = await new GamesModel({
                status: gameConfig.STATUS.BETTING,
                createdAt: dateNow,
                gameStart: gameStart,
            }).save();
            const data = {
                    type: wsGameConfig.WSM_CURRENT_GAME,
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