import api from '../api';


export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';


export function successLoginUser(user) {
    return {
        type: ADMIN_LOGIN_SUCCESS,
        payload: {user},
    }
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function logout() {
    return async dispatch => {
        const res = await api.admin.logout();
        if (res.status && res.status === 1) {
            return dispatch({
                type: ADMIN_LOGOUT
            });
        }
        ;
    }
}
