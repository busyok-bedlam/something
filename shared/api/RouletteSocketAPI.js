import Socket from '../lib/rouletteWS';


export default class RouletteSocketAPI {
    async send(type, data) {
        const wsInstance = await Socket.getInstance();
        wsInstance.send(JSON.stringify({type, data}));
    }

    async close() {
        const wsInstance = await Socket.getInstance();
        wsInstance.close();
    }

}
