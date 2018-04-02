const isDev = process.env.NODE_ENV === 'development';

export default {
    ROULETTE_MIN_BET: 5,
    ROULETTE_MAX_BET: 300000,
    ROULETTE_BETTING: "ROULETTE_BETTING",
    ROULETTE_IN_GAME: "ROULETTE_IN_GAME",
    ROULETTE_REWARDS: "ROULETTE_REWARDS",
    ROULETTE_INIT: "ROULETTE_INIT",
    BROADCAST_PERIOD: 1000,
    SECRET_KEY: "9Yr{jPT7nhZIcP@",

    ROULETTE_COLOR_PINK: "ROULETTE_COLOR_PINK",
    ROULETTE_COLOR_GREEN: "ROULETTE_COLOR_GREEN",
    ROULETTE_COLOR_GREY: "ROULETTE_COLOR_GREY",

    ROULETTE_TIMER: 20,
    WHEEL_TIME: 7,
    PAUSE_TIME: 5,

    ROULETTE_WHEEL: [
        {"number": 0, "color": "COLOR_GREEN"},
        {"number": 1, "color": "COLOR_PINK"},
        {"number": 8, "color": "COLOR_GREY"},
        {"number": 2, "color": "COLOR_PINK"},
        {"number": 9, "color": "COLOR_GREY"},
        {"number": 3, "color": "COLOR_PINK"},
        {"number": 10, "color": "COLOR_GREY"},
        {"number": 4, "color": "COLOR_PINK"},
        {"number": 11, "color": "COLOR_GREY"},
        {"number": 5, "color": "COLOR_PINK"},
        {"number": 12, "color": "COLOR_GREY"},
        {"number": 6, "color": "COLOR_PINK"},
        {"number": 13, "color": "COLOR_GREY"},
        {"number": 7, "color": "COLOR_PINK"},
        {"number": 14, "color": "COLOR_GREY"}
    ],


}