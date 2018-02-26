import di from '../../di';

const db = di.get('db');
const GamesModel = db.models.games;
const UserModel = db.models.users;
const {gameConfig} = di.get('config');

export default class SelectColor {
    async exec({userID, color, gameID, onFinish}) {
        if (!gameConfig.COLORS[color] && !gameConfig.COLORS.BLACK[color]) {
            throw new Error(`Invalid color id: ${color}`);
        }

        const game = await GamesModel.findOneAndUpdate(
            {
                _id: gameID,
                blockedUsers: {$ne: userID},
                status: gameConfig.STATUS.JOINED,
            },
            {
                status: gameConfig.STATUS.SELECTED,
                partnerColor: color,
            },
            {
                new: true,
            }
        ).populate('owner partner', 'displayedUserName');

        if (!game) {
            throw new Error('You cannot join this game');
        }

        let winnerID = 0;
        let winner = '';
        if (color === game.ownerColor) {
            winnerID = game.partner._id;
            winner = 'partner';
        } else {
            winnerID = game.owner._id;
            winner = 'owner';
        }
        await UserModel.findOneAndUpdate(
            {
                _id: winnerID,
            },
            {
                inGame: false,
                $inc: {balance: Math.floor((game.betAmount * 2) * gameConfig.userAmountPart)},
            },
            {
                new: true,
            }
        );

        game.winner = winner;
        await game.save();
        //
        // if(!user){
        //     game.status = gameConfig.STATUS.CREATED;
        //     await game.save();
        //     throw new Error('You cannot join this game');
        // }
        //
        // game.partner = user._id;
        // game.status = gameConfig.STATUS.JOINED;
        // await game.save();
        setTimeout(this.__finish.bind(null, gameID, onFinish), gameConfig.EXPIRE_TIME);

        return {
            game,
        };
    }

    async __finish(gameID, onFinish) {
        const game = await GamesModel.findOneAndUpdate(
            {
                _id: gameID,
                status: gameConfig.STATUS.SELECTED,
            },
            {
                status: gameConfig.STATUS.FINISHED,
            },
            {
                new: true,
            }
        )
            .populate('owner partner', 'displayedUserName balance');

        await UserModel.findByIdAndUpdate(
            game.owner._id,
            {
                inGameAsOwner: false,
            }
        );
        await UserModel.findByIdAndUpdate(
            game.partner._id,
            {
                inGameAsPartner: false,
            }
        );

        onFinish(game);
    }
}