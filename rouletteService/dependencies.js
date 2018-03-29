import di              from './di';
import {
    CONTAINER_TYPE_VALUE,
    CONTAINER_TYPE_FACTORY,
    CONTAINER_TYPE_SERVICE,
} from "simple-ioc-container/src/constants";
import mainConfig      from '../config';
import chatConfig      from '../config/chat';
import rouletteConfig      from '../config/roulette';
import wsMessageType   from '../config/wsMessageType.json';
import {mongoStore}    from '../server/middlewares/05-mongooseSession';
import db              from '../db'


const config = Object.assign(
    {},
    mainConfig,
    {wsMessageType},
    {chatConfig},
    {rouletteConfig}
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
        key: 'sessionStore',
        type: 'value',
        value: mongoStore
    });