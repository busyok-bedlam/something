const isDev = process.env.NODE_ENV === 'development';

export default {
    ROULETTE_MIN_BET: 5,
    ROULETTE_MAX_BET: 300000,
    ROULETTE_BETTING: "ROULETTE_BETTING",
    ROULETTE_IN_GAME: "ROULETTE_IN_GAME",
    ROULETTE_REWARDS: "ROULETTE_REWARDS",
    ROULETTE_PLAYERS: "ROULETTE_PLAYERS",
    ROULETTE_INIT: "ROULETTE_INIT",
    BROADCAST_PERIOD: 1000,
    SECRET_KEY: "9Yr{jPT7nhZIcP@",

    ROULETTE_COLOR_PINK: "ROULETTE_COLOR_PINK",
    ROULETTE_COLOR_GREEN: "ROULETTE_COLOR_GREEN",
    ROULETTE_COLOR_GREY: "ROULETTE_COLOR_GREY",

    ROULETTE_TIMER: 20,
    WHEEL_TIME: 7,
    PAUSE_TIME: 5,

    "ROULETTE_COLOR_PINK_MULTIPLY": 2,
    "ROULETTE_COLOR_GREEN_MULTIPLY": 14,
    "ROULETTE_COLOR_GREY_MULTIPLY": 2,

    ROULETTE_WHEEL: [
        {"number": 0, "color": "ROULETTE_COLOR_GREEN"},
        {"number": 1, "color": "ROULETTE_COLOR_PINK"},
        {"number": 2, "color": "ROULETTE_COLOR_GREY"},
        {"number": 3, "color": "ROULETTE_COLOR_PINK"},
        {"number": 4, "color": "ROULETTE_COLOR_GREY"},
        {"number": 5, "color": "ROULETTE_COLOR_PINK"},
        {"number": 6, "color": "ROULETTE_COLOR_GREY"},
        {"number": 7, "color": "ROULETTE_COLOR_PINK"},
        {"number": 8, "color": "ROULETTE_COLOR_GREY"},
        {"number": 9, "color": "ROULETTE_COLOR_PINK"},
        {"number": 10, "color": "ROULETTE_COLOR_GREY"},
        {"number": 11, "color": "ROULETTE_COLOR_PINK"},
        {"number": 12, "color": "ROULETTE_COLOR_GREY"},
        {"number": 13, "color": "ROULETTE_COLOR_PINK"},
        {"number": 14, "color": "ROULETTE_COLOR_GREY"}
    ],
}