import di   from '../di';
import Base from './Base';

const db = di.get('db');
const UserModel = db.models.users;
const config = di.get('config');


export default class User extends Base {

    async countUsers(ctx) {
        const amountUsers = await UserModel.find({}).count();

        ctx.body = {amountUsers};
    }

    async listUsers(ctx) {
        const {page, search, searchField, searchValue, usersSelectType} = ctx.query;
        const options = {};
        if (!page || page < 0) {
            throw new Error('Invalid page number');
        }
        if (search === 'true') {
            options[searchField] = {"$regex": searchValue, "$options": "i"};
        }
        if (usersSelectType && config.adminConfig.USERS_SELECT_TYPES[usersSelectType]) {
            options.createdAt = {$gte: config.adminConfig.GAMES_SELECT_TYPES[usersSelectType].getValue()}
        }

        const users = await UserModel
            .find(options)
            .sort({createdAt: -1})
            .skip((page) * config.adminConfig.USERS_PER_PAGE)
            .limit(config.adminConfig.USERS_PER_PAGE);

        ctx.body = {users};
    }

    async getUsersByID(ctx) {
        //const pattern = new RegExp(ctx.query.id);

        const users = await UserModel
            .find({_id: ctx.query.id});

        ctx.body = {users};
    }

    async getUsersByName(ctx) {
        const pattern = new RegExp(ctx.query.name, 'i');

        const users = await UserModel
            .find({$or: [{firstName: {$regex: pattern}}, {lastName: {$regex: pattern}}]})

        ctx.body = {users};
    }



    async updateBalance(ctx) {
        const {userID, balance} = ctx.request.body;
        const newBalance = parseInt(balance);
        if (newBalance) {
            await UserModel.findByIdAndUpdate(userID, {balance: newBalance});
            ctx.body = {balance: newBalance, userID};
        } else {
            throw new Error('Invalid balance format');
        }
    }

    async blockUser(ctx) {
        const {blockTimeID, userID} = ctx.request.body;
        if(!config.adminConfig.USER_BLOCK_TIME[blockTimeID]){
            throw new Error('Invalid block time id');
        }
        const user = await UserModel.findByIdAndUpdate(
            userID,
            {
                blockedTime: config.adminConfig.USER_BLOCK_TIME[blockTimeID].getValue(),
                isBlocked: true,
            },
            {
                new: true,
            });

        return ctx.body = {
            userID: user._id,
            blockedTime: user.blockedTime,
        };

    }

    async unblockUser(ctx) {
        const {userID} = ctx.request.body;

        const user = await UserModel.findByIdAndUpdate(
            userID,
            {
                blockedTime: null,
                isBlocked: false,
            },
            {
                new: true,
            });

        return ctx.body = {
            userID: user._id,
        };

    }
}
