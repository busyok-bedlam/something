import Router from 'koa-router';
import routes from "./routes";

const router = new Router({
    prefix: '/api/bots/'
});

router.post('exec', routes.base.handler.bind(routes.base));

export default router;
