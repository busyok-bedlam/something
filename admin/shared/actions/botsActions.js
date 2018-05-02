import api from '../api';

export const UPDATE_BOTS_STATE = 'UPDATE_BOTS_STATE';

export function load(page, options = {}) {
    // console.log('page', page);
    // console.log('options', options);
    return async dispatch => {
        const res = await api.bots.botsList({...options, page});
        if (res.bots && res.bots.length >= 0) {
            return dispatch({
                type: UPDATE_BOTS_STATE,
                payload: {
                    page,
                    options,
                    botsList: res.bots,
                },
            })
        } else {
            throw new Error('Error in loading bots data: ' + res.toString());
        }
    }
}




