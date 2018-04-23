import db from "mongoose";
import crashConfig from '../../config/crash';

const CrashGameSchema = new db.Schema({
    totalAmount: {type: Number, default: 0, min: 0, required: true},
    totalUsers: {type: Number, default: 0, min: 0, required: true},
    value: {type: Number, default: 0, min: 0, required: false},
    waitingTime: {type: Number, default: 9000, required: false},
    currentTime: {type: Number, default: 0, required: false},
    createAt: { type: Date, default: Date.now()},
    gameStart: {type: Date, default: 0},
    gameEnd: {type: Date, default: 0},
    status: {type: String, default: crashConfig.STATUS.BETTING},
    hash: {type: String, required: false},
});

CrashGameSchema.methods.getNewGameFields = function () {
    return {
        _id: this._id,
        status: this.status,
    }
};

db.model('crash_games', CrashGameSchema);
