const isDev = process.env.NODE_ENV === 'development';
const mongoAuth = {
    user: 'monoguser',
    pass: 'mongopass',
};

export default {
    HTTP_PORT: isDev ? 3000 : 9990,
    HTTP_PORT_WS: isDev ? 3001 : 9991,
    HTTP_PORT_ADMIN: isDev ? 3002 : 9992,
    HTTP_PORT_MARKETPLACE: isDev ? 3008 : 9998,
    BOTS_HTTP_PORT: isDev ? 3003 : 9993,
    MARKETPLACE_HOST: 'http://localhost',
    HTTP_PORT_CHAT: isDev ? 3004 : 9994,
    HTTP_PORT_ROULETTE: isDev ? 3006 : 9996,
    HTTP_PORT_CRASH: isDev ? 3007 : 9997,
    WEBPACK_PORT: 3005,
    WEBPACK_PORT_ADMIN: isDev ? 3005 : 9995,
    SECRET: 'asdlkfjsalkjld4fsd5yg56hregrthfsdfsdflflksytreyrea75832hfh83thf3h',
    SECRET_ADMIN: 'asdlkdfdfdalkjld42425ajy65gtregre7s67u65htyeksreds545gtrf33',
    STATIC_URL: isDev ? "http://localhost:3005" : 'http://li1419-184.members.linode.com:9990',
    ORIGIN: isDev ? 'http://localhost:3000' : 'http://li1419-184.members.linode.com:9990',
    HOST: isDev ? 'localhost' : 'li1419-184.members.linode.com',
    ADMIN_ORIGIN: isDev ? 'http://localhost:3008' : 'https://admin.panos.com',

    "STEAM_AUTH": {
        "returnURL": isDev ? "http://localhost:3000/api/auth/steam/return" : 'http://li1419-184.members.linode.com:9990/api/auth/steam/return',
        "realm": isDev ? "http://localhost:3000": 'http://li1419-184.members.linode.com:9990',
        "profile": true,
        "apiKey": "008A95BC77FF2DD1C648A9BDA7610339"
    },

    MONGOOSE_URI: `mongodb://localhost/blaze`,
    MONGOOSE_OPTIONS: {
        useMongoClient: true,
        keepAlive: 1
    },
    PAYMENTS : {
        MIN: 1,
        MAX: 1000,
        COINS_FOR_$: 1000
    },
    PAYPAL_URL_RETURN: isDev ? "http://localhost:3000/api/payment/paypal/return" : "http://d.playersbid.com/api/payment/paypal/return",
    PAYPAL_URL_CANCEL: isDev ? "http://localhost:3000/api/payment/paypal/cancel" : "http://d.playersbid.com/api/payment/paypal/cancel",

}
