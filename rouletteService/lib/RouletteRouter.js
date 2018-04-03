import di      from '../di';
import Clients from './Clients';
import runService from '../mixins/runService';
const config = di.get('config');
const db = di.get('db');
const players = di.get('players');
const currentGame = di.get('currentGame');
const {
    WS_ROULETTE_NEW_BET,
    WS_BALANCE_UPDATE
} = config.wsMessageType;

const {
    ROULETTE_INIT,
    ROULETTE_BETTING,
    ROULETTE_IN_GAME
} = config.rouletteConfig;



export default class RouletteRouter {

    static async onClientConnection(id, sendResponse, isAuth) {
        console.log('connection');
        RouletteRouter.__sendToInit(id, sendResponse);
    }

    static async onClientMessage(id, payload, sendResponse, isAuth = false) {
        console.log(payload);

        try {
            const {type, data} = payload;

            switch (type) {
                case WS_ROULETTE_NEW_BET: {
                    await runService(['game', 'MakeBet'], {id, data})
                        .then(res => {
                            return sendResponse(id, {
                                type: WS_BALANCE_UPDATE,
                                payload: {
                                    userBet: res.data,
                                    user: res.user
                                }
                            })
                        });
                }
                    break;
            }

        } catch (error) {
            console.log(error);
        }
    }

    static async onClientClose() {
        console.log('close');
    }

    static async onClientBroadcast(sendResponseToAll) {

    }

    static async __sendToInit(id, sendResponse) {

        sendResponse(id, {
            type: ROULETTE_INIT,
            payload: {
                rouletteID: currentGame.rouletteID,
                players: players,
                counter: currentGame.counter
            }
        })

    }

    static async run() {

        await runService(['game', 'LastGames'])
            .then(() => {
                //last games // sector & color
                RouletteRouter.runGame();
            });

    };

    static async runGame() {
        try {
            await runService(['game', 'InitGame']);
            await runService(['game', 'ExecGame']);
            await runService(['game', 'FinishGame']);
            await RouletteRouter.runGame();

        } catch (error) {
            console.log(error);
        }
    }
}