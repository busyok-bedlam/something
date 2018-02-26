import {
    UPDATE_USERS_STATE,
    UPDATE_BALANCE,
    BLOCK_USER,
    UNBLOCK_USER,
} from '../actions/usersActions';


const initialState = {
    usersList: [],
    page: 0,
    options: {},
    selectedFilter: null,
    selectedSort: null,
};

export default function users(state = initialState, action) {
    switch (action.type) {

        case UPDATE_USERS_STATE: {
            for (let key in action.payload) {
                if (action.payload[key] !== null) {
                    state[key] = action.payload[key];
                }
            }
            return {...state};
        }

        case UPDATE_BALANCE:{
            const {userID, balance} = action.payload;
            state.usersList.forEach(user=>{
                if(user._id === userID){
                    user.balance = balance;
                }
            });
            return {...state};
        }
        case BLOCK_USER:{
            const {userID, blockedTime} = action.payload;
            state.usersList.forEach(user=>{
                if(user._id === userID){
                    user.isBlocked = true;
                    user.blockedTime = blockedTime;
                }
            });
            return {...state};
        }

        case UNBLOCK_USER:{
            const {userID} = action.payload;
            state.usersList.forEach(user=>{
                if(user._id === userID){
                    user.isBlocked = false;
                }
            });
            return {...state};
        }
        default:
            return state;
    }
}