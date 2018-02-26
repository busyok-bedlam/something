import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGOUT,
    SET_CURRENT_USER
} from '../actions/adminActions';


const initialState = {
    isAuth: false,
    currentUser: {},
    user: {
        login: undefined,
        _id: undefined,
    },
};

export default function admin(state = initialState, action) {
    switch (action.type) {
        case ADMIN_LOGIN_SUCCESS:

            return {...state, isAuth: true, user: action.payload.user};

        case ADMIN_LOGOUT:
            location.href = '/';
            return {...state, ...initialState};

        case SET_CURRENT_USER:

            return {...state, currentUser: action.user};

        default:
            return state;
    }
}