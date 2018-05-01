import Router       from 'koa-router';
import services from './services';

const runService = function (actionPath, args) {
  const action = new services[actionPath[0]][actionPath[1]]();
  return action.exec(args);
};

const router = new Router({
  prefix: '/api/'
});

router.post('exec', async (ctx)=>{
  console.log(ctx.request.body)
  const {service, params} = ctx.request.body;
  const result = await runService(service.split('/'), params);
  ctx.body = result;
});


export default router;
