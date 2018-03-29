import roulette from '../../config/roulette'

export const {ROULETTE_BETTING, ROULETTE_IN_GAME, ROULETTE_REWARDS} = roulette;

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