import db from "mongoose";

db.model('InventoryItem', new db.Schema({
    status: String,
    assetID: String,
    updated: {type: Date, default: new Date()},
    name: String,
    price: Number,
    botID: String,
    data: {type: db.Schema.Types.ObjectId, ref: 'SkinData'},
    tradableFrom: {
        type: Date,
        default: new Date(new Date().setDate(new Date().getDate() + 7))
    }
}));
