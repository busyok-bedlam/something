import                 './dependencies';
import WSServer   from './lib/WSServer';
import RouletteRouter from './lib/RouletteRouter';
import di         from './di';

const sessionStore = di.get('sessionStore');
const config = di.get('config');



WSServer.setOnConnection(RouletteRouter.onClientConnection);
WSServer.setOnMessage(RouletteRouter.onClientMessage);
WSServer.setOnClose(RouletteRouter.onClientClose);
WSServer.setOnBroadcast(RouletteRouter.onClientBroadcast);

WSServer.start(
    sessionStore,
    {
        port: config.HTTP_PORT_ROULETTE,
        // isOnlyOrigin: true,
        isOnlyOrigin: false,
        // origin: config.ORIGIN,
        broadcastPeriod: config.rouletteConfig.BROADCAST_PERIOD,
    }
);

RouletteRouter.run();