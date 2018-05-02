import di      from '../di';
import Clients from './Clients';
import runService from '../mixins/runService';
const config = di.get('config');
const db = di.get('db');
const users = db.model('users');
const players = di.get('players');
const currentGame = di.get('currentGame');
const lastGames = di.get('lastGames');
import WSServer from '../lib/WSServer';
const {
    WS_ROULETTE_NEW_BET,
    WS_BALANCE_UPDATE,
    WS_TOTALS_ROULETTE
} = config.wsMessageType;

const {
    ROULETTE_INIT,
    ROULETTE_BETTING,
    ROULETTE_IN_GAME,
    ROULETTE_COLOR_PINK,
    ROULETTE_COLOR_GREEN,
    ROULETTE_COLOR_GREY
} = config.rouletteConfig;



export default class RouletteRouter {

    static async onClientConnection(id, sendResponse, isAuth) {
        RouletteRouter.__sendToInit(id, sendResponse);
    }

    static async onClientMessage(id, payload, sendResponse, isAuth = false) {
        // console.log(payload);
        console.log(isAuth);

        try {
            const {type, data} = payload;
            const user = await users.findOne({_id: id});

            if (!isAuth) {
                throw new Error("Not auth user");
            } else if (user.blocked) {
                throw new Error("You are blocked");
            }

            switch (type) {
                case WS_ROULETTE_NEW_BET: {
                    await runService(['game', 'MakeBet'], {id, data})
                        .then(res => {
                            return sendResponse(id, {
                                type: WS_BALANCE_UPDATE,
                                payload: {
                                    user: res.user,
                                    counter: currentGame.counter
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
        // let rouletteGameTotal = 0;
        //
        // for (let color in players.total) {
        //     rouletteGameTotal += (+players.total[color]);
        // }
        //
        // redisClient.set('rouletteGameTotal', rouletteGameTotal);

    }

    static async __sendToInit(id, sendResponse) {

        const userBets = {};
        userBets.bets = [];

        userBets[ROULETTE_COLOR_PINK] = 0;
        userBets[ROULETTE_COLOR_GREEN] = 0;
        userBets[ROULETTE_COLOR_GREY] = 0;

        //todo refactor user bets from db

        let pinkBet = players[ROULETTE_COLOR_PINK].filter((player) => player.userID == id);
        let greenBet = players[ROULETTE_COLOR_GREEN].filter((player) => player.userID == id);
        let greyBet = players[ROULETTE_COLOR_GREY].filter((player) => player.userID == id);

        userBets[ROULETTE_COLOR_PINK] = pinkBet.length > 0 ? pinkBet[0].bet : null;
        userBets[ROULETTE_COLOR_GREEN] = greenBet.length > 0 ? greenBet[0].bet : null;
        userBets[ROULETTE_COLOR_GREY] = greyBet.length > 0 ? greyBet[0].bet : null;


        sendResponse(id, {
            type: ROULETTE_INIT,
            payload: {
                rouletteID: currentGame.rouletteID,
                players: players,
                counter: currentGame.counter,
                status: currentGame.status,
                lastGames,
                total: currentGame.rouletteGameTotal,
                userBets,
                sector: currentGame.sector,
                angle: currentGame.angle
                //hash
            }
        })

    }

    static async run() {

        await runService(['game', 'LastGames'])
            .then((last) => {
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