import db from "mongoose";

const RouletteBetSchema = new db.Schema({
    rouletteID: {type: Number, index: true},
    color: {type: String},
    amount: Number,
    userID: String,
});

db.model('roulette_bets', RouletteBetSchema);


