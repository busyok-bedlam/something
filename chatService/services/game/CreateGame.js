import di from '../../di';

const db = di.get('db');
const GamesModel = db.models.games;
const UserModel = db.models.users;
const {gameConfig} = di.get('config');

export default class CreateGame {
    async exec({userID, betAmount, color}) {
        if (betAmount < gameConfig.MIN_BET_AMOUNT || betAmount > gameConfig.MAX_BET_AMOUNT) {
            throw new Error(`Bet must be more than ${gameConfig.MIN_BET_AMOUNT} and less than ${gameConfig.MAX_BET_AMOUNT}`);
        } else if (!gameConfig.COLORS[color] && !gameConfig.COLORS.BLACK[color]) {
            throw new Error(`Invalid color id: ${color}`);
        }

        const user = await UserModel.findOneAndUpdate(
            {
                _id: userID,
                inGameAsOwner: false,
                balance: {$gte: betAmount},
                isBlocked: false,
            },
            {
                inGameAsOwner: true,
                $inc: {balance: -betAmount},
            },
            {
                new: true,
            }
        );

        if (!user) {
            throw new Error('You cannot create game. Check balance or finish active games');
        }

        const game = await new GamesModel({
            betAmount,
            ownerColor: color,
            owner: user._id,
            createdAt: new Date(),

        }).save();

        return {
            game: {...game.getNewGameFields(), owner: user.getPublicFields()},
            user: user.getPublicFields(),
        }
    }
}