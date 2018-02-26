import db from "mongoose";

const TradeSchema = new db.Schema({
    user: {type: db.Schema.Types.ObjectId, ref: 'users'},
    receiver: {type: db.Schema.Types.ObjectId, ref: 'users'},
    offerID: String,
    type: String,
    status: String,
});

db.model('trades', TradeSchema);


