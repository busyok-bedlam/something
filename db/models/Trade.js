import db from "mongoose";

db.model('trades', db.Schema({
    offerID: String,
    user: String,
    userName: String,
    bot: String,
    items: [String],
    type: String,
    price: Number,
    status: String,
    date: Date,
}));

