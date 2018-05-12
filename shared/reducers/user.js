import {
    USER_INFO,
    USER_LOGOUT,
    UPDATE_USER_DATA,
    UPDATE_USER_STEAM_INVENTORY,
    UPDATE_USER_STEAM_INVENTORY_SORT,
    UPDATE_USER_INVENTORY,
} from '../actions/userActions';

import wsMessageType from '../../config/wsMessageType.json';

let initialState = {
    balance: 0,
    userName: null,
    isAuth: false,
    steamInventory: [],
    steamInventorySort: 1,
    inventory: [],
    trades: [],
    crashStatus: 'FREE',
    paymentStatus: 'FREE',
    paymentURL: '',
};


export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_INFO: {
            const {user} = action.payload;
            localStorage.setItem('isAuth', true);

            return {
                ...state,
                ...user,
                isAuth: true,
            }
        }

        case UPDATE_USER_DATA: {
            for (let key in action.payload) {
                state[key] = action.payload[key];
            }
            return {...state};
        }

        case USER_LOGOUT: {
            localStorage.setItem('isAuth', false);
            return {...initialState, isAuth: false};
        }

        case UPDATE_USER_STEAM_INVENTORY: {
            const {items} = action.payload;
            let array = [];
            for (let assetID in items) {
                array.push(items[assetID]);
            }
            array.sort(function (a, b) {
                return (a.itemData.price > b.itemData.price) ? 1 : ((b.itemData.price > a.itemData.price) ? -1 : 0);
            });
            if (state.steamInventorySort === 2) {
                array = array.reverse();
            }
            return {...state, steamInventory: array};
        }

        case UPDATE_USER_INVENTORY: {
            const {items} = action.payload;
            return {...state, inventory: items};
        }

        case UPDATE_USER_STEAM_INVENTORY_SORT: {
            const {steamInventorySort} = action.payload;
            if (steamInventorySort === 1) {
                state.steamInventory.sort(function (a, b) {
                    return (a.itemData.price > b.itemData.price) ? 1 : ((b.itemData.price > a.itemData.price) ? -1 : 0);
                });
            } else {
                state.steamInventory.sort(function (a, b) {
                    return (a.itemData.price < b.itemData.price) ? 1 : ((b.itemData.price < a.itemData.price) ? -1 : 0);
                });
            }
            return {...state, steamInventorySort};
        }

        case wsMessageType.WS_JOIN_GAME:
        case wsMessageType.WS_CREATE_GAME: {
            const {user} = action.payload;
            return {...state, balance: user.balance};
        }

        case wsMessageType.WS_DISCONNECT_GAME: {
            const {user} = action.payload;
            state.balance = user.balance;
            return {...state};
        }

        case wsMessageType.WS_BALANCE_UPDATE: {
            // console.log(action);
            const {user} = action.payload;
            state.balance = user.balance;
            return {...state};
        }

        case wsMessageType.WS_CRASH_UPDATE_USER_STATUS: {
            // console.log(action);
            state.crashStatus = action.payload;
            return {...state};
        }

        default:
            return state;
    }
}
