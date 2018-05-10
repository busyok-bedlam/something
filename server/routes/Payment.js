import Base from './Base';
import di from '../di';

const isDev = process.env.NODE_ENV === 'development';
// const {PAYMENT_METHOD, PAYSSION_PAYMENT_CONFIG} = di.get('config');

export default class Payment extends Base {

    async createPayment(ctx) {
        const {method, amount} = ctx.request.body.data;
        if (!method) {
            throw new Error('No payment method');
        }

        const {user} = ctx.state;
        const {redirectURL} = await this.runService(
            ['payments', 'CreatePayment'],
            {method, amount, userID: user._id}
        );
        console.log('createPayment redirectURL:', redirectURL);
        ctx.body = {redirectURL, method, status: true};
    }

    async coinpaymentsNotify(ctx) {
        try {
            const {body} = ctx.request;
            switch (body.status) {
                case '0': {
                    if(isDev){
                        this.runService(['payments', 'HandlePaymentReturn'], {
                            method: 'COINPAYMENTS',
                            body
                        });

                    }
                    break;
                }
                case '1': {
                    this.runService(['payments', 'HandlePaymentReturn'], {
                        method: 'COINPAYMENTS',
                        body
                    });
                    break;
                }
                case '-1': {
                    this.runService(['payments', 'HandlePaymentCancel'], {
                        method: 'COINPAYMENTS',
                        body
                    });
                    break;
                }
            }

            return ctx.status = 200;

        } catch (error) {
            //TODO remove console.error
            console.error(error);
            ctx.body = {error: error.message};
        }
    }

    async PayPalReturn(ctx) {
        const {
            PayerID,
            paymentId
        } = ctx.query;
        this.runService(['payments', 'HandlePaymentReturn'], {
            method: 'PAYPAL',
            body: {PayerID, paymentId}
        });
        ctx.redirect('/');
    }

    async PayPalCancel(ctx) {
        const {user} = ctx.state;
        this.runService(['payments', 'HandlePaymentCancel'], {
            method: 'PAYPAL',
            body: {userID: user._id},
        });

        ctx.redirect('/');
    }
}