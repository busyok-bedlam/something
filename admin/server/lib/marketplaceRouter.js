import request from 'request-promise';
import {
    MARKETPLACE_HTTP_PORT,
    MARKETPLACE_HTTP_HOST,
} from '../../../config/index';

export default class marketplaceRouter {
    constructor() {
        this.path = MARKETPLACE_HTTP_HOST + ':' + MARKETPLACE_HTTP_PORT + '/api/marketplace/exec';
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

        const result = await request(options);

        if (result && result.error) {
            throw new Error(result.error);
        } else {
            return result;
        }
    }
}