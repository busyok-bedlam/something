import {combineReducers} from 'redux';
import {routerReducer}   from 'react-router-redux';
import user              from './user';
import loadingScreen     from './loadingScreen';
import modal             from './modal';
import chat              from './chat';
import game              from './game';

export default combineReducers({
    user,
    loadingScreen,
    modal,
    chat,
    game,
    routing: routerReducer,
});
