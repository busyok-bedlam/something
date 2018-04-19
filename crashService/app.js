import                 './dependencies';
import WSServer   from './lib/WSServer';
import GameRouter from './lib/GameRouter';
import di         from './di';

const sessionStore = di.get('sessionStore');
const config = di.get('config');

GameRouter.gameStart();

WSServer.setOnConnection(GameRouter.onClientConnection);
WSServer.setOnMessage(GameRouter.onClientMessage);
WSServer.setOnClose(GameRouter.onClientClose);
WSServer.setOnBroadcast(GameRouter.onClientBroadcast);

WSServer.start(
    sessionStore,
    {
        port: config.HTTP_PORT_CRASH,
        isOnlyOrigin: false,
        origin: config.ORIGIN,
        broadcastPeriod: config.crashConfig.BROADCAST_PERIOD,
    }
);
