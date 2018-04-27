import crash from '../../config/crash'
import wsMessageType from '../../config/wsMessageType.json';
import api from '../api';
// export const {
//     ROULETTE_BETTING,
//     ROULETTE_IN_GAME,
//     ROULETTE_REWARDS,
//     ROULETTE_INIT,
//     ROULETTE_PLAYERS
// } = roulette;

export const {
    WS_CRASH_NEW_BET,
    WS_CRASH_CASHOUT,
} = wsMessageType;

export function crashNewBet(bet) {
    return async dispatch => {
        await api.crashSocket.send(WS_CRASH_NEW_BET, bet);
        // return dispatch({
        //     type: 'NO_TYPE'
        // })
    }
}

export function crashCashOut() {
    return async dispatch => {
        await api.crashSocket.send(WS_CRASH_CASHOUT);
    }
}

