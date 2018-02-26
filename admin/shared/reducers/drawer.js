import {
    DRAWER_OPEN,
    DRAWER_CLOSE,
} from '../actions/drawerActions';


const initialState = {
    open: false,
};

export default function drawer(state = initialState, action) {
    switch (action.type) {
        case DRAWER_OPEN:
            return {...state, open: true};
        case DRAWER_CLOSE:
            return {...state, open: false};

        default:
            return state;
    }
}