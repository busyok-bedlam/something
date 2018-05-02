import WebSocket     from 'ws';
import Clients       from './Clients';
import cookie        from "cookie";
import cookieParser  from "cookie-parser";
import wsMessageType from '../../config/wsMessageType.json';
import di            from './../di';
import express       from 'express';
import http          from 'http'
import parser        from 'body-parser';
const config = di.get('config');;
const UsersModel = di.get('db').models.users;

const app = express();

// app.use(function (req, res) {
//     res.send({ msg: "hello" });
// });

app.use(parser.json());
app.use("/user-update", function (req, res) {
    const wsInstance = Clients.getClient(req.body.id);
    if(wsInstance){
        wsInstance.ws.removeListener('message', wsInstance.onMessage);
        const incoming = (data) => {
            const payload = JSON.parse(data);
            WSServer.__clientOnMessageCallBack && WSServer.__clientOnMessageCallBack(req.body.id, payload, WSServer.send, true /* is auth user*/, req.body.state, wsInstance.isAdmin, wsInstance.isModerator)
        };
        wsInstance.onMessage = incoming;
        wsInstance.ws.on('message', incoming);
    }
    WSServer.sendToAll({
        type: config.wsMessageType.WS_CHAT_USER_BLOCK,
        payload: {
            id: req.body.id,
            muted: req.body.state
        }
    });
});

const server = http.createServer(app);

export default class WSServer {
    static instance = null;
    static sessionStore = null;
    static broadcastPeriod = null;

    static start(sessionStore, {port, isOnlyOrigin, origin, broadcastPeriod}) {

        WSServer.sessionStore = sessionStore;
        WSServer.broadcastPeriod = broadcastPeriod;
        WSServer.instance = new WebSocket.Server({
            server,
            // host: config.HOST,
            // port,

            verifyClient(info, cb) {
                if (isOnlyOrigin) {
                    cb(info.origin === origin);
                } else {
                    cb(true);
                }
            }
        });

        server.listen(port, function listening() {
            console.log('EXPRESS server on %d', server.address().port);
        });

        WSServer.instance.on('connection', WSServer.__onConnection || (() => null));

        WSServer.instance.on('listening', () => {
            console.log(`WS server listening on port: ${port}`)
        });

        WSServer.__startBroadcast();
    }

    static setOnConnection(cb) {
        WSServer.__clientOnConnectionCallBack = cb;
    }

    static setOnMessage(cb) {
        WSServer.__clientOnMessageCallBack = cb;
    }

    static setOnClose(cb) {
        WSServer.__clientOnCloseCallBack = cb;
    }

    static setOnBroadcast(cb) {
        WSServer.__clientOnBroadcastCallBack = cb;
    }

    static __clientOnConnectionCallBack = null;
    static __clientOnMessageCallBack = null;
    static __clientOnCloseCallBack = null;
    static __clientOnBroadcastCallBack = null;

    static send(id, data) {
        const client = Clients.getClient(id);
        if (!client) {
            return false;
        } else {
            return client.ws.send(data);
        }

    }

    static sendToAll(data) {
        for (const client in Clients.authClients) {
            Clients.authClients[client].ws.send(data);
        }
        for (const client in Clients.clients) {
            Clients.clients[client].ws.send(data);
        }
    }

    static async __onConnection(ws) {
        console.log(`New ws connection`);
        WSServer.__prepareWS(ws);
        const sid = WSServer.__getSID(
            ws.upgradeReq,
            "sid"
        );
        const sessionID = `koa:sess:${sid}`;
        const session = await WSServer.sessionStore.Session.findOne({sid: sessionID});
        const dataSession = JSON.parse(session.blob);

        if (dataSession.passport) {
            const userID = dataSession.passport.user;
            const client = Clients.getClient(userID);
            const user = await UsersModel.findById(userID);
            console.log('IS MUTED: ' + user.muted);
            if(client){
                return ws.send({
                    type: wsMessageType.WS_ERROR,
                    payload: {
                        message: `Close old connection!`
                    }
                })
            }

            const incoming= (data) => {
                const payload = JSON.parse(data);
                WSServer.__clientOnMessageCallBack && WSServer.__clientOnMessageCallBack(userID, payload, WSServer.send, true /* is auth user*/, user.muted, user.isAdmin, user.isModerator)
            };
            Clients.addAuthClient(userID, {ws, room: 'eng', onMessage: incoming, isAdmin: user.isAdmin, isModerator: user.isModerator});
            ws.on('close', () => {
                WSServer.__clientOnCloseCallBack && WSServer.__clientOnCloseCallBack(userID);
                Clients.removeClient(userID);
            });
            ws.on('message', incoming);

            WSServer.__clientOnConnectionCallBack && WSServer.__clientOnConnectionCallBack(userID, WSServer.send, true /*is auth user*/, user.muted, user.isAdmin, user.isModerator);
        } else {
            const client = Clients.getClient(sid);
            if (client){
                return ws.send({
                    type: wsMessageType.WS_ERROR,
                    payload: {
                        message: `Close old connection!`
                    }
                })
            }

            Clients.addClient(sid, {ws, room: 'eng'});
            // visitors[sid] = {ws};
            ws.on('close', () => {
                const wsInstance = Clients.removeClient(sid);
                WSServer.__clientOnCloseCallBack && WSServer.__clientOnCloseCallBack(wsInstance);
            });

            ws.on('message', function incoming(data) {
                const payload = JSON.parse(data);
                WSServer.__clientOnMessageCallBack && WSServer.__clientOnMessageCallBack(sid, payload, WSServer.send);
            });

            WSServer.__clientOnConnectionCallBack && WSServer.__clientOnConnectionCallBack(sid, WSServer.send, false);
        }


    }

    static __getSID(request, name, secret = '') {
        try {
            let cookies = cookie.parse(request.headers.cookie || ''),
                sidCookie = cookies[name];
            const sid = cookieParser.signedCookie(sidCookie, secret);

            return sid;
        } catch (e) {
            return null;
        }
    }

    static __prepareWS(ws) {
        const send = ws.send.bind(ws);

        ws.send = (data) => {
            try {
                send(JSON.stringify(data));
            } catch (e) {
                console.log('Socket sending error: ', e.message);
            }
        };

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
        })
    }

    static __startBroadcast() {
        if (WSServer.broadcastPeriod && WSServer.__clientOnBroadcastCallBack) {
            setInterval(() => WSServer.__clientOnBroadcastCallBack(WSServer.send), WSServer.broadcastPeriod);
        }
    }

}