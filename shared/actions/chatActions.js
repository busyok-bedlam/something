import api from '../api';
import {WS_CHAT_MESSAGE, WS_CHAT_CHANGE_ROOM, WS_CHAT_USER_BLOCK} from '../../config/wsMessageType.json'

export function sendMessage(message = '') {
    return async dispatch => {
        api.chatSocket.send(WS_CHAT_MESSAGE, {message});
    }
}

export function changeRoom(room = '') {
    return async dispatch => {
        api.chatSocket.send(WS_CHAT_CHANGE_ROOM, {room});
    }
}

export function blockUser(info = {}) {
    return async dispatch => {
        api.chatSocket.send(WS_CHAT_USER_BLOCK, info);
    }
}