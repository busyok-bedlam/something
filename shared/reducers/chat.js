import {
    WS_CHAT_MESSAGES,
    WS_CHAT_NEW_MESSAGES,
    WS_CHAT_CLOSE,
} from '../../config/wsMessageType.json';
let initialState = {
    messages: [],
    isLoading: true,
    usersOnline: 0,
};


export default function modal(state = initialState, action) {
    switch (action.type) {
        case WS_CHAT_MESSAGES: {
            const {messages, usersOnline} = action.payload;
            return {...state, messages, isLoading: false, usersOnline};
        }

        case WS_CHAT_NEW_MESSAGES: {
            const {messages, usersOnline} = action.payload;
            messages.forEach(message => state.messages.push(message));
            return {...state, isLoading: false, usersOnline,};
        }

        case WS_CHAT_CLOSE: {
            return {...state, isLoading: true, usersOnline: 0};
        }

        default:
            return state;
    }
}
