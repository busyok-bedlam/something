import di              from './di';
import mainConfig      from '../config';
import botsConfig      from '../config/bots';
import db              from '../db';

const config = Object.assign({}, mainConfig, {botsConfig});

di
    .register({
        key: "config",
        type: "value",
        value: config
    })
    .register({
        key: "db",
        type: "value",
        value: db,
    });

