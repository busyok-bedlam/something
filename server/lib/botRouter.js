import request from 'request-promise';
import config from '../../config';
const {
    HTTP_PORT_MARKETPLACE,
    MARKETPLACE_HOST,
} = config;

export default class marketplaceRouter {
    constructor() {
        this.path = MARKETPLACE_HOST + ':' + HTTP_PORT_MARKETPLACE + '/api/exec';
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