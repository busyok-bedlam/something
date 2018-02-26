import services from '../services';


export default class Base {

    runService(actionPath, args) {
        const action = new services[actionPath[0]][actionPath[1]]();

        return action.exec(args);
    }

    renderPromise(ctx, promise) {
        return promise.then(data => {
            return ctx.body = Object.assign({}, data, {status: 1});
        }).catch(error => {
            if (DEBUG_MODE) {
                console.error('REQUEST URL ', ctx.url);
                console.error('REQUEST PARAMS: ', ctx.querystring);
                console.error('REQUEST BODY: ', ctx.request.body);
                console.error('ERROR: ', error.stack);
                console.error('-------------------');
            }

            console.error(error.message);

            ctx.body = {
                status: 0,
                error: {
                    message: error.message
                }
            };
        });
    }

}
