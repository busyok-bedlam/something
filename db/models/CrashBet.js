import db from "mongoose";
import crashConfig from "../../config/crash";

const betSchema = new db.Schema({
    crashID: {type: String, required: true},
    userID: {type: String, required: true},
    items: {type: Object, required: true},
    amount: {type: Number, required: true},
    autoCash: {type: Number, default: 0, min: 0, required: true},
    cashOut: {type: Number, default: 0, min: 0, required: false},
    status: {type: String, default: crashConfig.STATUS.IN_GAME},
    result: {type: String, required: false},
    createdAt: { type: Date, default: Date.now()},
});

db.model('crash_bets', betSchema);