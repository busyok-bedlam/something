import di from '../../di';
import WSServer from '../../lib/WSServer';
import crypto from 'crypto';

const config = di.get('config');
const currentGame = di.get('currentGame');

const {
    ROULETTE_IN_GAME,
    WHEEL_TIME
} = config.rouletteConfig;

export default class ExecGame {
    exec() {
        console.log('ExecGame');

        currentGame.status = ROULETTE_IN_GAME;
        currentGame.counter = WHEEL_TIME;

        const hash = crypto.createHash('sha256')
            .update(
                currentGame.hash + '-' +
                currentGame.day + '-' +
                currentGame.rouletteID
            )
            .digest('hex');

        currentGame.sector = parseInt(hash.substr(0, 8), 16) % 15;

        currentGame.hashGame = crypto.createHash('sha224')
            .update((currentGame.rouletteID + config.rouletteConfig.ROULETTE_WHEEL[currentGame.sector].number).toString())
            .digest('hex');

        console.log(currentGame.sector);

        WSServer.sendToAll({
            type: ROULETTE_IN_GAME,
            payload: {
                sector: currentGame.sector,
                angle: Math.floor(Math.random() * 22) + 2,
                hash: currentGame.hashGame
            }
        });


        return new Promise(resolve => {
            this.timerWheel = setInterval(() => {
                if (currentGame.counter > 0) {
                    currentGame.counter--;
                } else {
                    resolve();
                    clearInterval(this.timerWheel);
                }
            }, 1000);
        });
    }
}