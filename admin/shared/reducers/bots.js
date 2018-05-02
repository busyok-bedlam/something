import {
    UPDATE_BOTS_STATE,
} from '../actions/botsActions';


const initialState = {
    botsList: [],
    page: 0,
    options: {},
    selectedFilter: null,
    selectedSort: null,
};

export default function bots(state = initialState, action) {
    switch (action.type) {

        case UPDATE_BOTS_STATE: {
            for (let key in action.payload) {
                if (action.payload[key] !== null) {
                    state[key] = action.payload[key];
                }
            }
            return {...state};
        }

        default:
            return state;
    }
}