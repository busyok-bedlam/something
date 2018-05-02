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
        const startDate = new Date(2018, 0, 0);
        await UsersModel.update(
            {
                isBlocked: true,
                blockedTime: {$lte: date},
            },
            {$set: {blocked: false, blockedToDate: 0}},
            {"multi": true}
        );
        await UsersModel.update(
            {
                muted: true,
                mutedToDate: {$gt : startDate, $lte: date},
            },
            {$set: {muted: false, mutedToDate: 0}},
            {"multi": true}
        );
    }
}