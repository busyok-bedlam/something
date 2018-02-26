import Koa                    from 'koa';
import './dependencies';
import config                 from '../config';
import validator              from 'koa-validate';
import apiRouter              from './apiRouter';
import middlewares from './middlewares';
const app = new Koa();

app.keys = [config.SECRET];  // needed for cookie-signing
validator(app);

middlewares.initMiddlewares.forEach(midd=>{
    app.use(midd);
});
app.use(apiRouter.routes());
app.use(middlewares.isomorphicMiddleware);

const PORT = config['HTTP_PORT'];
app.listen(PORT, () => {
    console.info('Koa server listening on port ' + PORT);
});
