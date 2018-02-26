import api from '../api';

export const UPDATE_GAMES_STATE = 'UPDATE_GAMES_STATE';

export function load(page, options = {}) {
    return async dispatch => {
        const res = await api.games.gamesList({...options, page});
        if (res.games && res.games.length >= 0) {
            return dispatch({
                type: UPDATE_GAMES_STATE,
                payload: {
                    page,
                    options,
                    gamesList: res.games,
                },
            })
        } else {
            throw new Error('Error in loading games data: ' + res.toString());
        }
    }
}




