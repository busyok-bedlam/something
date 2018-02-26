export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_ALL_ITEMS = 'SELECT_ALL_ITEMS';
export const DESELECT_ITEM = 'DESELECT_ITEM';
export const DESELECT_ALL_ITEMS = 'DESELECT_ALL_ITEMS';

export function selectItem(item) {
    return async dispatch => {
        return dispatch({
            type: SELECT_ITEM,
            payload: {item},
        })
    }
}

export function selectAllItems(items) {
    return async dispatch => {
        return dispatch({
            type: SELECT_ALL_ITEMS,
            payload: {items},
        })
    }
}

export function deselectItem(itemID) {
    return async dispatch => {
        return dispatch({
            type: DESELECT_ITEM,
            payload: {itemID},
        })
    }
}

export function deselectAllItems() {
    return async dispatch => {
        return dispatch({
            type: DESELECT_ALL_ITEMS,
            payload: {},
        })
    }
}
