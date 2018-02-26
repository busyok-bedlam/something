import api from '../api';


export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const DRAWER_OPEN = 'DRAWER_OPEN';


export function open() {
    return async dispatch => {
        return dispatch({type: DRAWER_OPEN});
    }
}

export function close() {
    return async dispatch => {
        return dispatch({type: DRAWER_CLOSE});
    }
}
