import request from 'request-promise';
import config from '../../config';
const {
    BOTS_HTTP_PORT,
    BOTS_HTTP_HOST,
} =config;
console.log(BOTS_HTTP_HOST + ':' + BOTS_HTTP_PORT + '/api/bots/exec');

export default class marketplaceRouter {
    constructor() {
        this.path = BOTS_HTTP_HOST + ':' + BOTS_HTTP_PORT + '/api/bots/exec';
    }

    async exec(type = '', service = '', params = {}) {

        const body = {
            data: {
                type,
                service,
                params
            }
        };

        const options = {
            body,
            method: 'POST',
            uri: this.path,
            json: true,
        };

        console.log(options);

        const result = await request(options);

        if (result && result.error) {
            throw new CustomError(result.error);
        } else {
            return result;
        }
    }
}