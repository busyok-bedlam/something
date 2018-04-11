import di from '../di';
import Clients from './Clients';

const config = di.get('config');
const db = di.get('db');
const UsersModel = db.models.users;

export default class ChatRouter {
    static __newMessages = {
        eng: [],
        tur: []
    };
    static messages = {
        eng: [],
        tur: []
    };
    static usersOnline = {
        eng: 0,
        tur: 0
    };

    static async onClientMessage(id, payload, sendResponse, isAuth = false) {
        try {
            const {type, data} = payload;
            switch (type) {
                case config.wsMessageType.WS_CHAT_MESSAGE: {
                    try {
                        if (!isAuth) {
                            throw new Error("Not auth user");
                        }
                        const user = await UsersModel.findById(id);
                        const room = Clients.allClients[id].room;
                        const message = {
                            text: data.message,
                            displayName: user.displayName,
                            level: user.level,
                            isAdmin: user.isAdmin,
                            isModerator: user.isModerator,
                            avatar: user.avatar,
                            date: new Date(),
                        };
                        ChatRouter.__newMessages[room].push(message);
                        return;
                    } catch (error) {
                        console.error(error);
                        return sendResponse(
                            id,
                            {
                                type: config.wsMessageType.WS_ERROR,
                                payload: {
                                    message: `Error in sending: ${error.message || error.toString()}`
                                }
                            }
                        )
                    }
                }

                case config.wsMessageType.WS_CHAT_CHANGE_ROOM: {
                    try {
                        if (!isAuth) {
                            console.log("Not auth user changed room");
                        } else {
                            let oldRoom = Clients.allClients[id].room;
                            ChatRouter.usersOnline[oldRoom]--;
                            Clients.allClients[id].room = data.room;
                            ChatRouter.usersOnline[data.room]++;
                        }
                        return sendResponse(
                            id,
                            {
                                type: config.wsMessageType.WS_CHAT_CHANGE_ROOM,
                                payload: {
                                    room: data.room,
                                    messages: ChatRouter.messages[data.room],
                                    usersOnline: ChatRouter.usersOnline
                                }
                            }
                        )
                    } catch (error) {
                        console.error(error);
                        return sendResponse(
                            id,
                            {
                                type: config.wsMessageType.WS_ERROR,
                                payload: {
                                    message: `Error in sending: ${error.message || error.toString()}`
                                }
                            }
                        )
                    }
                }

                default: {
                    console.error(`Unknown message type: ${type}`);
                    return sendResponse(
                        id,
                        {
                            type: config.wsMessageType.WS_ERROR,
                            payload: {
                                message: `Unknown message type: ${type}`
                            }
                        }
                    )
                }
            }
        } catch (error) {
            console.error(error.message);
            return sendResponse(
                id,
                {
                    type: config.wsMessageType.WS_ERROR,
                    payload: {
                        message: `Error: ${error.message}`
                    }
                }
            )
        }
    }

    static async onClientConnection(id, sendResponse, isAuth) {
        try {
            console.log('User connected, isAuth: ' + isAuth);
            const room = Clients.allClients[id].room;
            if(isAuth) {
                ChatRouter.usersOnline[room]++;
            }
            sendResponse(
                id,
                {
                    type: config.wsMessageType.WS_CHAT_MESSAGES,
                    payload: {
                        room,
                        messages: ChatRouter.messages[room],
                        usersOnline: ChatRouter.usersOnline
                    }
                }
            )
        } catch (error) {
            console.error(error);
            sendResponse(
                id,
                {
                    type: config.wsMessageType.WS_ERROR,
                    payload: {
                        message: `Error in sending initial data: ${error.message || error.toString()}`
                    }
                }
            )
        }
    }

    static onClientClose(userID) {
        console.log('close');
        if (userID) {
            const room = Clients.allClients[userID].room;
            ChatRouter.usersOnline[room]--;
        }
    }

    static async onClientBroadcast(sendResponse) {
        // Sending to all user messages from chat
        for (let client in Clients.allClients) {
            if (Clients.allClients.hasOwnProperty(client)) {
                let clientRoom = Clients.allClients[client].room;
                sendResponse(
                    client,
                    {
                        type: config.wsMessageType.WS_CHAT_NEW_MESSAGES,
                        payload: {
                            room: clientRoom,
                            messages: ChatRouter.__newMessages[clientRoom],
                            usersOnline: ChatRouter.usersOnline,
                        }
                    }
                )
            }
        }
        //
        for (let room in ChatRouter.messages) {
            if (ChatRouter.messages.hasOwnProperty(room)) {
                ChatRouter.messages[room] = ChatRouter.messages[room].concat(ChatRouter.__newMessages[room]);
                ChatRouter.__newMessages[room] = [];
                if (ChatRouter.messages[room].length > config.chatConfig.CHAT_LENGTH) {
                    ChatRouter.messages[room].splice(0, ChatRouter.messages[room].length - config.chatConfig.CHAT_LENGTH);
                }
            }
        }
    }

}