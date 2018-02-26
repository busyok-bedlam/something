import csrf from 'koa-csrf';

const unTrackedURLs = [
    '/api/paypal/webhook',
    '/api/payment/bitpay/return',
    '/api/payment/payssion',
    '/api/payment/eboost',
    '/api/payment/coinpayments',
];

export default async function (ctx, next) {
    if (unTrackedURLs.indexOf(ctx.path) >= 0) {
        await next();
    } else {
        const middleware = new csrf({
            invalidSessionSecretMessage: 'Invalid session secret',
            invalidSessionSecretStatusCode: 403,
            invalidTokenMessage: 'Invalid CSRF token',
            invalidTokenStatusCode: 403,
            excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
            disableQuery: false
        });

        await middleware(ctx, next);
    }
}

