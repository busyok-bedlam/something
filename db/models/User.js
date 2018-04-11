import db           from "mongoose";

const userSchema = new db.Schema({
    _id: {type: String},
    displayName: {type: String},
    avatar: {type: String},
    avatarFull: {type: String},
    profileUrl: {type: String},
    tradeURL: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    isModerator: {
        type: Boolean,
        default: false
    },
    level: {
        type: Number,
        default: 1
    },
    balance: Number,
    rouletteGameProfit: {
        profit: {type: Number, default: 0},
        wins: {type: Number, default: 0},
        losses: {type: Number, default: 0}
    },
    crashGameProfit: {
        profit: {type: Number, default: 0},
        wins: {type: Number, default: 0},
        losses: {type: Number, default: 0}
    },
    xp: Number
});


userSchema.methods.getPublicFields = function () {
    return {
        id: this._id,
        displayName: this.displayName,
        avatar: this.avatar,
        avatarFull: this.avatarFull,
        tradeURL: this.tradeURL,
        balance: this.balance,
        level: this.level,
        xp: this.xp,
        isAdmin: this.isAdmin,
        isModerator: this.isModerator,
        rouletteGameProfit: this.rouletteGameProfit,
        crashGameProfit: this.crashGameProfit
    }
};

export default db.model('users', userSchema);
