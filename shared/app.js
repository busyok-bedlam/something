import React            from 'react';
import ReactDOM         from 'react-dom';
import {Provider}       from 'react-redux';
import {Router}         from 'react-router';
import configureStore   from './store/configureStore';
import routes           from './routes.jsx';
import {browserHistory} from 'react-router';
import './assets/styles/main.scss';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,
    document.getElementById('root')
);