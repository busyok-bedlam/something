import db from "mongoose";

const SupportSchema = new db.Schema({
    email: {type: String, required: true},
    userID: {type: String, required: true},
    steamLink: {type: String, required: true},
    text: {type: String, required: true},
    status: {type: String, default: "NEW"}
}, {
    timestamps: true
});

db.model('support', SupportSchema);
