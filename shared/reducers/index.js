import {combineReducers} from 'redux';
import {routerReducer}   from 'react-router-redux';
import user              from './user';
import loadingScreen     from './loadingScreen';
import modal             from './modal';
import chat              from './chat';
import game              from './game';
import crash              from './crash';
import roulette           from './roulette';

export default combineReducers({
    user,
    loadingScreen,
    modal,
    chat,
    game,
    crash,
    roulette,
    routing: routerReducer,
});
