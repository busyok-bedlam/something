import di from '../../di';
import WSServer from '../../lib/WSServer';
import crypto from 'crypto';
const players = di.get('players');
const config = di.get('config');
const currentGame = di.get('currentGame');
const lastGames= di.get('lastGames');

const {
    ROULETTE_COLOR_PINK,
    ROULETTE_COLOR_GREEN,
    ROULETTE_COLOR_GREY,
    ROULETTE_TIMER,
    ROULETTE_BETTING,
    ROULETTE_IN_GAME,
    SECRET_KEY
} = config.rouletteConfig;


export default class InitGame {
    async exec() {

        console.log('Init game');

        currentGame.rouletteGameTotal = 0;

        players[ROULETTE_COLOR_PINK].splice(0, players[ROULETTE_COLOR_PINK].length);
        players[ROULETTE_COLOR_GREEN].splice(0, players[ROULETTE_COLOR_GREEN].length);
        players[ROULETTE_COLOR_GREY].splice(0, players[ROULETTE_COLOR_GREY].length);

        players.total[ROULETTE_COLOR_PINK] = 0;
        players.total[ROULETTE_COLOR_GREEN] = 0;
        players.total[ROULETTE_COLOR_GREY] = 0;

        currentGame.status = ROULETTE_BETTING;
        currentGame.counter = ROULETTE_TIMER;
        currentGame.rouletteID = currentGame.lastRouletteID + 1;

        this.__checkActualHashAndDay();


        WSServer.sendToAll({
            type: ROULETTE_BETTING,
            payload: {
                rouletteID: currentGame.rouletteID,
                hash: currentGame.hash,
                counter: currentGame.counter,
                players: players,
                lastGames,
                total: currentGame.rouletteGameTotal
            }
        });


        return new Promise(resolve => {
            this.timerBet = setInterval(() => {

                // console.log(currentGame.counter);

                if (currentGame.counter === 6) {

                    // emitter.emit('stopBets');
                    // currentGame.status = STOP_BET_STATUS;
                    // stopBets();
                }
                if (currentGame.counter > 0) {
                    currentGame.counter--;
                } else {
                    clearInterval(this.timerBet);
                    resolve();
                }
            }, 1000);
        });

    }

    __checkActualHashAndDay() {
        let nowDay = Math.floor(Date.now() / (86400 * 1000));

        if (currentGame.day < nowDay) {
            currentGame.day = nowDay;
            currentGame.hash = crypto.createHmac('sha256', SECRET_KEY)
                .update(Math.random() + '' + Date.now())
                .digest('hex');
        }
    }
}