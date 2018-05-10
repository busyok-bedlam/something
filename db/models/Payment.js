import db from "mongoose";

const PaymentSchema = new db.Schema({
    userID: {type: String, required: true},
    status: {type: String, required: true},
    amount: {type: Number, min: 0, required: true},
    type: {type: String, required: true},
    paymentID: {type: String, default: ''},

    createdAt: {type: Date, default: new Date},
    canceledAt: {type: Date},
    completedAt: {type: Date},
    additionalInfo: {type: String},
    redirectURL: String,
    method: {type: String},
});

db.model('payments', PaymentSchema);

