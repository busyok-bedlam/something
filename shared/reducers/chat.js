import {
    WS_CHAT_MESSAGES,
    WS_CHAT_NEW_MESSAGES,
    WS_CHAT_CHANGE_ROOM,
    WS_CHAT_CLOSE,
} from '../../config/wsMessageType.json';

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

        case WS_CHAT_CLOSE: {
            return {...state, isLoading: true};
        }

        default:
            return state;
    }
}
