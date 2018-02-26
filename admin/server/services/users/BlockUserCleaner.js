import di from '../../di';

const db = di.get('db');
const UsersModel = db.models.users;

export default class BlockUserCleaner {
    async exec() {
        setInterval(this.__check, 1000 * 60 * 60);
    }

    async __check() {
        console.log('Cleaner Interval user block');
        const date = new Date();

        await UsersModel.update(
            {
                isBlocked: true,
                blockedTime: {$lte: date},
            },
            {$set: {isBlocked: false, blockedTime: null}},
            {"multi": true}
        );
    }
}