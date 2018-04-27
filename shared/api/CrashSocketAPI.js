import Socket from '../lib/crashWS';


export default class CrashSocketAPI {
    async send(type, data) {
        const wsInstance = await Socket.getInstance();
        wsInstance.send(JSON.stringify({type, data}));
    }

    async close() {
        const wsInstance = await Socket.getInstance();
        wsInstance.close();
    }

}
