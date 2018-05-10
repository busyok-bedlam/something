import di from '../../di';
import Payments from '../../lib/Payments';

const db = di.get('db');
const UsersModel = db.models.users;
const PaymentsModel = db.models.payments;
const {PAYMENT_STATUS, PAYMENT_TYPE} = di.get('config').paymentConfig;
// const {USER_STATUS} = di.get('config').commonConfig;


export default class HandlePaymentCancel {
    async exec({method, body}) {
        try {
            const {paymentID} = await Payments.handlePaymentCancel(method, body);
            if(!paymentID){
                console.error(paymentID);
                console.error(body);
                console.error(method);
                throw new Error('Ivalid data in payment cancel handeling');
            }

            const paymentOffer = await PaymentsModel.findOneAndUpdate(
                {
                    paymentID: paymentID,
                    status: PAYMENT_STATUS.IN_PROCESS,
                    type: PAYMENT_TYPE.BUYING,
                },
                {
                    status: PAYMENT_STATUS.CANCELED,
                    completedAt: new Date(),
                }
            );
            if (paymentOffer) {
                this.userID = paymentOffer.userID;

                const user = await UsersModel.findByIdAndUpdate(
                    this.userID,
                    {
                        $set: {
                            paymentStatus: PAYMENT_STATUS.FREE,
                        }
                    });

                if(!user){
                    return;
                }

                return {status: true};
            } else {
                return {status: false};
            }


        } catch (error) {
            //TODO remove console.error
            console.error('Error in handle payment cancel');
            console.error(error);
        }
    }
}