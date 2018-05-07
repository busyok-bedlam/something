import request from 'request-promise';
// import {
//     HTTP_PORT_MARKETPLACE,
//     MARKETPLACE_HOST,
// } from '../../../config/index';
import config from '../../../config/index';

export default class marketplaceRouter {
    constructor() {
        this.path = config.MARKETPLACE_HOST + ':' + config.HTTP_PORT_MARKETPLACE + '/api/exec';
    }

    async exec(service, params = {}) {

        const body = {
            service,
            params
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
            throw new Error(result.error);
        } else {
            return result;
        }
    }
}