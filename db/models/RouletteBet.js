import db from "mongoose";

const RouletteBetSchema = new db.Schema({
    rouletteID: {type: Number, index: true},
    color: {type: String},
    coefficient: {type: Number},
    amount: Number,
    userID: {type: String, required: true, ref: 'users'},
    isWinning: {type: Boolean, default: false}
}, {
    timestamps: true
});

db.model('roulette_bets', RouletteBetSchema);


