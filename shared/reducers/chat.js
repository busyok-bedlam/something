import {
    WS_CHAT_MESSAGES,
    WS_CHAT_NEW_MESSAGES,
    WS_CHAT_CHANGE_ROOM,
    WS_CHAT_CLOSE,
    WS_CHAT_USER_BLOCK,
    WS_ERROR
} from '../../config/wsMessageType.json';
import {toast} from 'react-toastify';

let initialState = {
    messages: [],
    room: 'eng',
    isLoading: true,
    usersOnline: {
        eng: 0,
        tur: 0
    },
};


export default function modal(state = initialState, action) {
    switch (action.type) {
        case WS_CHAT_MESSAGES: {
            const {messages, usersOnline, room} = action.payload;
            return {...state, messages, room: room, isLoading: false, usersOnline};
        }

        case WS_CHAT_NEW_MESSAGES: {
            const {messages, usersOnline} = action.payload;
            messages.forEach(message => state.messages.push(message));
            return {...state, isLoading: false, usersOnline, };
        }

        case WS_CHAT_CHANGE_ROOM: {
            const {messages, room, usersOnline} = action.payload;
            return {...state, isLoading: false, messages, usersOnline, room};
        }

        case WS_CHAT_USER_BLOCK: {
            const {id, muted} = action.payload;
            let newMessages = [];
            newMessages = state.messages.map((el) => {
                if (el.id === id)  {
                    el.muted = muted;
                }
                return el;
            });
            return {...state, isLoading: false, messages: newMessages};
        }

        case WS_ERROR: {
            toast(action.payload.message);
            return state;
        }

        case WS_CHAT_CLOSE: {
            return {...state, isLoading: true};
        }

        default:
            return state;
    }
}
