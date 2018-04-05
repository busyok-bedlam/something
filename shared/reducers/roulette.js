import {
    ROULETTE_BETTING,
    ROULETTE_IN_GAME,
    ROULETTE_REWARDS,
    ROULETTE_INIT,
    ROULETTE_PLAYERS
} from '../actions/rouletteActions';

import wsMessageType from '../../config/wsMessageType.json';
import rouletteConfig from '../../config/roulette.js';

let initialState = {
    game: {},
    lastGame: {},
    bets: {},
    status: ROULETTE_BETTING,
    players: {
        [rouletteConfig.ROULETTE_COLOR_PINK]: [],
        [rouletteConfig.ROULETTE_COLOR_GREEN]: [],
        [rouletteConfig.ROULETTE_COLOR_GREY]: [],
        total: {
            [rouletteConfig.ROULETTE_COLOR_PINK]: 0,
            [rouletteConfig.ROULETTE_COLOR_GREEN]: 0,
            [rouletteConfig.ROULETTE_COLOR_GREY]: 0,
        }
    },
    userBets: {
        [rouletteConfig.ROULETTE_COLOR_PINK]: 0,
        [rouletteConfig.ROULETTE_COLOR_GREEN]: 0,
        [rouletteConfig.ROULETTE_COLOR_GREY]: 0,
        bets: []
    },
    rouletteID: 0,
    counter: 0,
    hash: 0
};

export default function roulette(state = initialState, action) {
    console.log(state);

    switch (action.type) {

        case ROULETTE_INIT: {
            let game = {...state.game, ...action.payload};
            return {...state, game, status: action.payload.status};
        }
        case ROULETTE_BETTING: {
            return {
                ...state,
                userBets: {
                    ...state.userBets,
                    [rouletteConfig.ROULETTE_COLOR_PINK]: 0,
                    [rouletteConfig.ROULETTE_COLOR_GREEN]: 0,
                    [rouletteConfig.ROULETTE_COLOR_GREY]: 0,
                    bets: []},
                game: action.payload,
                status: action.type};
        }
        case ROULETTE_IN_GAME: {
            let game  = {...state.game, ...action.payload};
            return {...state, game, status: action.type};
        }
        case ROULETTE_REWARDS: {
            return {...state, status: action.type}
        }

        // case wsMessageType.WS_ROULETTE_PLAYERS: {
        //     console.log('');
        //     return {...state}
        // }

        //todo rename type
        case wsMessageType.WS_BALANCE_UPDATE: {

            const {color, value} = action.payload.userBet;
            const currentAmount = state.userBets[color];
            state.userBets.bets.push({color, value});
            return {
                ...state,
                userBets: {...state.userBets, [color]: (currentAmount + value)},
            };
        }
        default:
            return state;
    }
}
