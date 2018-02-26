import db from "mongoose";

const botSchema = new db.Schema({
    "shared_secret": String,
    "identity_secret": String,
    "account_name": String,
    "password": String,
    "status": String,
    "enabled": Boolean,
    "tradeURL": String,
    "steamURL": String,
    "steamID": String,
});

db.model('bots', botSchema);


