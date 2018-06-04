import WS from "ws";
import di from '../di';

const {
    HOST,
    WS_HOST,
    HTTP_PORT_WS,
    WS_COMMON_HOST
} = di.get('config');

const UPDATE_TOTALS = 'UPDATE_TOTALS';

const redisClient = di.get('redisClient');

let commonSocket = null;

class CommonSocket {
    constructor() {
        if (!commonSocket) {

            // const obj = {
            //     host: WS_HOST, //HOSt
            //     port: 'commonWS', //HTTP_PORT_WS
            //     clientTracking: true
            // };

            commonSocket = new WS.Server({
                    // host: HOST, //HOST
                    port: HTTP_PORT_WS,
                    clientTracking: true
                }
            );


            this.__onConnection();

            this.timer = setInterval(this.__broadcast, 1000);
        }

        return commonSocket;
    }

    __onConnection() {
        commonSocket.on('connection', ws => {
            let pingsSent = 0;
            const interval = setInterval(() => {
                if (pingsSent > 1) {
                    ws.close();
                    clearInterval(interval);
                } else {
                    ws.ping(null, null, true);
                    pingsSent++;
                }
            }, 300 * 1000);

            ws.on("pong", () => {
                pingsSent = 0;
            });
        });
    }

    __broadcast() {
        const roulettePromise = new Promise((resolve, reject) => {
            redisClient.get('RouletteTotal', (err, reply) => {
                if (err) {
                    reject(err);
                }
                resolve(reply);
            });
        });

        const crashPromise = new Promise((resolve, reject) => {
            redisClient.get('CrashTotal', (err, reply) => {
                if (err) {
                    reject(err);
                }
                resolve(reply);
            });
        });

        Promise
            .all([roulettePromise, crashPromise])
            .then(totals => {
                // console.log(totals);
                const data = JSON.stringify({
                    type: UPDATE_TOTALS,
                    RouletteTotal: totals[0],
                    CrashTotal: totals[1]
                });

                commonSocket.clients.forEach(client => {
                    if (client.readyState === WS.OPEN) {
                        client.send(data);
                    }
                })
            })
    }
}

new CommonSocket();
