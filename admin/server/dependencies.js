import di              from './di';
import mainConfig      from '../../config';
import adminConfig     from '../../config/admin';
import commonConfig    from '../../config/commonConfig';
import db              from '../../db';
import passport        from '../server/lib/passport';
import {mongoStore}    from './middlewares/05-mongooseSession';
const config = {...mainConfig, adminConfig, commonConfig};


di

    .register({
        key: "config",
        type: "value",
        value: config
    })
    .register({
        key: "passport",
        type: "value",
        value: passport
    })
    .register({
        key: "db",
        type: "value",
        value: db,
    })
    .register({
        key: "mongoStore",
        type: "value",
        value: mongoStore
    });
