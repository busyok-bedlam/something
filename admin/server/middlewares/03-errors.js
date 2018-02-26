export default async function (ctx, next) {
    try {
        await next();
    } catch (e) {
        console.error(e);
        if (e.status) {
            ctx.status = e.status;
            ctx.body = e.message;
        } else {
            ctx.body = {
                error: true,
                message: e.message || e.toString(),
            }
        }
    }
};
