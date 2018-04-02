import db from "mongoose";

const RouletteGameSchema = new db.Schema({
    _id: Number,
    games: [{
        _id: false,
        rouletteID: Number,
        hashGame: String,
        sector: {
            type: Number,
            max: 15,
            min: 0
        },
        color: String
    }],
    hash: String,
    lastRouletteID: Number
});

db.model('roulette_games', RouletteGameSchema);