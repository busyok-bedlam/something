import db from "mongoose";

const GameItemSchema = new db.Schema({
    market_hash_name: String,
    market_name: String,
    type: String,
    icon_url: String,
    name_color: String,
    background_color: String,
    app_id: Number,
    price: Number,
});

db.model('game_items', GameItemSchema);


