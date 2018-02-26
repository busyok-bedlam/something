let initialState = {
    open: false,
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'loading_open': {
            return {open: true}
        }

        case 'loading_close': {
            return {open: false}
        }

        default:
            return state;
    }
}
