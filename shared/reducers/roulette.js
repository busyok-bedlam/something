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
    total: 0,
    game: {},
    lastGames: [],
    bets: {},
    status: ROULETTE_INIT,
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
    hash: 0,
    color: '',
    sector: 0
};

export default function roulette(state = initialState, action) {
    // console.log(state.userBets);
    // console.log(state);
    console.log(action.type);

    switch (action.type) {

        case ROULETTE_INIT: {
            // let game = {...state.game, ...action.payload};
            let payload = action.payload;
            return {
                ...state,
                ...payload,
                // status: action.payload.status,
                // lastGames: action.payload.lastGames
            };
        }
        case ROULETTE_BETTING: {
            let payload = action.payload;
            return {
                ...state,
                ...payload,
                userBets: {
                    ...state.userBets,
                    [rouletteConfig.ROULETTE_COLOR_PINK]: 0,
                    [rouletteConfig.ROULETTE_COLOR_GREEN]: 0,
                    [rouletteConfig.ROULETTE_COLOR_GREY]: 0,
                    bets: []
                },
                // game: action.payload,
                players: action.payload.players,
                status: action.type,
                sector: 0,
                hash: ''
            };
        }
        case ROULETTE_IN_GAME: {
            // let game  = {...state.game, ...action.payload};
            let payload = action.payload;
            return {
                ...state,
                ...payload,
                status: action.type
            };

        }
        case ROULETTE_REWARDS: {
            console.log(action.payload.lastGames);
            return {
                ...state,
                status: action.type,
                color: action.payload.color,
                sector: action.payload.sector,
                lastGames: action.payload.lastGames
            };
        }

        case wsMessageType.WS_ROULETTE_PLAYERS: {
            return {
                ...state,
                players: action.payload.players,
                counter: action.payload.counter
            }
        }

        case wsMessageType.WS_NEW_BET: {

            const {color, value} = action.payload.userBet;
            const currentAmount = state.userBets[color];
            state.userBets.bets.push({color, value});
            return {
                ...state,
                userBets: {...state.userBets, [color]: (currentAmount + value)},
            };
        }

        case wsMessageType.WS_TOTALS_ROULETTE: {
            console.log(+action.payload.rouletteGameTotal);
            console.log(action.payload.rouletteGameTotal);

            return {...state, total: action.payload.rouletteGameTotal}
        }

        case wsMessageType.WS_ROULETTE_CLOSE: {
            return {...state, status: initialState.status}
        }

        default:
            return state;
    }
}
