import di from '../../di';
import WSServer from '../../lib/WSServer';

const db = di.get('db');
const players = di.get('players');
const currentGame = di.get('currentGame');
const {rouletteConfig} = di.get('config');
const {wsMessageType} = di.get('config');
const redisClient = di.get('redisClient');
const UserModel = db.models.users;
const RouletteBetsModel = db.models.roulette_bets;
const config = di.get('config');

const {
    WS_TOTALS_ROULETTE
} = config.wsMessageType;


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

        // const roulettePromise = new Promise((resolve, reject) => {
        //     redisClient.get('rouletteGameTotal', (err, reply) => {
        //         if (err) {
        //             reject(err);
        //         }
        //         resolve(reply);
        //     });
        // });
        //
        // Promise
        //     .all([roulettePromise])
        //     .then(totals => {
        //         // const data = JSON.stringify({
        //         //     type: WS_TOTALS_ROULETTE,
        //         //     rouletteTotal: totals[0]
        //         // });
        //         // WSServer.sendToAll({
        //         //     type: WS_TOTALS_ROULETTE,
        //         //     payload: {
        //         //         rouletteGameTotal: totals[0]
        //         //     }
        //         // });
        //     });


        return {
            user: user.getPublicFields(),
            data: data
        }

    }

    async __addBet(user, data) {
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
                bet: data.value,
                level: user.level
            });
            await RouletteBetsModel.create({
                rouletteID: currentGame.rouletteID,
                color: data.color,
                amount: data.value,
                userID: user.id,
                coefficient: rouletteConfig[data.color+"_MULTIPLY"]
            });
        } else {
            await RouletteBetsModel.findOneAndUpdate({
                    userID: user.id,
                    color: data.color,
                    rouletteID: currentGame.rouletteID
                },
                {$inc: {amount: data.value}}
            );
        }


        players.total[data.color] += data.value;

        currentGame.rouletteGameTotal = 0;

        for (let color in players.total) {
            currentGame.rouletteGameTotal += (+players.total[color]);
        }

        redisClient.set('RouletteTotal', currentGame.rouletteGameTotal);

        WSServer.send(user.id, {
            type: wsMessageType.WS_NEW_BET,
            payload: {
                userBet: data
            }
        });

        // WSServer.sendToAll({
        //     type: WS_TOTALS_ROULETTE,
        //     payload: {
        //         rouletteGameTotal: currentGame.rouletteGameTotal
        //     }
        // });

        await WSServer.sendToAll({
            type: wsMessageType.WS_ROULETTE_PLAYERS,
            payload: {
                players: players,
                counter: currentGame.counter
            }
        });

    }


}