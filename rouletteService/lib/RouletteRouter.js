import di      from '../di';
import Clients from './Clients';
const config = di.get('config');
const db = di.get('db');
const {
    WS_ROULETTE_NEW_BET,
    WS_BALANCE_UPDATE
} = config.wsMessageType;


export default class RouletteRouter {

    static async onClientConnection() {
        console.log('connection');
    }

    static async onClientMessage(id, payload, sendResponse, isAuth = false) {
        console.log(payload);

        try {
            const {type, data} = payload;

            switch (type) {
                case WS_ROULETTE_NEW_BET: {
                    console.log('new bet');

                    return sendResponse(id, {
                        type: WS_BALANCE_UPDATE,
                        payload: {
                            message: `WS return -${data.value}`
                        }
                    })
                }
                break;
            }

        } catch (error) {
            console.log(error);
        }
    }

    static async onClientClose() {
        console.log('close');
    }

    static async onClientBroadcast() {
        console.log('broadcast')
    }

}