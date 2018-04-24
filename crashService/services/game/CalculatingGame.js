import di from '../../di';
import WSServer from '../../lib/WSServer';
import runService from '../../mixins/runService';
// import BetResalst from "../bets/BetResalst";
// import GameRouter from '../../lib/GameRouter';

import crypto from 'crypto';

const db = di.get('db');
const crash_games = db.model('crash_games');
const config = di.get('config');
const crashConfig = config.crashConfig;
const wsMessageType = config.wsMessageType;

export default class CalculatingGame {
    async exec() {
        console.log('Calculating game');
        let game = await this.__gameStatus();
        game = await this.__startGame(game);
        await this.__gameProcces(game);
    }

    async __calculateValue () {
        let value = Math.random() * 100;
        if (value <= 7) return 1.00;
        else if (value <= 22) return 1 + Math.random() * 0.2;
        else if (value <= 50) return 1.2 + Math.random() * 0.3;
        else if (value <= 73) return 1.5 + Math.random() * 0.5;
        else if (value <= 90) return 2 + Math.random() * 3;
        else if (value <= 95) return 5 + Math.random() * 5;
        else if (value <= 97) return 10 + Math.random() * 10;
        else if (value <= 98.95) return 20 + Math.random() * 30;
        else if (value <= 99.95) return 50 + Math.random() * 50;
        else return 100 + Math.random() * 100;
    }

    async __gameStatus () {
        console.log('__gameStatus  calculating game');
        let game = await crash_games.findOneAndUpdate(
            {
                status: crashConfig.STATUS.BETTING,
            },
            {
                status: crashConfig.STATUS.CALCULATING,
            });
        return game;
    }

    async __startGame(game) {
        console.log('__startGame');
        game.status = crashConfig.STATUS.IN_GAME;
        game.save();
        const data = {
            type: wsMessageType.WS_CURRENT_CRASH_GAME,
            payload: game,
        };
        WSServer.sendToAll(data);
        return game;
    }

    async __gameProcces(game) {
        const value = await this.__calculateValue();
        console.log(value);
        const hash = crypto.createHmac('sha256', crashConfig.SECRET_KEY)
            .update(Math.random() + '' + Date.now() + '-' + game._id + '-' + value)
            .digest('hex');
        if (value <= 1.00) {
            game.status = crashConfig.STATUS.REWARDS;
            game.gameStart = new Date();
            game.gameEnd = new Date();
            game.value = value;
            game.hash = hash;
            game.save();
            const data = {
                type: wsMessageType.WS_CURRENT_CRASH_GAME,
                payload: game,
            };
            WSServer.sendToAll(data);
            await runService(['bets', 'BetResults']);
            // GameRouter.resultGameHistory(value);
            console.log(value);
        } else {
            let endTime = Math.sqrt(2 * (value - 1) / 0.03) * 1000;
            game.gameStart = new Date();
            game.save();
            return new Promise(resolve => {
                let timer = setInterval(async () => {
                    game.status = crashConfig.STATUS.REWARDS;
                    game.gameEnd = new Date();
                    game.value = value;
                    game.hash = hash;
                    game.save();
                    const data = {
                        type: wsMessageType.WS_CURRENT_CRASH_GAME,
                        payload: game,
                    };
                    console.log('end game', game.value);
                    WSServer.sendToAll(data);
                    clearInterval(timer);
                    await runService(['bets', 'BetResults']);
                    console.log(value);
                    setTimeout(resolve, 2000);
                    // GameRouter.resultGameHistory(value);
                }, endTime)
            });
        }
    }
}