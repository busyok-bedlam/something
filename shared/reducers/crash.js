// import {
//     SELECT_ITEM,
//     SELECT_ALL_ITEMS,
//     DESELECT_ITEM,
//     DESELECT_ALL_ITEMS,
//     // UPGRADE_SELECTED_ITEMS,
//     CHANGE_AUTO_CASHOUT,
//     SELECT_SKIN,
//     DROP_SKIN,
// } from '../actions/gameActions';
import {
    WS_CURRENT_CRASH_GAME,
    WS_CRASH_BETS,
    WS_CRASH_ERROR,
} from '../../config/wsMessageType';
import {toast} from 'react-toastify';

let initialState = {
    currentCrashGame: {},
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
            // console.log(action)
            return {...state, currentCrashGame: action.payload};
        }
        //
        // case WSM_GAME_CLOSE: {
        //     return {...state, currentGame: {}};
        // }
        //
        case WS_CRASH_ERROR: {
            toast(action.payload.message);
            return {...state};
        }

        // case WSM_RESULT_HISTORY: {
        //     return {...state, resultHistory: action.payload};
        // }
        //
        case WS_CRASH_BETS: {
            return {...state, playersBet: action.payload};
        }

        default:
            return state;
    }
}
