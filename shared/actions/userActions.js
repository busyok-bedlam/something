import api from '../api';
import ModalController from '../lib/ModalController';

export const USER_INFO = 'USER_INFO';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const UPDATE_USER_STEAM_INVENTORY = "UPDATE_USER_STEAM_INVENTORY";
export const UPDATE_USER_STEAM_INVENTORY_SORT = "UPDATE_USER_STEAM_INVENTORY_SORT";
export const UPDATE_USER_INVENTORY = "UPDATE_USER_INVENTORY";
export const DEPOSIT_OFFER_SENT = "DEPOSIT_OFFER_SENT";
export const WITHDRAW_OFFER_SENT = "WITHDRAW_OFFER_SENT";

export function info() {
    return async dispatch => {
        try {
            const data = await api.user.info();

            if (data && data.user) {
                return dispatch({
                    type: USER_INFO,
                    payload: {
                        user: data.user
                    },
                })
            } else {
                throw new Error('Error in getting user data. Please relogin');
            }
        } catch (error) {
            ModalController.openModal('LoginModal');
            if (error.status) {
                switch (error.status) {
                    case 403: {
                        dispatch({
                            type: USER_LOGOUT,
                        })
                    }
                }
            }
        }
    }
}

export function logout() {
    return async dispatch => {
        await api.user.logout();
        return dispatch({
            type: USER_LOGOUT,
        })
    }
}

export function setupTradeURL(tradeURL = null) {
    return async dispatch => {
        const response = await api.user.setupTradeURL({tradeURL});
        return dispatch({
            type: UPDATE_USER_DATA,
            payload: {tradeURL: response.tradeURL}
        })
    }
}

export function loadSteamInventory() {
    return async dispatch => {
        const {items} = await api.user.loadSteamInventory();
        return dispatch({
            type: UPDATE_USER_STEAM_INVENTORY,
            payload: {items},
        })
    }
}

export function selectSteamInventorySort(sort) {
    return async dispatch => {
        return dispatch({
            type: UPDATE_USER_STEAM_INVENTORY_SORT,
            payload: {steamInventorySort: sort},
        })
    }
}

export function loadInventory() {
    return async dispatch => {
        const {items} = await api.user.loadInventory();
        return dispatch({
            type: UPDATE_USER_INVENTORY,
            payload: {items}
        })
    }
}

export function createDepositOffer(assetIDs) {
    return async dispatch => {
        const {ids} = await api.user.createDepositOffer({assetIDs});
        return dispatch({
            type: DEPOSIT_OFFER_SENT,
            payload: {ids}
        })
    }
}

export function createWithdrawOffer(ids) {
    return async dispatch => {
        const response = await api.user.createWithdrawOffer({ids});
        return dispatch({
            type: WITHDRAW_OFFER_SENT,
            payload: {ids: response.ids}
        })
    }
}

export function loadTradeHistory(type) {
    return async dispatch => {
        const {trades} = await api.user.loadTradeHistory({type});
        return dispatch({
            type: UPDATE_USER_DATA,
            payload: {trades}
        })
    }
}
