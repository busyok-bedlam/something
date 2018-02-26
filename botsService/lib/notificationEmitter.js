import request from 'request-promise';
import queryString from 'query-string';
import {
    HTTP_PORT,
} from '../../config';

export default class notificationEmitter {
    constructor(prefix = '') {
        this.prefix = prefix;
    }

    async send(userID, msg = '') {
        try {


            const options = {
                method: 'GET',
                uri: `http://localhost:${HTTP_PORT}/api/marketplace/marketplace-emitter?${queryString.stringify({
                    userID,
                    msg
                })}`,
                json: true,
            };

            return await request(options);

        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }
    }

    async sendEvent(userID, data) {
        try {
            data.userID = userID;
            const options = {
                method: 'GET',
                uri: `http://localhost:${HTTP_PORT}/api/marketplace/marketplace-event?${queryString.stringify(data)}`,
                json: true,
            };

            return await request(options);

        } catch (error) {
            //TODO remove console.error
            console.error(error);
        }
    }
}