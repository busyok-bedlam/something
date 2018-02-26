let initialState = {
    open: false,
    modalName: '',
    tab: '',
    data: {}
};


export default function modal(state = initialState, action) {
    switch (action.type) {
        case 'OPEN_MODAL': {
            const {name, tab, data} = action.payload;
            return {...state, open: true, modalName: name, tab, data};
        }

        case 'CLOSE_MODAL': {
            return {...state, open: false, modalName: '', tab: '', data: {}};
        }

        default:
            return state;
    }
}
