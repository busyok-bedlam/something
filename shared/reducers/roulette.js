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
    status: '',
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
            return {...state, game: action.payload, status: action.type};
        }
        case ROULETTE_IN_GAME: {
            let game  = {...state.game, ...action.payload};
            return {...state, game, status: action.type};
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
