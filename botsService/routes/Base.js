import services from '../services';

export default class Base {

    async runService(actionPath, args) {
        if (!services[actionPath[0]][actionPath[1]]) {
            console.error('NO SERVICE: ' + actionPath[0] + '/' + actionPath[1]);
            throw new Error('NO SERVICE: ' + actionPath[0] + '/' + actionPath[1]);
        }
        const action = new services[actionPath[0]][actionPath[1]]();

        return await action.exec(args);
    }

    async handler(ctx) {
        try {
            const {data} = ctx.request.body;
            // console.dir(data);
            return ctx.body = await  this.runService([data.type, data.service], data.params);

        } catch (error) {
            //TODO remove console.error
            console.error(error);

            return ctx.body = {error: error.message};
        }
    }
}
