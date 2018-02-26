import db from "mongoose";

const botSchema = new db.Schema({
    "steamID": String,
    "shared_secret": String,
    "serial_number": String,
    "revocation_code": String,
    "uri": String,
    "server_time": String,
    "account_name": String,
    "token_gid": String,
    "identity_secret": String,
    "secret_1": String,
    "status": Number,
    "password": String,
    "enabled": Boolean,
    "isRestart": {type: Boolean, default: false},
    "tradeURL": String,
    "tradable": {type: Boolean, default: true},
    "steamURL": String,
    "itemsCount": {type: Number, default: 0, min: 0},
}, {
    timestamps: true
});

db.model('bots', botSchema);


