import di      from '../di';
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
                            throw new Error("Not auth user");
                        }
                        let oldRoom = Clients.allClients[id].room;
                        ChatRouter.usersOnline[oldRoom]--;
                        Clients.allClients[id].room = data.room;
                        ChatRouter.usersOnline[data.room]++;
                        return sendResponse(
                            id,
                            {
                                type: config.wsMessageType.WS_CHAT_CHANGE_ROOM,
                                payload: {
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
            ChatRouter.usersOnline[room]++;
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
        const room = Clients.allClients[userID].room;
        ChatRouter.usersOnline[room]--;
    }

    static async onClientBroadcast(sendResponseToAll) {
        for (let room in ChatRouter.__newMessages) {
            if (ChatRouter.__newMessages.hasOwnProperty(room)) {
                if (ChatRouter.__newMessages[room].length) {
                    sendResponseToAll(
                        {
                            type: config.wsMessageType.WS_CHAT_NEW_MESSAGES,
                            payload: {
                                room,
                                messages: ChatRouter.__newMessages[room],
                                usersOnline: ChatRouter.usersOnline,
                            }
                        }
                    );
                    ChatRouter.__newMessages[room].forEach(message => ChatRouter.messages[room].push(message));
                    if (ChatRouter.messages[room].length > config.chatConfig.CHAT_LENGTH) {
                        ChatRouter.messages[room].splice(0, ChatRouter.messages[room].length - config.chatConfig.CHAT_LENGTH);
                    }
                }
            }
        }
        ChatRouter.__newMessages = {
            eng: [],
            tur: []
        };
    }

}