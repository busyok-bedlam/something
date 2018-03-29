import db           from "mongoose";

const userSchema = new db.Schema({
    _id: {type: String},
    displayName: {type: String},
    avatar: {type: String},
    avatarFull: {type: String},
    profileUrl: {type: String},
    tradeURL: String,
    isAdmin: Boolean,
    balance: Number
});


userSchema.methods.getPublicFields = function () {
    return {
        id: this._id,
        displayName: this.displayName,
        avatar: this.avatar,
        avatarFull: this.avatarFull,
        tradeURL: this.tradeURL,
        balance: this.balance

    }
};

export default db.model('users', userSchema);
