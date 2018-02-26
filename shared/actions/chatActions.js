import api from '../api';
import {WS_CHAT_MESSAGE} from '../../config/wsMessageType.json'

export function sendMessage(message='') {
    return async dispatch => {
        api.chatSocket.send(WS_CHAT_MESSAGE, {message});
    }
}
