import React, {Component} from 'react';
import App from './containers/App.jsx';
import Login from './containers/LoginPage.jsx';
import UsersPage from './containers/UsersPage.jsx';
import GamesPage from './containers/GamesPage.jsx';
import BotsPage from './containers/BotsPage.jsx';
import TransactionsPage from './containers/TransactionsPage.jsx';
import PayoutsPage from './containers/PayoutsPage.jsx';
import SupportPage from './containers/SupportPage.jsx';
import FaqsPage from './containers/FaqsPage.jsx';
import UserPage from './components/pages/Users/User.jsx';
import Banners from './components/pages/Banners.jsx';
import {Route} from 'react-router'


export default (
    <Route component={App}>
        <Route path="/" components={Login}/>
        <Route path="/users(/:page)" components={UsersPage}/>
        <Route path="/user/details" components={UserPage}/>
        <Route path="/games(/:page)" components={GamesPage}/>
        <Route path="/bots(/:page)" components={BotsPage}/>
        <Route path="/transactions" components={TransactionsPage}/>
        <Route path="/payouts" components={PayoutsPage}/>
        <Route path="/support(/:page)" components={SupportPage}/>
        <Route path="/faqs(/:page)" components={FaqsPage}/>
        <Route path="/banner" components={Banners}/>
    </Route>
);