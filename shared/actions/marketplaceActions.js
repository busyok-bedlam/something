import api from '../api';
export const UPDATE_MARKETPLACE_DATA = "UPDATE_MARKETPLACE_DATA";
export const SELECT_ITEM = "SELECT_ITEM";
export const DESELECT_ITEM = "DESELECT_ITEM";

export function loadUserInventory(data) {
    return async dispatch => {
        if (!data.page) {
            dispatch({
                type: UPDATE_MARKETPLACE_DATA,
                payload: {inventory: []},
            })
        }
        const {inventory, params} = await api.marketplace.loadUserInventory(data);
        return dispatch({
            type: UPDATE_MARKETPLACE_DATA,
            payload: {inventory, params},
        })
    }
}

export function loadMarketplaceInventory(data) {
    return async dispatch => {
        if (!data.page) {
            dispatch({
                type: UPDATE_MARKETPLACE_DATA,
                payload: {inventory: []},
            })
        }
        const {inventory, params} = await api.marketplace.loadMarketplaceInventory(data);
        return dispatch({
            type: UPDATE_MARKETPLACE_DATA,
            payload: {inventory, params},
        })
    }
}

export function selectItem(id, item) {
    return dispatch => {
        return dispatch({
            type: SELECT_ITEM,
            payload: {id, item},
        })
    }
}
export function deselectItem(id) {
    return dispatch => {
        return dispatch({
            type: DESELECT_ITEM,
            payload: {id},
        })
    }
}
export function createDepositOffer(ids) {
    return async dispatch => {
        return await api.marketplace.createDepositOffer({ids});
    }
}
export function createWithdrawOffer(ids) {
    return async dispatch => {
        return await api.marketplace.createWithdrawOffer({ids});
    }
}
export function clear() {
    return dispatch => {
        return dispatch({
            type: UPDATE_MARKETPLACE_DATA,
            payload: {
                inventory: [],
                selectedItems: {},
                params: {
                    search: '',
                    price: -1
                }
            },
        })
    }
}

