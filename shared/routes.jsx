import React from "react";
import App from "./containers/App.jsx";
import {IndexRoute, Route} from "react-router";

import RoulettePage from "./containers/RoulettePage.jsx";
import CrashPage from "./containers/CrashPage.jsx";
import FAQPage from "./containers/pages/FAQPage.jsx";
import ShopPage from "./containers/pages/ShopPage.jsx";
import SupportPage from "./containers/pages/SupportPage.jsx";
import ProfilePage from "./containers/pages/ProfilePage.jsx";
import TopPlayersPage from "./containers/pages/TopPlayersPage.jsx";
import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx';
import NotFoundPage from './containers/NotFoundPage.jsx';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={RoulettePage}/>
        <Route path='/' component={RoulettePage}/>
        <Route path='/crash' component={CrashPage}/>
        <Route path='/faq' component={FAQPage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/support' component={SupportPage}/>
        <Route path='/profile' component={ProfilePage}/>
        <Route path='/top-players' component={TopPlayersPage}/>
        <Route path='/privacy-policy' component={PrivacyPolicy}/>
        <Route path='*' component={NotFoundPage}/>
    </Route>
);