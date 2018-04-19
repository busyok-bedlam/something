import di from '../../di';
import WSServer from '../../lib/WSServer';
import runService from '../../mixins/runService';
// import BetResalst from "../bets/BetResalst";
import GameRouter from '../../lib/GameRouter';

const db = di.get('db');
const GamesModel = db.models.games;
const config = di.get('config');
const gameConfig = config.gameConfig;
const wsGameConfig = config.wsGameMessageType;

export default class CalculatingGame {
    async exec(autoCashCalculating) {
        console.log('Calculating game');
        // const value = await this.__calculateValue();
        let game = await this.__calculateBets(autoCashCalculating);
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

    async __calculateBets (autoCashCalculating) {
        console.log('__calculateBets');
        let game = await GamesModel.findOneAndUpdate(
            {
                status: gameConfig.STATUS.BETTING,
            },
            {
                status: gameConfig.STATUS.CALCULATING,
            });
        autoCashCalculating;
        return game;
    }

    async __startGame(game) {
        console.log('__startGame');
        game.status = gameConfig.STATUS.IN_GAME;
        game.save();
        const data = {
            type: wsGameConfig.WSM_CURRENT_GAME,
            payload: game,
        };
        WSServer.sendToAll(data);
        return game;
    }

    async __gameProcces(game) {
        const value = await this.__calculateValue();
        console.log(value);
        if (value <= 1.00) {
            game.status = gameConfig.STATUS.REWARDS;
            game.gameStart = new Date();
            game.gameEnd = new Date();
            game.value = value;
            game.save();
            const data = {
                type: wsGameConfig.WSM_CURRENT_GAME,
                payload: game,
            };
            WSServer.sendToAll(data);
            await runService(['bets', 'BetResults'], value);
            GameRouter.resultGameHistory(value);
            console.log(value);
        } else {
            let endTime = Math.sqrt(2 * (value - 1) / 0.03) * 1000;
            game.gameStart = new Date();
            game.save();
            return new Promise(resolve => {
                let timer = setInterval(async () => {
                    game.status = gameConfig.STATUS.REWARDS;
                    game.gameEnd = new Date();
                    game.value = value;
                    game.save();
                    const data = {
                        type: wsGameConfig.WSM_CURRENT_GAME,
                        payload: game,
                    };
                    console.log('end game', game.value);
                    WSServer.sendToAll(data);
                    clearInterval(timer);
                    await runService(['bets', 'BetResults'], value);
                    console.log(value);
                    setTimeout(resolve, 2000);
                    GameRouter.resultGameHistory(value);
                }, endTime)
            });
        }
    }
}