export const JACKPOT_BETTING = 'JACKPOT_BETTING';
export const JACKPOT_IN_GAME = 'JACKPOT_IN_GAME';
export const JACKPOT_REWARDS = 'JACKPOT_REWARDS';

export function jackpotBetting(item) {
    return async dispatch => {
        return dispatch({
            type: JACKPOT_BETTING,
            payload: {item},
        })
    }
}

export function jackpotInGame(item) {
    return async dispatch => {
        return dispatch({
            type: JACKPOT_IN_GAME,
            payload: {item},
        })
    }
}

export function jackpotRewards(item) {
    return async dispatch => {
        return dispatch({
            type: JACKPOT_REWARDS,
            payload: {item},
        })
    }
}