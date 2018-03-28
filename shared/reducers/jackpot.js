import {
    JACKPOT_BETTING,
    JACKPOT_IN_GAME,
    JACKPOT_REWARDS
} from '../actions/jackpotActions';

let initialState = {
    jackpot: {},
};

export default function jackpot(state = initialState, action) {
    switch (action.type) {
        case JACKPOT_BETTING: {
            const {item} = action.payload;
            state.selectedItems[item._id] = item;
            return {...state};
        }
        case JACKPOT_IN_GAME: {
            const {itemID} = action.payload;
            delete state.selectedItems[itemID];
            return {...state};
        }
        case JACKPOT_REWARDS:{
            return {...state, selectedItems:{}}
        }
        default:
            return state;
    }
}
