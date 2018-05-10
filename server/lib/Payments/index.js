import Coinpayments from './Coinpayments';
import PayPal       from './PayPal';

export default class Payments{
    static method = {
        COINPAYMENTS:'COINPAYMENTS',
        PAYPAL: 'PAYPAL',
    };

    static methodReturn = {
        COINPAYMENTS: 'COINPAYMENTS',
        PAYPAL: 'PAYPAL',
    };

    static methodCancel = {
        COINPAYMENTS: 'COINPAYMENTS',
        PAYPAL: 'PAYPAL',
    };

    static methodPayout = {
        COINPAYMENTS: 'COINPAYMENTS',
        PAYPAL: 'PAYPAL',
    };

    static __instances = {
        [Payments.method.COINPAYMENTS]: Coinpayments,
        [Payments.method.PAYPAL]: PayPal,
    };

    static __instancesReturn = {
        [Payments.methodReturn.COINPAYMENTS]: Coinpayments,
        [Payments.methodReturn.PAYPAL]: PayPal,
    };

    static __instancesCancel = {
        [Payments.methodCancel.COINPAYMENTS]: Coinpayments,
        [Payments.methodCancel.PAYPAL]: PayPal,
    };

    static __instancesPayout = {
        [Payments.methodCancel.COINPAYMENTS]: Coinpayments,
        [Payments.methodCancel.PAYPAL]: PayPal,
    };

    static async createPayment(method, amount, id){
        if(!Payments.method[method]){
            throw new Error('Unknown payment method');
        }
        const Client = Payments.__instances[method];
        const client = new Client();
        const {paymentID, url} = await client.createPayment(amount, id, method);
        return {paymentID, url};
    }

    static async handlePaymentReturn(method, body){
        if(!Payments.methodReturn[method]){
            throw new Error('Unknown method');
        }

        const Client = Payments.__instancesReturn[method];
        const client = new Client();
        const {paymentID} = await client.handleReturn(body, method);
        return {paymentID};
    }

    static async handlePaymentCancel(method, body){
        if(!Payments.methodCancel[method]){
            throw new Error('Unknown method');
        }

        const Client = Payments.__instancesCancel[method];
        const client = new Client();
        const {paymentID} = await client.handleCancel(body, method);
        return {paymentID};
    }

    static async createPayout(method, value, payoutData){
        if(!Payments.methodPayout[method]){
            throw new Error('Unknown method');
        } else if(!value || !payoutData){
            throw new Error('No amount or user data');
        }
        console.info('Payout  : ');
        console.info('Amount  : '+value);
        console.info('payoutData: '+payoutData);
        const Client = Payments.__instancesPayout[method];
        const client = new Client();
        const {payoutID} = await client.handlePayout(value, payoutData);
        return {payoutID};
    }

}