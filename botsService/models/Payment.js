import db from "mongoose";

const PaymentSchema = new db.Schema({
    buyer: String,
    sellers: [String],
    status: String,
    amount: {type: Number, min: 0, required: true},
    type: {type: String},
    items: [String],
    key: {type: String, default: ''},
});

db.model('payments', PaymentSchema);

