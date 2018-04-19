import di from '../../di';

const db = di.get('db');
const GamesModel = db.models.games;
const config = di.get('config');
// import gameConfig from '../../../config/game';
// const BetsModel = db.models.bets;
// const UsersModel = db.models.users;
// const {gameConfig} = di.get('config');

export default class RewardsGame {
    async exec() {
        const gameConfig = config.gameConfig;
        console.log('rewards game');
        await this.__done();
        await GamesModel.findOneAndUpdate(
            {
                status: gameConfig.STATUS.REWARDS,
            },
            {
                status: gameConfig.STATUS.FINISHED,
                gameEnd: new Date(),
            });

    }

    __done() {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        })
    }
}