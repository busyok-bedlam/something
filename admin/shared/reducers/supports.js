import {
    UPDATE_SUPPORTS_STATE,
    UPDATE_SUPPORT,
} from '../actions/supportsActions';


const initialState = {
    supportsList: [],
    page: 0,
    options: {},
    selectedFilter: null,
    selectedSort: null,
};

export default function supports(state = initialState, action) {
    switch (action.type) {

        case UPDATE_SUPPORTS_STATE: {
            for (let key in action.payload) {
                if (action.payload[key] !== null) {
                    state[key] = action.payload[key];
                }
            }
            return {...state};
        }

        case UPDATE_SUPPORT:{
            const {supportID, status} = action.payload;
            state.supportsList.forEach(support=>{
                if(support._id === supportID){
                    support.status = status;
                }
            });
            return {...state};
        }

        default:
            return state;
    }
}