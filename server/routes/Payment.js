import Base from './Base';
import di from '../di';

// const isDev = process.env.NODE_ENV === 'development';
// const {PAYMENT_METHOD, PAYSSION_PAYMENT_CONFIG} = di.get('config');

export default class Payment extends Base {

    async createPayment(ctx) {
        const {method, amount} = ctx.request.body.data;
        if (!method) {
            throw new Error('No payment method');
        }

        const {user} = ctx.state;
        // const {redirectURL} = await this.runService(
        //     ['payments', 'CreatePayment'],
        //     {method, amount, userID: user._id}
        // );
        // ctx.body = {redirectURL, method, status: true};
        await this.runService(
            ['payments', 'CreatePayment'],
            {method, amount, userID: user._id}
        );
        // ctx.body = {redirectURL, method, status: true};
    }
}