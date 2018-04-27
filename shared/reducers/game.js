import {
    SELECT_ITEM,
    SELECT_ALL_ITEMS,
    DESELECT_ITEM,
    DESELECT_ALL_ITEMS,
    // UPGRADE_SELECTED_ITEMS,
    CHANGE_AUTO_CASHOUT,
    SELECT_SKIN,
    DROP_SKIN,
} from '../actions/gameActions';
// import {
//     WSM_CURRENT_GAME,
//     WSM_ERROR,
//     WSM_RESULT_HISTORY,
//     WSM_PLAYERS_BET,
//     WSM_GAME_CLOSE,
//     UPDATE_USER_SELECTED_ITEMS,
// } from '../../config/wsGameMessageType';
import {toast} from 'react-toastify';

import {WITHDRAW_OFFER_SENT} from '../actions/userActions';

let initialState = {
    currentGame: {},
    selectedItems: {},
    autoCashOut: 1.00,
    selectedSkin: {},
    selectedSkinAmount: 0,
    resultHistory: [],
    playersBet: [],
};


export default function game(state = initialState, action) {
    switch (action.type) {
        // case SELECT_ITEM: {
        //     const {item} = action.payload;
        //     state.selectedItems[item._id] = item;
        //     let selectedItems = state.selectedItems;
        //     let selectedSkinAmount = 0;
        //     Object.keys(selectedItems).map((key) => {selectedSkinAmount += selectedItems[key].price;});
        //     return {...state, selectedSkinAmount: selectedSkinAmount.toFixed(2)};
        // }
        // case DESELECT_ITEM: {
        //     const {itemID} = action.payload;
        //     delete state.selectedItems[itemID];
        //     let selectedItems = state.selectedItems;
        //     let selectedSkinAmount = 0;
        //     Object.keys(selectedItems).map((key) => {selectedSkinAmount += selectedItems[key].price;});
        //     return {...state, selectedSkinAmount: selectedSkinAmount.toFixed(2)};
        // }
        //
        // case DESELECT_ALL_ITEMS:{
        //     return {...state, selectedItems:{}, selectedSkinAmount: 0};
        // }
        //
        // case UPDATE_USER_SELECTED_ITEMS:{
        //     let selectedItems = action.payload.ernItems;
        //     let selectedSkinAmount = 0;
        //     Object.keys(selectedItems).map((key) => {selectedSkinAmount += selectedItems[key].price;});
        //     return {...state, selectedItems:selectedItems, selectedSkinAmount: selectedSkinAmount.toFixed(2)};
        // }
        //
        // case SELECT_ALL_ITEMS: {
        //     const {items} = action.payload;
        //     let selectedSkinAmount = 0;
        //     items.forEach(item=>{
        //         state.selectedItems[item._id] = item;
        //         selectedSkinAmount += item.price;
        //     });
        //     return {...state, selectedSkinAmount: selectedSkinAmount.toFixed(2)};
        // }
        //
        // case CHANGE_AUTO_CASHOUT: {
        //     return {...state, autoCashOut: action.payload};
        // }
        //
        // case WITHDRAW_OFFER_SENT: {
        //     return {...state, selectedItems: {}};
        // }
        //
        // case WSM_CURRENT_GAME: {
        //     return {...state, currentGame: action.payload};
        // }
        //
        // case WSM_GAME_CLOSE: {
        //     return {...state, currentGame: {}};
        // }
        //
        // case SELECT_SKIN: {
        //     let selectedSkinAmount = 0;
        //     const selectedItems = state.selectedItems;
        //     Object.keys(selectedItems).map((key) => {selectedSkinAmount += selectedItems[key].price;});
        //     let autoCashOut = ((action.payload.price / selectedSkinAmount) * 1.05).toFixed(2);
        //     return {...state, selectedSkin: action.payload, autoCashOut: autoCashOut};
        // }
        //
        // case DROP_SKIN: {
        //     return {...state, selectedSkin: action.payload};
        // }
        //
        // case WSM_ERROR: {
        //     toast(action.payload.message);
        //     return {...state};
        // }
        //
        // case WSM_RESULT_HISTORY: {
        //     return {...state, resultHistory: action.payload};
        // }
        //
        // case WSM_PLAYERS_BET: {
        //     return {...state, playersBet: action.payload};
        // }

        default:
            return state;
    }
}
