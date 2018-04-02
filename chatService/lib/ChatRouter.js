import di      from '../di';
import Clients from './Clients';
const config = di.get('config');
const db = di.get('db');
const UsersModel = db.models.users;

export default class ChatRouter {
    static __newMessages = [];
    static messages = [];

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

                        const message = {
                            text: data.message,
                            displayName: user.displayName,
                            avatar: user.avatar,
                            date: new Date(),
                        };

                        ChatRouter.__newMessages.push(message);
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
            sendResponse(
                id,
                {
                    type: config.wsMessageType.WS_CHAT_MESSAGES,
                    payload: {
                        messages: ChatRouter.messages,
                        usersOnline: Object.keys(Clients.allClients).length,
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

    static onClientClose() {
        console.log('close');
    }

    static async onClientBroadcast(sendResponseToAll) {
        if (ChatRouter.__newMessages.length) {
            sendResponseToAll(
                {
                    type: config.wsMessageType.WS_CHAT_NEW_MESSAGES,
                    payload: {
                        messages: ChatRouter.__newMessages,
                        usersOnline: Object.keys(Clients.allClients).length,
                    }
                }
            );
            ChatRouter.__newMessages.forEach(message => ChatRouter.messages.push(message));
            if (ChatRouter.messages.length > config.chatConfig.CHAT_LENGTH) {
                ChatRouter.messages.splice(0, ChatRouter.messages.length - config.chatConfig.CHAT_LENGTH);
            }
            ChatRouter.__newMessages = [];

        }
    }

}