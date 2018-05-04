import Koa                    from 'koa';
import path                   from 'path';
import fs                     from 'fs';
import './dependencies';
import React                  from 'react';
import ReactDOM               from 'react-dom/server';
import {Provider}             from 'react-redux';
import {RouterContext, match} from 'react-router';
import configureStore         from '../shared/store/configureStore';
import config                 from '../../config';
import validator              from 'koa-validate';
import {fork}                 from 'child_process';
import * as utils             from '../../server/lib/utils';
import apiRouter              from './apiRouter';
import routes                 from '../shared/routes';
import runService             from './mixins/runService';

const app = new Koa();
const store = configureStore();

app.keys = [config.SECRET_ADMIN];
validator(app);

const middlewares = fs.readdirSync(path.join(__dirname, './middlewares')).sort();
middlewares.forEach(function (middleware) {
    app.use(require('./middlewares/' + middleware).default);
});

app.use(apiRouter.routes());
app.use(async (ctx) => {
    match({
        routes: routes,
        location: ctx.url
    }, async (error, redirectLocation, renderProps) => {
        try {
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
                    <Provider store={store}>
                        <RouterContext {...renderProps}/>
                    </Provider>
                    ),
                    initialState = store.getState();

                const html = await utils.renderFullHTML({
                    componentHTML,
                    initialState,
                    title: "CSGOBlaze",
                    csrfToken: ctx.csrf,
                    isAdmin: true,
                    port: 3009,
                });

                ctx.body = html;
            }
        } catch (error) {
            console.error(error);
            ctx.body = {error: true};
        }

    });
});

const PORT = process.env['PORT_ADMIN'] || config['HTTP_PORT_ADMIN'];
app.listen(PORT, () => {
    console.info('Koa ADMIN server listening on port ' + PORT);
    runService(['users', 'BlockUserCleaner']);
    runService(['users', 'TopPlayersUpdate']);
});
