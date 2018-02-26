import di from '../../di';

const db = di.get('db');
const GamesModel = db.models.games;
const UsersModel = db.models.users;
const {gameConfig} = di.get('config');

export default class FinishGamesOnServerStart {
    async exec() {
        const games =  await GamesModel.find({status: gameConfig.STATUS.SELECTED});
        const users = [];

        games.forEach(game=>{
            users.push(game.owner);
            users.push(game.partner);
        });

        await GamesModel.update(
            {
                status: gameConfig.STATUS.SELECTED,
            },
            {$set: {status: gameConfig.STATUS.FINISHED}},
            {"multi": true}
        );

        await UsersModel.update(
            {
                _id: {$in: users},
            },
            {$set: {inGameAsOwner: false, inGameAsPartner: false}},
            {"multi": true}
        );
    }
}