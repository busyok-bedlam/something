import di              from './di';
import {
    CONTAINER_TYPE_VALUE,
    CONTAINER_TYPE_FACTORY,
    CONTAINER_TYPE_SERVICE,
} from "simple-ioc-container/src/constants";
import mainConfig      from '../config';
import commonConfig    from '../config/commonConfig';
import botsConfig       from '../config/bots';
import db              from '../db';
import passport        from './lib/passport';

const config = {
    ...mainConfig,
    commonConfig,
    botsConfig,
};


di
    .register({
        key: "config",
        type: CONTAINER_TYPE_VALUE,
        value: config
    })
    .register({
        key: "passport",
        type: CONTAINER_TYPE_VALUE,
        value: passport
    })
    .register({
        key: "db",
        type: CONTAINER_TYPE_VALUE,
        value: db,
    })
    .register({
        key: "services",
        type: CONTAINER_TYPE_VALUE,
        value: require(__dirname + "/services").default
    });
