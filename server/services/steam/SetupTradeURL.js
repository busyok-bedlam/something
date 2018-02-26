import di from '../../di';
const db = di.get('db');
const UserModel = db.models.users;

export default class SetupTradeURL {
    async exec({tradeURL, userID}){
        const user = await UserModel.findByIdAndUpdate(userID, {tradeURL}, {new: true});
        if(user){
            return {
                tradeURL: user.tradeURL,
            };
        } else {
            throw new Error('User not found. Try Sign In again!');
        }
    }
}