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
    })
    .register({
        key: 'players',
        type: CONTAINER_TYPE_VALUE,
        value: {
            ROULETTE_COLOR_PINK: [],
            ROULETTE_COLOR_GREEN: [],
            ROULETTE_COLOR_GREY: [],
            total: {
                ROULETTE_COLOR_PINK: 0,
                ROULETTE_COLOR_GREEN: 0,
                ROULETTE_COLOR_GREY: 0,
            }
        }
    })
    .register({
        key: 'currentGame',
        type: CONTAINER_TYPE_VALUE,
        value: {}
    })
    .register({
        key: 'lastGames',
        type: CONTAINER_TYPE_VALUE,
        value: []
    })
    .register({
        key: 'redisClient',
        type: CONTAINER_TYPE_VALUE,
        value: require('./lib/redis').default
    });