import roulette from '../../config/roulette'
import wsMessageType from '../../config/wsMessageType.json';
import api from '../api';
export const {
    ROULETTE_BETTING,
    ROULETTE_IN_GAME,
    ROULETTE_REWARDS,
    ROULETTE_INIT,
    ROULETTE_PLAYERS
} = roulette;

export const {
    WS_ROULETTE_NEW_BET,
    WS_BALANCE_UPDATE,
} = wsMessageType;

export function rouletteBetting(game) {
    return async dispatch => {
        return dispatch({
            type: ROULETTE_BETTING,
            payload: {game},
        })
    }
}

export function rouletteInGame(game) {
    return async dispatch => {
        return dispatch({
            type: ROULETTE_IN_GAME,
            payload: {game},
        })
    }
}

export function rouletteRewards(game) {
    return async dispatch => {
        return dispatch({
            type: ROULETTE_REWARDS,
            payload: {game},
        })
    }
}

export function rouletteNewBet(bet) {
    return async dispatch => {
        await api.rouletteSocket.send(WS_ROULETTE_NEW_BET, bet);
        return dispatch({
            type: 'NO_TYPE'
        })
    }

}

