import Koa             from 'koa';
import './dependencies';
import config          from '../config';
import validator       from 'koa-validate';
import apiRouter       from './apiRouter';
import middlewares     from './middlewares';
// import UpdateItemsData from './services/items/UpdateItemsData';
// import UpdatePrices    from './services/items/UpdatePrices';

const app = new Koa();
const PORT = config['BOTS_HTTP_PORT'];

validator(app);

middlewares.forEach(middleware => {
    app.use(middleware);
});

app.use(apiRouter.routes());
app.listen(PORT, () => {
    console.info('Marketplace server listening on port ' + PORT);
    // async function updater () {
    //     const instance = new UpdateItemsData;
    //     // const instance = new UpdatePrices;
    //     await instance.exec();
    // };
    // updater();
    // setInterval(async ()=>{
    //     const instance = new UpdateItemsData;
    //     // const instance = new UpdatePrices;
    //     await instance.exec();
    // }, 1000*60*60*10);
});
