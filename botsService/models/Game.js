import db from "mongoose";

const GameSchema = new db.Schema({
    name: String,
    app_id: Number,
    type: String,
    enabled: {type: Boolean, default: false},
    isTop: {type: Boolean, default: false},
    isSteam: {type: Boolean, required: true},
    servers: [String],
    factions: [String],
});

db.model('games', GameSchema);


