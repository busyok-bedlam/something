import di from '../../di';
import Payments from '../../lib/Payments';

const db = di.get('db');
const PaymentsModel = db.models.payments;
const UserModel = db.models.users;
const {PAYMENT_STATUS, PAYMENT_TYPE} = di.get('config').paymentConfig;
const {USER_STATUS} = di.get('config').commonConfig;

export default class CreatePayment {
    async exec({method, amount, userID}) {
        console.log('CreatePayment');

        try {

            let paymentOffer = new PaymentsModel({
                    userID: userID,
                    status: PAYMENT_STATUS.CREATED,
                    amount: amount,
                    method: method,
                    createdAt: new Date,
                    type: PAYMENT_TYPE.BUYING,
                });

            let user = await UserModel.findOneAndUpdate(
                {
                    _id: userID,
                    paymentStatus: PAYMENT_STATUS.FREE,
                },
                {
                    paymentStatus: PAYMENT_STATUS.CREATED,
                    paymentType: PAYMENT_TYPE.BUYING,
                }
            );

            if (!user) {
                throw new Error('No user ready for payment!');
            }

            const {paymentID, url} = await Payments.createPayment(method, paymentOffer.amount, paymentOffer._id);

            if (!paymentID || !url) {
                throw new Error('Error in in payments library!');
            }

            // const payment = await payssion.createPayment(
            //     paymentOffer.amount,
            //     data.methodID,
            //     paymentOffer._id,
            // );
            // paymentOffer.key = payment.transaction['transaction_id'];
            // paymentOffer.redirectURL = payment['redirect_url'];
            // paymentOffer.method = PAYMENT_METHOD.PAYSSION.id;
            paymentOffer.paymentID = paymentID;
            paymentOffer.redirectURL = url;
            paymentOffer.method = method;
            paymentOffer.status = PAYMENT_STATUS.IN_PROCESS;
            await paymentOffer.save();
            user.paymentStatus = PAYMENT_STATUS.IN_PROCESS;
            user.paymentURL = url;
            await user.save();

            return {status: true, redirectURL: url};
        } catch (error) {
            //TODO remove console.error
            console.error(error);

            this.__clearUserPaymentData(userID);
            throw new Error('Error in creating payment. All data will be cleared')

        }
    }

    async __clearUserPaymentData(userID) {
        await UserModel.findByIdAndUpdate(
            userID,
            {
                $set: {
                    paymentStatus: PAYMENT_STATUS.FREE,
                    paymentURL: '',
                }
            }
        );

        await PaymentsModel.findOneAndUpdate(
            {userID: userID},
            {
                status: PAYMENT_STATUS.CANCELED,
                canceledAt: new Date(),
            }
        );
    }
}