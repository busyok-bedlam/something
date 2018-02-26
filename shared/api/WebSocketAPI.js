import Socket from '../lib/commonWS';

export default class WebSocketAPI {
    async send(type, data) {
        const wsInstance = await Socket.getInstance();
        wsInstance.send(JSON.stringify({type, data}));
    }

    async close() {
        const wsInstance = await Socket.getInstance();
        wsInstance.close();
    }
}
