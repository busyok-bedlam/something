import di from '../di';
import Clients from './Clients';
import WSServer from './WSServer';

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

    static async onClientMessage(id, payload, sendResponse, isAuth = false, isBlocked , isAdmin = false, isModerator = false) {
    try {
            const {type, data} = payload;
            switch (type) {
                case config.wsMessageType.WS_CHAT_MESSAGE: {
                    try {
                        if (!isAuth) {
                            throw new Error("Not auth user");
                        }
                        console.log("isblocked" + isBlocked)
                        if (isBlocked) {
                            console.error("Blocked");
                            return sendResponse(
                                id,
                                {
                                    type: config.wsMessageType.WS_ERROR,
                                    payload: {
                                        message: `Error: You are muted!`
                                    }
                                }
                            )
                        }
                        const user = await UsersModel.findById(id);
                        const room = Clients.allClients[id].room;
                        const message = {
                            text: data.message,
                            displayName: user.displayName,
                            id: user._id,
                            level: user.level,
                            muted: user.muted,
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

                case config.wsMessageType.WS_CHAT_USER_BLOCK: {
                    if(!isAdmin && !isModerator) return;
                    let date;
                    if (data.hours === 'forever') {
                        date = new Date(2018, 0, 0);
                    } else {
                        if(data.hours === 'unmute') {
                            date = new Date(0);
                        } else {
                            date = new Date(Date.now() + 60 * 60 * parseInt(data.hours) * 1000);
                        }
                    }
                    const wsInstance = Clients.getClient(data.id);

                    await UsersModel.findOneAndUpdate({_id: data.id}, { $set: {muted: data.state, mutedToDate: date}}, {new: true}, function(err, doc){
                        if(err){
                            console.log("Something wrong when updating data!");
                        }
                    });
                    if(wsInstance){
                        wsInstance.ws.removeListener('message', wsInstance.onMessage);
                        const incoming = (newData) => {
                            const newPayload = JSON.parse(newData);
                            console.log(payload);
                            console.log(newPayload);
                            WSServer.__clientOnMessageCallBack && WSServer.__clientOnMessageCallBack(data.id, newPayload, WSServer.send, true /* is auth user*/, data.state, wsInstance.isAdmin, wsInstance.isModerator)
                        };
                        wsInstance.onMessage = incoming;
                        wsInstance.ws.on('message', incoming);
                    }
                    WSServer.sendToAll({
                        type: config.wsMessageType.WS_CHAT_USER_BLOCK,
                        payload: {
                            id: data.id,
                            muted: data.state
                        }
                    });
                    break
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