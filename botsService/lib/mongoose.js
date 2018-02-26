import db from "mongoose";
import config from "../../config/config.json";


db.connect(config['MONGOOSE_URI'], config['MONGOOSE_OPTIONS']);
db.Promise = Promise;

export default db;
