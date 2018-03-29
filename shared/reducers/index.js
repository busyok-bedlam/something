import {combineReducers} from 'redux';
import {routerReducer}   from 'react-router-redux';
import user              from './user';
import loadingScreen     from './loadingScreen';
import modal             from './modal';
import chat              from './chat';
import game              from './game';
import roulette           from './roulette';

export default combineReducers({
    user,
    loadingScreen,
    modal,
    chat,
    game,
    roulette,
    routing: routerReducer,
});
