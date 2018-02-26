export default async function (ctx, next) {
    try {
        await next();
    } catch (e) {
        if (e.status) {
            ctx.status = e.status;
            ctx.body = e.message;
        } else if (e.message === 'No image') {
            ctx.status = 406;
        } else if (e.message === 'File system error') {
            ctx.status = 503;
        } else {
            ctx.body = 'Error 500';
            ctx.status = 500;
            console.error(e.message, e.stack);
        }
    }
};
