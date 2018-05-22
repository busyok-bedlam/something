import crypto from 'crypto';
import di from '../../di';
// import MarketplaceRouter from '../../lib/marketplaceRouter';
import Payments from '../../lib/Payments';

const db = di.get('db');
const UsersModel = db.models.users;
const PaymentsModel = db.models.payments;
// const MRouter = new MarketplaceRouter();
const {PAYMENT_STATUS, PAYMENT_TYPE} = di.get('config').paymentConfig;
// const {USER_STATUS} = di.get('config').commonConfig;


export default class HandlePaymentReturn {
    async exec({method, body}) {
        try {
            const {paymentID} = await Payments.handlePaymentReturn(method, body);

            const paymentOffer = await PaymentsModel.findOneAndUpdate(
                {
                    paymentID: paymentID,
                    status: PAYMENT_STATUS.IN_PROCESS,
                    type: PAYMENT_TYPE.BUYING,
                },
                {
                    status: PAYMENT_STATUS.COMPLETED,
                    completedAt: new Date(),
                }
            );
            if (paymentOffer) {
                this.userID = paymentOffer.userID;

                await UsersModel.findOneAndUpdate(
                    {
                        _id: this.userID,
                    },
                    {
                        paymentStatus: PAYMENT_STATUS.FREE,
                        paymentURL: '',
                        paymentMethod: '',
                        $inc: { balance: paymentOffer.amount*1000},
                    });

                return {status: true};
            } else {
                return {status: false};
            }

        } catch (error) {
            //TODO remove console.error
            console.error('Error in payssion return');
            console.error(error);
        }
    }

}