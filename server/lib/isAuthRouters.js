const isAuth = async function (ctx, next) {
    if (!ctx.state.user) {
        throw {message: 'This action for authorized users only', status: 403};
    } else {
        await next();
    }
};

const isVerified = async function (ctx, next) {
    if (!ctx.state.user.isVerified) {
        throw new Error('This action for verified users only');
    } else {
        await next();
    }
};

export default {
    isAuth,
    isVerified,
}