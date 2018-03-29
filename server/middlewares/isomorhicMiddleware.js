import path                   from 'path';
import fs                     from 'fs';
import acceptLanguage         from 'accept-language';
import React                  from 'react';
import ReactDOM               from 'react-dom/server';
import {Provider}             from 'react-redux';
import {RouterContext, match} from 'react-router';
import configureStore         from '../../shared/store/configureStore';
import config                 from '../../config';
import * as utils             from '../lib/utils';
//for localization______________________________________________________________
import {
    addLocaleData,
    IntlProvider
}                             from 'react-intl';
import en                     from 'react-intl/locale-data/en';
import ru                     from 'react-intl/locale-data/ru';
import routes                 from '../../shared/routes';

addLocaleData([...ru, ...en]);
const messages = {};
const localeData = {};
['en', 'ru'].forEach((locale) => {
    localeData[locale] = fs.readFileSync(path.join(__dirname, `../../node_modules/react-intl/locale-data/${locale}.js`)).toString();
    messages[locale] = require(`../../public/static/lang/${locale}.json`);
});

acceptLanguage.languages(['en', 'ru']);
function detectLocale(ctx) {
    const cookieLocale = ctx.cookies.get('locale');
    return acceptLanguage.get(cookieLocale || ctx.headers['accept-language']) || 'en';
}
//______________________________________________________________________________

const store = configureStore();

export default function (ctx, next) {

    //localization
    const locale = detectLocale(ctx);
    ctx.cookies.set('locale', locale, { signed: true , httpOnly: false});
    //__________________________________________________________________________

    match({
        routes: routes,
        location: ctx.url
    }, async (error, redirectLocation, renderProps) => {
        try{
            if (redirectLocation) {
                ctx.redirect(
                    redirectLocation.pathname + redirectLocation.search
                );
            } else if (error) {
                ctx.status = 500;
                ctx.body = error.message;
            } else if (!renderProps) {
                ctx.status = 404;
            } else {
                await utils.fetchComponentsData(
                    store.dispatch,
                    renderProps.components,
                    renderProps.params,
                    renderProps.location.query
                );

                const componentHTML = ReactDOM.renderToString(
                    <IntlProvider locale={locale} messages={messages[locale]}>
                        <Provider store={store}>
                            <RouterContext {...renderProps}/>
                        </Provider>
                    </IntlProvider>
                    ),
                    initialState = store.getState();

                const html = await utils.renderFullHTML({
                    componentHTML,
                    initialState,
                    config,
                    title: "CSGOBlaze",
                    csrfToken: ctx.csrf,
                    localeData: localeData[locale]
                });

                ctx.body = html;
            }
        } catch (e){
            console.error(e);
        }
    });
}