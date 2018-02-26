import di from '../../di';

const db = di.get('db');
const GamesModel = db.models.games;
const UserModel = db.models.users;
const {gameConfig} = di.get('config');

export default class JoinGame {
    async exec({userID, gameID, onClear}) {


        const game = await GamesModel.findOneAndUpdate(
            {
                _id: gameID,
                blockedUsers: {$ne: userID},
                status: gameConfig.STATUS.CREATED,
                owner: {$ne: userID}
                // 'owner._id': {$not: userID}
            },
            {
                status: gameConfig.STATUS.JOINED,
                joinedAt: new Date(),
            }
        ).populate('owner', 'displayedUserName');

        if (!game) {
            throw new Error('You cannot join this game');
        }

        const user = await UserModel.findOneAndUpdate(
            {
                _id: userID,
                inGameAsPartner: false,
                balance: {$gte: game.betAmount},
                isBlocked: false,
            },
            {
                inGameAsPartner: true,
                $inc: {balance: -game.betAmount},
            },
            {
                new: true,
            }
        );

        if (!user) {
            game.status = gameConfig.STATUS.CREATED;
            await game.save();
            throw new Error('You cannot join this game. Check balance or finish active games');
        }

        game.partner = user._id;
        game.status = gameConfig.STATUS.JOINED;
        await game.save();
        setTimeout(this.__clear.bind(null, gameID, userID, game.betAmount, onClear), gameConfig.EXPIRE_TIME);

        return {
            user: user.getPublicFields(),
            game: {...game.getNewGameFields(), partner: user.getPublicFields()},
        };
    }

    async __clear(gameID, userID, betAmount, onClear) {
        const game = await GamesModel.findOneAndUpdate(
            {
                _id: gameID,
                status: gameConfig.STATUS.JOINED,
            },
            {
                status: gameConfig.STATUS.CREATED,
                $push: {blockedUsers: userID},
            },
            {
                new: true,
            }
        )
            .populate('owner', 'userName displayedUserName');

        if (!game) {
            return;
        }

        const user = await UserModel.findByIdAndUpdate(
            userID,
            {
                inGameAsPartner: false,
                $inc: {balance: betAmount}
            },
            {
                new: true,
            });

        if (!user) {
            return;
        }
        onClear && onClear(user.getPublicFields(), game.getNewGameFields());
    }
}