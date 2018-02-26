import {
    UPDATE_GAMES_STATE,
} from '../actions/gamesActions';


const initialState = {
    gamesList: [],
    page: 0,
    options: {},
    selectedFilter: null,
    selectedSort: null,
};

export default function games(state = initialState, action) {
    switch (action.type) {

        case UPDATE_GAMES_STATE: {
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