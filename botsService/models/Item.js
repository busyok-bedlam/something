import db from "mongoose";

const ItemSchema = new db.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true, default: 0, min: 0},
    enabled: {type: Boolean, default: true},
    status: {type: String, required: true},
    disputedType: String,
    isSteam: {type: Boolean, required: true, default: false},
    gameID: {type: String, required: true},
    user: {type: db.Schema.Types.ObjectId, required: true, ref: 'users'},
    onSaleFrom: {type: Date, required: true, default: new Date},
    buyer: {type: db.Schema.Types.ObjectId, ref: 'users'},
    steamOptions: {
        botID: {type: db.Schema.Types.ObjectId, ref: 'bots'},
        botSteamID: String,
        inspectURL: String,
        itemID: String,
        exterior: String,
        itemData: {type: db.Schema.Types.ObjectId, ref: 'items_data'},
        data: Object
    },
    nonSteamOptions: {
        icon_url: String,
        game: String,
        server: String,
        faction: String,
        quantity: Number,
        min: Number,
        unitPrice: Number,
        title: String,
        deliveryCharacterName: String,
        messageToBuyer: String,
        description: {type: String},
        duration: String,
        deliveryTime: String,
        deliveryTimeValue: Date,
        deliveryMethod: String,
    },
    postSoldData: {
        sellerConfirm: Boolean,
        buyerConfirm: Boolean,
        soldAt: {type: Date},
        isFeedback: Boolean,
        feedback: String,
        rating: Number,
    }
});

db.model('items', ItemSchema);


