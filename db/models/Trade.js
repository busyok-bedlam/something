import db from "mongoose";

db.model('trades', db.Schema({
    offerID: String,
    user: String,
    userName: String,
    bot: String,
    items: [{assetID: String, gameID: Number}],
    type: String,
    price: Number,
    status: String,
    date: Date,
}));

