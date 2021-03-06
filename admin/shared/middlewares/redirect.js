import {browserHistory} from 'react-router'

export const ROUTING = 'ROUTING';

export const redirect = store => next => action => {
    if (action.type === ROUTING) {
        browserHistory[action.payload.method](action.payload.url);
    }

    return next(action);
};