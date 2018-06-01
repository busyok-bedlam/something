import config from '../../config/index';
import {WS_CHAT_CLOSE, WS_CHAT_CHANGE_ROOM} from '../../config/wsMessageType.json';

export default class Socket {
    static instance = null;
    static dispatch = null;

    static setDispatch(dispatch) {
        Socket.dispatch = dispatch;
    }

    static start(dispatch) {
        if (!process.env.BROWSER) {
            return false;
        }

        return new Promise((resolve, reject) => {
            try {
                if (Socket.instance && Socket.instance.readyState === 1) {
                    resolve(Socket.instance);
                } else {

                    Socket.instance = new WebSocket(
                        // `wss://${config.HOST}:${config.HTTP_PORT_CHAT}`,
                        `${config.WS_CHAT_HOST}`,
                        'echo-protocol',
                    );
                    Socket.instance.onopen = event => {
                        console.log('Chat socket open.');
                        Socket.instance.send(JSON.stringify({
                            type: WS_CHAT_CHANGE_ROOM, data: {
                                room: localStorage.getItem('chatRoomBlaze') || 'eng'
                            }
                        }));
                        Socket.instance.onmessage = event => {
                            let data = JSON.parse(event.data);
                            return Socket.dispatch(data);
                        };
                        Socket.instance.onclose = event => {
                            console.log('Chat Socket closed');
                            if (Socket.dispatch) {
                                Socket.dispatch({
                                    type: WS_CHAT_CLOSE,
                                })
                            }
                            if (!event.wasClean) {
                                console.log('Chat Socket reconnection');
                                setTimeout(() => {
                                    Socket.start();
                                }, 5000);
                            }
                        };

                        resolve(Socket.instance);

                    };

                    Socket.instance.onerror = err => {
                        console.error(err);
                        setTimeout(() => {
                            Socket.start();
                        }, 5000);
                    }
                }
            } catch (error) {
                console.error('Error in chat socket connection: ' + error.message);
            }
        });
    }

    static async getInstance() {
        if (Socket.instance) {
            return Socket.instance;
        } else {
            await Socket.start();
            return Socket.instance;
        }
    }

}
