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
                    usersList: res.users,
                },
            })
        } else {
            throw new Error('Error in loading users data: ' + res.toString());
        }
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

export function blockUser(userID, blockTimeID) {
    return async dispatch => {
        const res = await api.user.blockUser({userID, blockTimeID});
        if(res.userID && res.blockedTime){
            return dispatch({
                type: BLOCK_USER,
                payload: {
                    userID: res.userID,
                    blockedTime: res.blockedTime,
                }
            })
        }
    }
}

export function unblockUser(userID) {
    return async dispatch => {
        const res = await api.user.unblockUser({userID});
        if(res.userID){
            return dispatch({
                type: UNBLOCK_USER,
                payload: {
                    userID: res.userID,
                }
            })
        }
    }
}




