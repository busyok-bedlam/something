import di   from '../di';
import Base from './Base';

const db = di.get('db');
const UsersModel = db.models.users;
const config = di.get('config');
import request from "request-promise";


export default class User extends Base {

    async countUsers(ctx) {
        const amountUsers = await UsersModel.find({}).count();

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

        const users = await UsersModel
            .find(options)
            .sort({createdAt: -1})
            .skip((page) * config.adminConfig.USERS_PER_PAGE)
            .limit(config.adminConfig.USERS_PER_PAGE);

        ctx.body = {users};
    }

    async getUsersByID(ctx) {
        const users = await UsersModel
            .find({_id: ctx.request.body.id}, function (err, results) {
                console.log(results.length)
                if (err || !results.length) {
                    ctx.body = {error: "User not found! Check ID"};
                } else {
                    ctx.body = {users};
                }
            });
    }

    async getUsersByName(ctx) {
        const pattern = new RegExp(ctx.query.name, 'i');

        const users = await UsersModel
            .find({$or: [{firstName: {$regex: pattern}}, {lastName: {$regex: pattern}}]})

        ctx.body = {users};
    }


    async updateBalance(ctx) {
        const {userID, balance} = ctx.request.body;
        const newBalance = parseInt(balance);
        if (newBalance) {
            await UsersModel.findByIdAndUpdate(userID, {balance: newBalance});
            ctx.body = {balance: newBalance, userID};
        } else {
            throw new Error('Invalid balance format');
        }
    }

    async updateUser(ctx) {
        let {id, page, state, period, type} = ctx.request.body;
        let set = {};
        set[type] = state;
        set[type + "ToDate"] = period;
        await UsersModel.findByIdAndUpdate(
            {_id: id},
            {$set: set}
        );
        const users = await UsersModel
            .find()
            .sort({createdAt: -1})
            .skip((page) * config.adminConfig.USERS_PER_PAGE)
            .limit(config.adminConfig.USERS_PER_PAGE);
        const options = {
            method: 'POST',
            uri: 'http://localhost:3004/user-update',
            body: {
                id, state
            },
            json: true
        };
        request(options).then(res => console.log(res)).catch(err => console.error(err))


        ctx.body = {users};
    }


    async updateUserCredentials(ctx) {
        let {id, page, role, state} = ctx.request.body;
        let set = {};
        set[role] = state;
        await UsersModel.findByIdAndUpdate(
            {_id: id},
            {$set: set}
        );
        const users = await UsersModel
            .find()
            .sort({createdAt: -1})
            .skip((page) * config.adminConfig.USERS_PER_PAGE)
            .limit(config.adminConfig.USERS_PER_PAGE);

        ctx.body = {users};
    }
}
