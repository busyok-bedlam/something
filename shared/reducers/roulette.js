import {
    ROULETTE_BETTING,
    ROULETTE_IN_GAME,
    ROULETTE_REWARDS,
    WS_BALANCE_UPDATE
} from '../actions/rouletteActions';

let initialState = {
    game: {},
    lastGame: {},
    bets: {},
    status: '',
};

export default function roulette(state = initialState, action) {
    switch (action.type) {
        case ROULETTE_BETTING: {
            // const {game} = action.payload;
            let game = {};
            game.lastBet = 12;
            game.date = new Date();
            game.date.setSeconds(game.date.getSeconds() + 3);
            let lastGame ={};
            lastGame.lastBet = 12;
            lastGame.date = new Date(Date.now());
            return {...state, game, lastGame, status: action.type};
        }
        case ROULETTE_IN_GAME: {
            return {...state, status: action.type};
        }
        case ROULETTE_REWARDS: {
            return {...state, status: action.type}
        }
        case WS_BALANCE_UPDATE: {

            console.log(action.payload.message);
        }
        default:
            return state;
    }
}
