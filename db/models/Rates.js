import db from "mongoose";


const roomSchema = new db.Schema({
    type: String,
    value: Number
});


export default db.model('rates', roomSchema);
