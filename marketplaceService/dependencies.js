import di              from './di';
import {
    CONTAINER_TYPE_VALUE,
    CONTAINER_TYPE_FACTORY,
    CONTAINER_TYPE_SERVICE,
} from "simple-ioc-container/src/constants";
import mainConfig      from '../config';
import chatConfig      from '../config/chat';
import wsMessageType   from '../config/wsMessageType.json';
import db              from '../db';
import SteamApiIO      from './lib/SteamApiIO';
// import botManager      from './lib/BotManager';

const config = Object.assign(
    {},
    mainConfig,
    {wsMessageType},
    {chatConfig},
);

di
    .register({
        key: "config",
        type: CONTAINER_TYPE_VALUE,
        value: config
    })
    .register({
        key: "db",
        type: CONTAINER_TYPE_VALUE,
        value: db,
    })
    .register({
        key: "SteamApiIO",
        type: CONTAINER_TYPE_VALUE,
        value: SteamApiIO,
    })
    // .register({
    //     key: "botManager",
    //     type: CONTAINER_TYPE_VALUE,
    //     value: botManager,
    // })
