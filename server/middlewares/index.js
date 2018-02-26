// import compose from 'koa-compose';

import static_mid from './01-static';
import logger_mid from './02-logger';
import errors_mid from './03-errors';
import cookies_mid from './04-cookies';
import monooseSession_mid from './05-mongooseSession';
import bodyParser_mid from './06-bodyParser';
// import multer from './07-multer';
import csrf_mid from './08-csrf';
import passportInit_mid from './10-passportInitialize';
import passportSeesion_mid from './11-passportSession';
import isomorphicMiddleware from './isomorhicMiddleware';

export default {
    initMiddlewares:[
        static_mid,
        logger_mid,
        errors_mid,
        cookies_mid,
        monooseSession_mid,
        bodyParser_mid,
        // multer,
        csrf_mid,
        passportInit_mid,
        passportSeesion_mid,
    ],
    isomorphicMiddleware,
}