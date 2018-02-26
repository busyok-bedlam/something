import db from "mongoose";

const TradeSchema = new db.Schema({
    status: String,
    cratedAt: Date,
    updatedAt: Date,
    botID: String,
    userID: String,
    type: String,
    offerID: String,
    items: [{itemID: {type: db.Schema.Types.ObjectId, ref: 'items'}}],
});

db.model('trades', TradeSchema);


