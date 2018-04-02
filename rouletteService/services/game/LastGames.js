import di from '../../di';

const db = di.get('db');
const roulette_games = db.model('roulette_games');
const currentGame = di.get('currentGame');

export default class LastGames {
    exec() {

        return roulette_games
            .findOne({}, {games: {$slice: 10}})
            .sort('-_id')
            .then(doc => {
                let last = [];
                if (!doc) {
                    currentGame.day = 0;
                    currentGame.lastRouletteID = 0;
                    currentGame.rouletteID = 0;
                    currentGame.sector = 0;
                } else {
                    currentGame.day = doc._id;
                    currentGame.hash = doc.hash;
                    currentGame.lastRouletteID = doc.lastRouletteID;
                    last = doc.games.map(game => ({
                        sector: game.sector,
                        color: game.color
                    }));
                    currentGame.sector = last[last.length - 1].sector;
                }
                return last;
            });

            // Last Games
            // .then((games) => {
            //     games.forEach((game, idx) => {
            //         lastGames[idx] = game;
            //     });
            //     return lastGames;
            // });

    }
}