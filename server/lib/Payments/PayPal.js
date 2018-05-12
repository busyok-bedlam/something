import paypal from 'paypal-rest-sdk';
import di from '../../di';

// const paypalConfig = di.get('config').paypal;
const configMain = di.get('config');
const paypalConfig = configMain.paymentConfig.paypal;
const config = {
    "mode": paypalConfig.mode,
    "client_id": paypalConfig.client_id,
    "client_secret": paypalConfig.client_secret,
};
const {PAYMENT_STATUS, PAYMENT_TYPE} = di.get('config').paymentConfig;
const db = di.get('db');
const PaymentsModel = db.models.payments;
paypal.configure(config);

export default class PayPal {
    constructor() {
        this.__payment = {
            "intent": "sale",
            "payer": {},
            "transactions": [],
        };

        const sender_batch_id = Math.random().toString(36).substring(9);

        this.__payout = {
            "sender_batch_header": {
                "sender_batch_id": sender_batch_id,
                "email_subject": "You have a payment"
            },
            "items": [
                {
                    "recipient_type": "EMAIL",
                    "amount": {
                        "value": 0,
                        "currency": "USD"
                    },
                    "receiver": "playersbid-buyer@gmail.com",
                    "note": "PlayersBid Payout",
                    "sender_item_id": "item_3"
                }
            ]
        };
    }


    async createPayment(amount, orderID) {
        const payment = await this.__paypalPayment(amount, orderID);
        let redirectURL = '/';
        for (let i = 0; i < payment.links.length; i++) {
            let link = payment.links[i];
            if (link.method === 'REDIRECT') {
                redirectURL = link.href;
            }
        }
        console.log(redirectURL);
        return {paymentID: payment.id, url: redirectURL};
    }

    __paypalPayment(amount, orderID, customRoutes = false) {
        this.__payment.payer = {
            payment_method: "paypal",
        };

        this.__payment.transactions.push({
            amount: {
                total: amount,
                currency: "USD"
            },
            description: 'Playersbid order. Order# ' + orderID,
        });

        if (!customRoutes) {
            this.__payment.redirect_urls = {
                "return_url": configMain['PAYPAL_URL_RETURN'],
                // "return_url": 'https://google.com',
                "cancel_url": configMain['PAYPAL_URL_CANCEL'],
                // "cancel_url": 'https://google.com',
            };
        } else {
            this.__payment.redirect_urls = {
                "return_url": customRoutes.return,
                "cancel_url": customRoutes.cancel
            };
        }

        return this.__createPayment();
    }

    __cardPayment(data) {
        this.__payment.payer = {
            payment_method: "credit_card",
            funding_instruments: [{
                credit_card: {
                    number: data.cardNumber,
                    type: data.cardType,
                    expire_month: data.cardMonth,
                    expire_year: data.cardYear,
                    cvv2: data.cardCVV.toString(),
                    first_name: data.firstName,
                    last_name: data.lastName,
                }
            }]
        };
        this.__payment.transactions.push({
            amount: {
                total: data.amount,
                currency: "USD"
            },
            description: data.description
        });

        return this.__createPayment();
    }

    __createPayment() {
        return new Promise((resolve, reject) => {
            paypal.payment.create(this.__payment, function (error, payment) {
                if (error) {
                    //TODO remove console.error
                    console.error(error);
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        })
    }

    async executePayPalPayment(paymentID, payerID) {
        return this.__execPayPal(paymentID, {'payer_id': payerID});
    }

    __execPayPal(paymentID, details) {
        return new Promise((resolve, reject) => {
            paypal.payment.execute(paymentID, details, function (error, payment) {
                if (error) {
                    //TODO console.error
                    console.error(error);
                    reject(error);
                } else {
                    resolve(payment)
                }
            });
        })
    }

    async handlePayout(amount, payoutData) {
        this.__payout.items[0].amount.value = amount;
        this.__payout.items[0].receiver = payoutData;

        return await this.__createPayout();
    }

    __createPayout() {
        const sync_mode = 'true';

        return new Promise((resolve, reject) => {
            paypal.payout.create(this.__payout, sync_mode, function (error, payout) {
                if (error) {
                    console.error(error.response);
                    reject(error);
                } else {
                    const status = payout.items[0]['transaction_status'];

                    if (status === 'SUCCESS') {
                        resolve(payout);
                    } else {
                        console.error(payout);
                        reject(new Error('Error in creating payout. Try later or check your "Get Paid" data in profile settings. Status: '+status));
                    }
                }
            });
        });
    }

    async handleReturn(body, method){
        const {PayerID, paymentId} = body;
        await this.executePayPalPayment(paymentId, PayerID);
        return {paymentID: paymentId};
    }

    async handleCancel(body, method) {
        const {userID} = body;
        if (!userID) {
            throw new Error('No userID in paypal cancel');
        }
        const payment = await PaymentsModel.findOne({
            userID: userID,
            status: PAYMENT_STATUS.IN_PROCESS,
            type: PAYMENT_TYPE.BUYING,
        });
        if(!payment){
            throw new Error('Payment not found');
        }

        return {paymentID: payment.paymentID};

    }
}