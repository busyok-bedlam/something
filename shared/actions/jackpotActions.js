import jackpot from './../../config/jackpot'

export const {JACKPOT_BETTING, JACKPOT_IN_GAME, JACKPOT_REWARDS} = jackpot;

export function jackpotBetting(game) {
    return async dispatch => {
        return dispatch({
            type: JACKPOT_BETTING,
            payload: {game},
        })
    }
}

export function jackpotInGame(game) {
    return async dispatch => {
        return dispatch({
            type: JACKPOT_IN_GAME,
            payload: {game},
        })
    }
}

export function jackpotRewards(game) {
    return async dispatch => {
        return dispatch({
            type: JACKPOT_REWARDS,
            payload: {game},
        })
    }
}