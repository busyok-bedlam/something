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
    WS_CHAT_HOST: isDev ? 'ws://localhost:3004' : 'wss://blaze.gg/chatWS',
    WS_ROULETTE_HOST: isDev ? 'ws://localhost:3006' : 'wss://blaze.gg/rouletteWS',
    WS_CRASH_HOST: isDev ? 'ws://localhost:3007' : 'wss://blaze.gg/crashWS',
    WS_COMMON_HOST: isDev ? 'ws://localhost:3001' : 'wss://blaze.gg/commonWS',
    WEBPACK_PORT: 3005,
    WEBPACK_PORT_ADMIN: isDev ? 3005 : 9995,
    SECRET: 'asdlkfjsalkjld4fsd5yg56hregrthfsdfsdflflksytreyrea75832hfh83thf3h',
    SECRET_ADMIN: 'asdlkdfdfdalkjld42425ajy65gtregre7s67u65htyeksreds545gtrf33',
    STATIC_URL: isDev ? "http://localhost:3005" : 'https://blaze.gg',
    ORIGIN: isDev ? 'http://localhost:3000' : 'https://blaze.gg',
    HOST: isDev ? 'localhost' : 'blaze.gg',
    ADMIN_ORIGIN: isDev ? 'http://localhost:3008' : 'https://admin.blaze.gg',

    "STEAM_AUTH": {
        "returnURL": isDev ? "http://localhost:3000/api/auth/steam/return" : 'https://blaze.gg/api/auth/steam/return',
        "realm": isDev ? "http://localhost:3000": 'https://blaze.gg',
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
    PAYPAL_URL_RETURN: isDev ? "http://localhost:3000/api/payment/paypal/return" : "https://blaze.gg/api/payment/paypal/return",
    PAYPAL_URL_CANCEL: isDev ? "http://localhost:3000/api/payment/paypal/cancel" : "https://blaze.gg/api/payment/paypal/cancel",

}
