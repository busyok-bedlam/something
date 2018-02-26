import db from "mongoose";

const ItemSchema = new db.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true, default: 0, min: 0},
    enabled: {type: Boolean, default: true},
    status: {type: String, required: true},
    botID: {type: db.Schema.Types.ObjectId, required: true, ref: 'bots'},
    // user: {type: db.Schema.Types.ObjectId, required: true, ref: 'users'},
    user: String,
    itemData: {type: db.Schema.Types.ObjectId, ref: 'items_data'},
    botOwner: {type: Boolean},
    botSteamID: String,
    tags: [{
        "name": String,
        "category": String,
        "category_name": String,
        "internal_name": String,
        "color": String,
        "value": String,
    }],
    assetID: String,
    itemInventoryStatus: String,
});

db.model('items', ItemSchema);


