import di from '../../di';
import WSServer from '../../lib/WSServer';
const config = di.get('config');
const db = di.get('db');
const roulette_games = db.model('roulette_games');
const currentGame = di.get('currentGame');

const {
    ROULETTE_REWARDS,
    PAUSE_TIME
} = config.rouletteConfig;

export default class FinishGame {
    exec() {
        console.log('FinishGame');
        WSServer.sendToAll({
            type: ROULETTE_REWARDS
        });

        currentGame.counter = PAUSE_TIME * 10;

        roulette_games
            .update({_id: currentGame.day}, {
                $set: {
                    lastRouletteID: currentGame.rouletteID,
                    hash: currentGame.hash
                },
                $push: {
                    games: {
                        $each: [{
                            rouletteID: currentGame.rouletteID,
                            hashGame: currentGame.hashGame,
                            // sector: winSector,
                            // color: winColor.substring(6).toLowerCase()
                        }],
                        $position: 0
                    },
                }
            }, {upsert: true})
            .catch(err => console.error(err));


        return new Promise(resolve => {
            this.timerPause = setInterval(() => {
                if (currentGame.counter > 0) {
                    currentGame.counter--;
                } else {
                    clearInterval(this.timerPause);
                    currentGame.lastDoubleID = currentGame.rouletteID;
                    resolve();
                }
            }, 100);
        });

    }
}