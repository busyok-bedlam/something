import Socket from '../lib/chatWS';

export default class ChatSocketAPI {
    async send(type, data) {
        const wsInstance = await Socket.getInstance();
        wsInstance.send(JSON.stringify({type, data}));
    }

    async close() {
        const wsInstance = await Socket.getInstance();
        wsInstance.close();
    }
}
