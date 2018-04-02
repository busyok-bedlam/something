import {
    ROULETTE_BETTING,
    ROULETTE_IN_GAME,
    ROULETTE_REWARDS,
    ROULETTE_INIT
} from '../actions/rouletteActions';

let initialState = {
    game: {},
    lastGame: {},
    bets: {},
    status: '',
};

export default function roulette(state = initialState, action) {
    console.log(action.type);

    switch (action.type) {

        case ROULETTE_INIT: {
            console.log(action.payload);
        }
        case ROULETTE_BETTING: {
            // const {game} = action.payload;
            console.log('betting');
            let game = {};
            game.lastBet = 12;
            game.date = new Date();
            game.date.setSeconds(game.date.getSeconds() + 3); //ROULETTE_TIMER
            let lastGame = {};
            lastGame.lastBet = 12;
            lastGame.date = new Date(Date.now());
            return {...state, game, lastGame, status: action.type};
        }
        case ROULETTE_IN_GAME: {
            console.log('in game');
            return {...state, status: action.type};
        }
        case ROULETTE_REWARDS: {
            return {...state, status: action.type}
        }
        default:
            return state;
    }
}
