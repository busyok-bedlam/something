import db           from "mongoose";

const userSchema = new db.Schema({
    _id: {type: String},
    displayName: {type: String},
    avatar: {type: String},
    avatarFull: {type: String},
    profileUrl: {type: String},
    tradeURL: String,
    crashStatus: {type: String, default: "FREE"},
    paymentType: {type: String},
    paymentURL: {type: String},
    paymentStatus: {type: String, default: "FREE"},
    paymentMethod: {type: String, default: ''},
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
    balance: {type: Number, default: 0, min: 0},
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
    xp: Number,
    blocked: {type: Boolean, default: false},
    blockedToDate: {type: Date, default: 0},
    muted: {type: Boolean, default: false},
    mutedToDate: {type: Date, default: 0},
    needInventoryUpdate: {type: Date, default: new Date()},
    tradeStatus: {type: String, default: 'FREE'},
    withdrawBalance: {type: Number, default: 0},
}, {
    timestamps: true
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
        blocked: this.blocked,
        profileUrl: this.profileUrl,
        rouletteGameProfit: this.rouletteGameProfit,
        crashGameProfit: this.crashGameProfit,
        crashStatus: this.crashStatus,
        paymentURL: this.paymentURL,
        paymentStatus: this.paymentStatus,
        paymentMethod: this.paymentMethod,
    }
};

export default db.model('users', userSchema);
