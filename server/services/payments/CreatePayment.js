import di from '../../di';
// import Payments from '../../lib/Payments';

// const db = di.get('db');
// const PaymentsModel = db.models.payments;
// const UserModel = db.models.users;
// const ItemsModel = db.models.items;
// const {PAYMENT_STATUS, PAYMENT_TYPE, ITEM_STATUS, PAYMENT_METHOD, USER_STATUS} = di.get('config');

export default class CreatePayment {
    async exec({method, amount, userID}) {
        console.log('CreatePayment');
        console.log(method);
        console.log(amount);
        console.log(userID);

        // try {
        //
        //     const paymentOffer = await PaymentsModel.findOneAndUpdate(
        //         {
        //             buyer: userID,
        //             status: PAYMENT_STATUS.CREATED,
        //         },
        //         {status: PAYMENT_STATUS.IN_PROCESS});
        //
        //     if (!paymentOffer) {
        //         throw new Error("Fail. No payment data in system. Contact support");
        //     }
        //
        //     const user = await UserModel.findOneAndUpdate(
        //         {
        //             _id: userID,
        //             status: USER_STATUS.CREATED_OFFER,
        //             paymentType: PAYMENT_TYPE.BUYING,
        //         },
        //         {
        //             status: USER_STATUS.SELECTED_PAYMENT
        //         }
        //     );
        //
        //     if (!user) {
        //         throw new Error('No user ready for payment!');
        //     }
        //
        //     const {paymentID, url} = await Payments.createPayment(method, paymentOffer.amount, paymentOffer._id);
        //
        //     // const payment = await payssion.createPayment(
        //     //     paymentOffer.amount,
        //     //     data.methodID,
        //     //     paymentOffer._id,
        //     // );
        //     // paymentOffer.key = payment.transaction['transaction_id'];
        //     // paymentOffer.redirectURL = payment['redirect_url'];
        //     // paymentOffer.method = PAYMENT_METHOD.PAYSSION.id;
        //     paymentOffer.key = paymentID;
        //     paymentOffer.redirectURL = url;
        //     paymentOffer.method = method;
        //     await paymentOffer.save();
        //
        //     return {status: true, redirectURL: url};
        // } catch (error) {
        //     //TODO remove console.error
        //     console.error(error);
        //
        //     this.__clearUserPaymentData(userID);
        //     throw new Error('Error in creating payment. All data will be cleared')
        //
        // }
    }


    // async __clearUserPaymentData(userID) {
    //     const user = await UserModel.findByIdAndUpdate(
    //         userID,
    //         {
    //             $set: {
    //                 status: USER_STATUS.FREE,
    //                 cart: [],
    //             }
    //         }
    //     );
    //
    //     const itemsIDs = [];
    //     user.cart.forEach(el => {
    //         itemsIDs.push(el.item);
    //     });
    //
    //     await ItemsModel.update(
    //         {_id: {$in: itemsIDs}},
    //         {
    //             $set: {
    //                 enabled: true,
    //                 status: ITEM_STATUS.NEW,
    //             }
    //         },
    //         {"multi": true}
    //     );
    //
    //     await PaymentsModel.findOneAndUpdate(
    //         {buyer: userID},
    //         {
    //             status: PAYMENT_STATUS.CANCELED,
    //             canceledAt: new Date(),
    //         }
    //     );
    // }
}