import db from "mongoose";

db.model('UserItemsCache', db.Schema({
    user: String,
    name: String,
    price: Number,
    iconUrl: String,
    assetID: String,
    gameID: Number,
    data: {type: db.Schema.Types.ObjectId, ref: 'SkinData'},
    tradable: {type: Boolean}
}));
