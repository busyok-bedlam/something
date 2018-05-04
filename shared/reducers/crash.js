import {
    WS_CURRENT_CRASH_GAME,
    WS_CRASH_BETS,
    WS_CRASH_ERROR,
} from '../../config/wsMessageType';
import wsMessageType from '../../config/wsMessageType.json';
import {toast} from 'react-toastify';

let initialState = {
    currentCrashGame: {},
    total: 0,
    // selectedItems: {},
    // autoCashOut: 1.00,
    // selectedSkin: {},
    // selectedSkinAmount: 0,
    // resultHistory: [],
    playersBet: [],
};


export default function crash(state = initialState, action) {
    switch (action.type) {

        case WS_CURRENT_CRASH_GAME: {
            // console.log(action);
            return {...state, currentCrashGame: action.payload};
        }

        case WS_CRASH_ERROR: {
            toast(action.payload.message);
            return {...state};
        }

        case WS_CRASH_BETS: {
            return {...state, playersBet: action.payload};
        }

        case wsMessageType.UPDATE_TOTALS: {
            return {...state, total: action.CrashTotal}
        }

        default:
            return state;
    }
}
