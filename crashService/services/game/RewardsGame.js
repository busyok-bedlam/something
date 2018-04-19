import di from '../../di';

const db = di.get('db');
// const GamesModel = db.models.games;
const crash_games = db.model('crash_games');
const config = di.get('config');
const crashConfig = config.crashConfig;
// import gameConfig from '../../../config/game';
// const BetsModel = db.models.bets;
// const UsersModel = db.models.users;
// const {gameConfig} = di.get('config');

export default class RewardsGame {
    async exec() {
        const crashConfig = config.crashConfig;
        console.log('rewards game');
        await this.__done();
        await crash_games.findOneAndUpdate(
            {
                status: crashConfig.STATUS.REWARDS,
            },
            {
                status: crashConfig.STATUS.FINISHED,
                gameEnd: new Date(),
            });

    }

    __done() {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        })
    }
}