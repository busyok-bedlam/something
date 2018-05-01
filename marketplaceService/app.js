import Koa                    from 'koa';
import './dependencies';
import config                 from '../config';
import validator              from 'koa-validate';
import apiRouter              from './apiRouter';
import middlewares            from './middlewares';
import botManager             from './lib/BotManager';
const app = new Koa();
botManager.startManager(err => err && botManager.errorDebug('Failed to start Bot Manager'));

app.keys = [config.SECRET];  // needed for cookie-signing
validator(app);

middlewares.initMiddlewares.forEach(midd => {
    app.use(midd);
});
app.use(apiRouter.routes());

const PORT = config['HTTP_PORT_MARKETPLACE'];
app.listen(PORT, () => {
    console.info('Marketplace server listening on port ' + PORT);
});

