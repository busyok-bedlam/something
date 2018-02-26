import config from '../../config/index';

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
                        `ws://${config.HOST}:${config.HTTP_PORT_WS}`,
                        'echo-protocol',
                    );
                    Socket.instance.onopen = event => {

                        console.log('Common socket open.');
                        Socket.instance.onmessage = event => {
                            let data = JSON.parse(event.data);
                            return Socket.dispatch(data);
                        };
                        Socket.instance.onclose = event => {
                            console.log('Socket closed');
                            if (!event.wasClean) {
                                console.log('Socket reconnection');
                                setTimeout(() => {
                                    Socket.start();
                                }, 5000);
                            }
                        };

                        resolve(Socket.instance);

                    };
                }
            } catch (error) {
                console.error('Error in socket connection: ' + error.message);
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
