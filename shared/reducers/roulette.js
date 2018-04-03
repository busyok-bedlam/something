import {
    ROULETTE_BETTING,
    ROULETTE_IN_GAME,
    ROULETTE_REWARDS,
    ROULETTE_INIT,
    ROULETTE_PLAYERS
} from '../actions/rouletteActions';

import wsMessageType from '../../config/wsMessageType.json';

let initialState = {
    game: {},
    lastGame: {},
    bets: {},
    status: '',
    players: {},
    userBet: {}
};

export default function roulette(state = initialState, action) {
    console.log(action);

    switch (action.type) {

        case ROULETTE_INIT: {
            console.log(action.payload);
            return {
                ...state,
                counter: action.counter
            }
        }
        case ROULETTE_BETTING: {
            // const {game} = action.payload;
            let game = {};
            game.lastBet = 12;
            game.date = new Date();
            game.date.setSeconds(game.date.getSeconds() + 20); //ROULETTE_TIMER
            let lastGame = {};
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

        case wsMessageType.WS_ROULETTE_PLAYERS: {
            return {...state}
        }

        case wsMessageType.WS_BALANCE_UPDATE: {
            console.log(action);
            const {userBet} = action.payload;
            state.userBet = userBet;
            return {...state};
        }
        default:
            return state;
    }
}
