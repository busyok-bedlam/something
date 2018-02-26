import _1_logger from './02-logger';
import _2_error from './03-errors';
import _3_bodyParser from './06-bodyParser';

const middlewares = [];

middlewares.push(_1_logger);
middlewares.push(_2_error);
middlewares.push(_3_bodyParser);

export default middlewares;
