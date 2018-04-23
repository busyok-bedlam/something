import {
    SELECT_ITEM,
    SELECT_ALL_ITEMS,
    DESELECT_ITEM,
    DESELECT_ALL_ITEMS,
} from '../actions/gameActions';

import {WITHDRAW_OFFER_SENT} from '../actions/userActions';

let initialState = {
    selectedItems: {},
};


export default function game(state = initialState, action) {
    switch (action.type) {
        case SELECT_ITEM: {
            const {item} = action.payload;
            state.selectedItems[item._id] = item;
            return {...state};
        }
        case DESELECT_ITEM: {
            const {itemID} = action.payload;
            delete state.selectedItems[itemID];
            return {...state};
        }

        case DESELECT_ALL_ITEMS:{
            return {...state, selectedItems:{}}
        }

        case SELECT_ALL_ITEMS: {
            const {items} = action.payload;
            items.forEach(item=>{
                state.selectedItems[item._id] = item;
            });
            return {...state};
        }

        case WITHDRAW_OFFER_SENT:{
            return {...state, selectedItems: {}};
        }
        default:
            return state;
    }
}
