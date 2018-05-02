import api from '../api';

export const UPDATE_USERS_STATE = 'UPDATE_USERS_STATE';
export const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const BLOCK_USER = 'BLOCK_USER';
export const UNBLOCK_USER = 'UNBLOCK_USER';

export function load(page, options = {}) {
    return async dispatch => {
        const res = await api.user.userList({...options, page});
        if (res.users && res.users.length >= 0) {
            return dispatch({
                type: UPDATE_USERS_STATE,
                payload: {
                    page,
                    options,
                    usersList: res.users
                },
            })
        }
        return dispatch({
            type: UPDATE_USERS_STATE,
            payload: {
                page,
                options,
                error: res.error || ''
            },
        })
    }
}

export function updateBalance(userID, balance) {
    return async dispatch => {
        const res = await api.user.updateUserBalance({userID, balance});
        if(res.userID && res.balance){
            return dispatch({
                type: UPDATE_BALANCE,
                payload: {
                    userID: res.userID,
                    balance: res.balance,
                }
            })
        }
    }
}

export function updateUser(data, options = {}) {
    return async dispatch => {
        const res = await api.user.updateUser(data);
        if(res){
            return dispatch({
                type: UPDATE_USERS_STATE,
                payload: {
                    page: data.page,
                    options,
                    usersList: res.users,
                },
            })
        }
    }
}

export function findUserByID(data, options = {}) {
    return async dispatch => {
        const res = await api.user.findUserByID(data);
        if(res){
            return dispatch({
                type: UPDATE_USERS_STATE,
                payload: {
                    usersList: res.users,
                },
            })
        }
    }
}

export function updateUserCredentials(data, options = {}) {
    return async dispatch => {
        const res = await api.user.updateUserCredentials(data);
        if(res){
            return dispatch({
                type: UPDATE_USERS_STATE,
                payload: {
                    page: data.page,
                    options,
                    usersList: res.users,
                },
            })
        }
    }
}




