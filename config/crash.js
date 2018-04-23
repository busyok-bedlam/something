const isDev = process.env.NODE_ENV === 'development';

export default {
    BROADCAST_PERIOD: 100000,
    SECRET_KEY: "1Yr{jPT7nhZIcP@",
    STATUS: {
        FREE: "FREE",
        CREATED: "CREATED",
        BETTING: "BETTING",
        CALCULATING: "CALCULATING",
        IN_GAME: "IN_GAME",
        REWARDS: 'REWARDS',
        FINISHED: "FINISHED",
    },

    "CRASH_MIN_BET": 1,
    "CRASH_MAX_BET": 300000,
}