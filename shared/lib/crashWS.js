import config from '../../config/index';
import {WS_CRASH_CLOSE} from '../../config/wsMessageType';

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
                        `ws://${config.HOST}:${config.HTTP_PORT_CRASH}`,
                        'echo-protocol',
                    );
                    Socket.instance.onopen = event => {

                        console.log('Crash socket open.');
                        Socket.instance.onmessage = event => {
                            try {
                                let data = JSON.parse(event.data);
                                return Socket.dispatch(data);
                            } catch (error) {
                                // console.error('Error in game socket JSON.parse: ' + error.message);
                            }
                        };
                        Socket.instance.onclose = event => {
                            console.log('Crash Socket closed');
                            if(Socket.dispatch){
                                Socket.dispatch({
                                    type: WS_CRASH_CLOSE,
                                })
                            }
                            if (!event.wasClean) {
                                console.log('Crash Socket reconnection');
                                setTimeout(() => {
                                    Socket.start();
                                }, 5000);
                            }
                        };

                        resolve(Socket.instance);

                    };
                }
            } catch (error) {
                console.error('Error in crash socket connection: ' + error.message);
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
