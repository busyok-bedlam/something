import logger_mid from './02-logger';
import errors_mid from './03-errors';
import bodyParser_mid from './06-bodyParser';

export default {
    initMiddlewares:[
        logger_mid,
        errors_mid,
        bodyParser_mid,
    ]
}