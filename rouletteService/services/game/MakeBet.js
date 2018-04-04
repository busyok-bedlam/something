import di from '../../di';
import WSServer from '../../lib/WSServer';
const db = di.get('db');
const players = di.get('players');
const {rouletteConfig} = di.get('config');
const {wsMessageType} = di.get('config');
const UserModel = db.models.users;



export default class MakeBet {
    async exec({id, data}) {

        const {color, value} = data;

        if (value < rouletteConfig.ROULETTE_MIN_BET || value > rouletteConfig.ROULETTE_MAX_BET) {
            throw new Error(`Bet must be more than ${rouletteConfig.ROULETTE_MIN_BET} and less than ${rouletteConfig.ROULETTE_MAX_BET}`);
        }
        // else if (!rouletteConfig.COLORS[color] && !rouletteConfig.COLORS.BLACK[color]) {
        //     throw new Error(`Invalid color id: ${color}`);
        // }

        const user = await UserModel.findOneAndUpdate(
            {
                _id: id,
                balance: {$gte: value}
            },
            {
                $inc: {balance: -value},
            },
            {
                new: true,
            }
        );

        if (!user) {
            throw new Error('You cannot create game. Check balance or finish active games');
        }


        // const game = await new GamesModel({
        //     value,
        //     ownerColor: color,
        //     owner: user._id,
        //     createdAt: new Date(),
        //
        // }).save();

        this.__addBet(user, data);

        return {
            user: user.getPublicFields(),
            data: data
        }

    }

    __addBet(user, data) {
        const listPlayers = players[data.color];
        const isExist = listPlayers.some(player => {
            if (player.userID === user.id) {
                player.bet += data.value;
                return true;
            }

            return false;
        });



        if (!isExist) {
            listPlayers.push({
                userID: user.id,
                displayName: user.displayName,
                avatar: user.avatar,
                bet: data.value
            });

        }

        players.total[data.color] += data.value;

        WSServer.sendToAll({
            type: wsMessageType.WS_ROULETTE_PLAYERS,
            payload: {
                players: players
            }
        });

    }


}