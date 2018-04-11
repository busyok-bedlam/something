import db from "mongoose";

const SupportSchema = new db.Schema({
    email: {type: String, required: true},
    steamLink: {type: String, required: true},
    text: {type: String, required: true}
});

db.model('support', SupportSchema);
