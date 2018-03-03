import React from "react";
import App from "./containers/App.jsx";
import {IndexRoute, Route} from "react-router";

import RoulettePage from "./containers/RoulettePage.jsx";
import FAQPage from "./containers/pages/FAQPage.jsx";
import SupportPage from "./containers/pages/SupportPage.jsx";
import NotFoundPage from './containers/NotFoundPage.jsx';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={RoulettePage}/>
        <Route path='/' component={RoulettePage}/>
        <Route path='/faq' component={FAQPage}/>
        <Route path='/support' component={SupportPage}/>

        <Route path='*' component={NotFoundPage}/>
    </Route>
);