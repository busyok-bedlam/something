import db from "mongoose";
import crypto from "crypto";


const userSchema = new db.Schema({
    isAdmin: {type: Boolean, default: false},
    firstName: {
        type: String,
        required: [true, "Name is required."]
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
    },
    role: [{
        type: String,
        in: ['seller', 'buyer']
    }],
    balance: {
        type: Number,
        default: 0,
        min: 0,
    },
    providers: {
        facebookID: {type: String},
        googleID: {type: String},
        twitterID: {type: String},
    },
    notifications: [{
        _id: false,
        text: String,
        isReading: {type: Boolean, default: false}
    }],
    passwordHash: {
        type: String
    },
    salt: {
        type: String
    },
    steamTradeURL: {
        type: String,
    },
    cart: [{item: {type: db.Schema.Types.ObjectId, ref: 'items'}}],
    inDeal: {type: Boolean, default: false},
    feedbackCount: {type: Number, min: 0, default: 0},
    totalSold: {type: Number, min: 0, default: 0},
    weekSold: [{date: Date}],
    rating: {type: Number, min: 0, max: 5, default: 0},
    totalRate: {type: Number, min: 0, default: 0},
}, {
    timestamps: true
});

userSchema.virtual('password')
    .set(function (password) {

        if (password !== undefined) {
            if (password.length < 6) {
                this.invalidate('password', 'Min password length 6.');
            }
        }

        this._plainPassword = password;

        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 128, 'sha1').toString('hex');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function (password) {
    if (!password || !this.passwordHash) {
        return false;
    }

    return crypto.pbkdf2Sync(password, this.salt, 1000, 128, 'sha1').toString('hex') == this.passwordHash;
};

userSchema.methods.getPublicFields = function () {
    return {
        id: this.id,
        displayName: this.firstName + ' ' + this.lastName,
        role: this.role,
        email: this.email,
        balance: this.balance,
        notifications: this.notifications
    }
};

export default db.model('users', userSchema);
