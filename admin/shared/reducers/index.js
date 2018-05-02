import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import admin from './admin';
import users from './users';
import games from './games';
import bots from './bots';
import supports from './supports';
import faqs from './faqs';
import drawer from './drawer';

export default combineReducers({
    admin,
    users,
    games,
    bots,
    supports,
    faqs,
    drawer,
    routing: routerReducer
})