const isAuth = async function (ctx, next) {
    if (!ctx.state.user) {
        throw {message: 'This action for authorized users only', status: 403};
    } else {
        await next();
    }
};

const isBlocked = async function (ctx, next) {
    if (!ctx.state.user.isBlocked) {
        throw new Error('This action for active users only');
    } else {
        await next();
    }
};

export default {
    isAuth,
    isBlocked,
}