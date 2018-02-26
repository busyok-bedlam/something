import React from "react";
import App from "./containers/App.jsx";
import {IndexRoute, Route} from "react-router";

import MainPage from "./containers/MainPage.jsx";
import FAQPage from "./containers/pages/FAQPage.jsx";
import NotFoundPage from './containers/NotFoundPage.jsx';


export default (
    <Route path='/' component={App}>
        <IndexRoute component={MainPage}/>
        <Route path='/' component={MainPage}/>
        <Route path='/faq' component={FAQPage}/>

        <Route path='*' component={NotFoundPage}/>
    </Route>
);