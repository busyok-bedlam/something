import di from '../../di';

const db = di.get('db');
const GamesModel = db.models.games;
const UsersModel = db.models.users;
const {gameConfig} = di.get('config');

export default class Cleaner {
    async exec() {
        setInterval(async () => {
            try {
                await GamesModel.update(
                    {
                        createdAt: {$lte: new Date(new Date() - gameConfig.CLEAN_PERIOD)},
                        status: gameConfig.STATUS.CREATED,
                    },
                    {$set: {enabled: false, status: gameConfig.STATUS.REMOVED}},
                    {"multi": true}
                );
                const games = await GamesModel.find(
                    {
                        status: gameConfig.STATUS.REMOVED,
                    },
                ).populate('owner', '_id');

                games.length && games.forEach(async game => {
                    try {
                        await UsersModel.findByIdAndUpdate(
                            game.owner._id,
                            {
                                inGameAsOwner: false,
                            }
                        );
                    } catch (error) {
                        console.error('error in updating user in cleaner');
                        console.error(error.message);
                    }
                })

                await GamesModel.remove({status: gameConfig.STATUS.REMOVED});
            } catch (error) {
                console.error('Error in cleaning empty games');
                console.error(error.message);
            }
        }, 1000 * 60 * 60);
    }
}