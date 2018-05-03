import {
    UPDATE_MARKETPLACE_DATA,
    SELECT_ITEM,
    DESELECT_ITEM,
} from '../actions/marketplaceActions';

let initialState = {
    inventory: [],
    selectedItems: {},
    params: {
        search: '',
        price: -1,
        selectedGame: 0,
    }
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MARKETPLACE_DATA: {
            for (let key in action.payload) {
                state[key] = action.payload[key];
            }
            return {...state};
        }
        case SELECT_ITEM: {
            const {id, item} = action.payload;
            state.selectedItems[id] = item;
            return {...state};
        }
        case DESELECT_ITEM: {
            const {id} = action.payload;
            delete state.selectedItems[id]
            return {...state};
        }
        default:
            return state;
    }
}
