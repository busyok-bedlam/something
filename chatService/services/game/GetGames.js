import di from '../../di';

const db = di.get('db');
const GamesModel = db.models.games;
const {gameConfig} = di.get('config');

export default class GetGames {
    async exec({page}) {
        if (page < 0 || page > 100) {
            throw new Error('Invalid page arguments');
        }

        const games = await GamesModel.find(
            {},
            'owner betAmount partner createdAt status blockedUsers ownerColor partnerColor winner',
            {
                skip: page * gameConfig.gamesPerPage,
                limit: gameConfig.gamesPerPage,
                sort: '-createdAt',
            }
        )
            .populate('owner partner', 'userName displayedUserName');


        return games.map(game => {
            if (game.status !== gameConfig.STATUS.FINISHED) {
                game.ownerColor = null;
            }
            return game;
        });
    }
}