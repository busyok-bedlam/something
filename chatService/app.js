import                 './dependencies';
import WSServer   from './lib/WSServer';
import ChatRouter from './lib/ChatRouter';
import di         from './di';

const sessionStore = di.get('sessionStore');
const config = di.get('config');

WSServer.setOnConnection(ChatRouter.onClientConnection);
WSServer.setOnMessage(ChatRouter.onClientMessage);
WSServer.setOnClose(ChatRouter.onClientClose);
WSServer.setOnBroadcast(ChatRouter.onClientBroadcast);

WSServer.start(
    sessionStore,
    {
        port: config.HTTP_PORT_CHAT,
        // isOnlyOrigin: true,
        isOnlyOrigin: false,
        origin: config.ORIGIN,
        broadcastPeriod: config.chatConfig.BROADCAST_PERIOD,
    }
);
