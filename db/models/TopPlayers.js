import db           from "mongoose";

const topPlayersSchema = new db.Schema({
    period: {type: Number, default: 1},
    uniquePlayers: {type: Number, default: 0},
    topPlayers: {type: Number, default: 0},
    gamesRoulette: {type: Number, default: 0},
    gamesCrash: {type: Number, default: 0},
    topRoulette: [{
        _id: String,
        amount: Number,
        displayName: String,
        level: Number,
        avatarFull: String,
        wins: Number
    }],
    topCrash: [{
        _id: String,
        amount: Number,
        displayName: String,
        level: Number,
        avatarFull: String,
        wins: Number
    }]
}, {
    timestamps: true
});

export default db.model('top_players', topPlayersSchema);
