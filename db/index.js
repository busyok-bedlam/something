import db     from "mongoose";
import config from "../config";
import './models';
db.Promise = Promise;
db.connect(config['MONGOOSE_URI'], config['MONGOOSE_OPTIONS'], (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log('MONGO CONNECTED: ' + config['MONGOOSE_URI']);

});
export default db;