import api from '../api';

export const UPDATE_SUPPORTS_STATE = 'UPDATE_SUPPORTS_STATE';
export const UPDATE_SUPPORT = 'UPDATE_SUPPORT';

export function load(page, options = {}) {
    return async dispatch => {
        const res = await api.supports.supportsList({...options, page});
        if (res.supports && res.supports.length >= 0) {
            return dispatch({
                type: UPDATE_SUPPORTS_STATE,
                payload: {
                    page,
                    options,
                    supportsList: res.supports,
                },
            })
        } else {
            throw new Error('Error in loading supports data: ' + res.toString());
        }
    }
}

export function updateSupportStatus(supportID, status) {
    return async dispatch => {
        const res = await api.supports.updateSupportStatus({supportID, status});
        if (res.supportID && res.status) {
            return dispatch({
                type: UPDATE_SUPPORT,
                payload: {
                    supportID,
                    status,
                },
            })
        } else {
            throw new Error('Error in updateing supports data: ' + res.toString());
        }
    }
}




