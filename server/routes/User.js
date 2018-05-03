import di from '../di';
import Base from './Base';
import BotRouter from '../lib/botRouter';

const BRouter = new BotRouter();
const passport = di.get('passport');
const db = di.get('db');
const UserModel = db.models.users;
const SupportModel = db.models.support;
const RouletteBetsModel = db.model('roulette_bets');
const RouletteGamesModel = db.model('roulette_games');
const CrashGamesModel = db.model('crash_games');
const CrashBetsModel = db.model('crash_bets');

export default class User extends Base {

    async info(ctx) {
        if (ctx.isUnauthenticated() || !ctx.state.user) {
            return ctx.status = 401;
        }

        const user = await UserModel.findById(ctx.state.user._id);
        ctx.body = {
            user: user.getPublicFields(),
        };
    }

    async authSteam(ctx) {
        await passport.authenticate('steam')(ctx);
    }


    async logout(ctx) {
        ctx.logout();
        ctx.session = null;
        ctx.body = {status: 1};
    }

    async setupTradeURL(ctx) {
        const {tradeURL} = ctx.request.body;
        const {user} = ctx.state;
        if (!tradeURL) {
            throw new Error('Trade URL is empty!');
        }

        const result = await this.runService(
            ['steam', 'SetupTradeURL'],
            {
                tradeURL,
                userID: user._id,
            }
        );
        ctx.body = {tradeURL: result.tradeURL};
    }

    async getSteamInventory(ctx) {
        const {user} = ctx.state;
        if (!user.tradeURL) {
            throw new Error('Trade URL is not added');
        }

        const {items} = await this.runService(
            ['steam', 'LoadSteamInventory'],
            {userID: user._id},
        );
        ctx.body = {items};
    }

    async getInventory(ctx) {
        const {user} = ctx.state;


        const {items} = await this.runService(
            ['steam', 'LoadInventory'],
            {userID: user._id},
        );
        ctx.body = {items};
    }

    async createDepositOffer(ctx) {
        const {assetIDs} = ctx.request.body;
        const {user} = ctx.state;
        const params = {
            assetIDs,
            userID: user._id,
        };
        const {ids} = await BRouter.exec('user', 'CreateDepositOffer', params);
        ctx.body = {ids};
    }

    async sendSupport(ctx) {
        try {
            const {body} = ctx.request;
            const userID = ctx.state.user._id;
            const support = await new SupportModel({...body, userID: userID});
            support.save();
            ctx.body = {'success': true};
        } catch (error) {
            ctx.body = {error};
            //TODO remove console.error
            console.error(error);
        }
    }

    async createWithdrawOffer(ctx) {
        const {ids} = ctx.request.body;
        const {user} = ctx.state;
        const params = {
            ids,
            userID: user._id,
        };
        console.log(params);
        const response = await BRouter.exec('user', 'CreateWithdrawOffer', params);
        ctx.body = {ids: response.ids};
    }

    async loadTradeHistory(ctx) {
        const {type} = ctx.query;
        const {user} = ctx.state;
        const {trades} = await this.runService(
            ['steam', 'LoadTradeHistory'],
            {
                type,
                userID: user._id,
            });
        ctx.body = {trades};
    }

    async getTopUsers(ctx) {
        const {period} = ctx.query;
        let lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - period);
        // Count games in period
        let queryRouletteGames = [
            {$limit: parseInt(period)},
            {
                $group: {
                    _id: null,
                    count: {$sum: {$size: "$games"}}
                }
            },
            {$project: {_id: 0, count: 1}}
        ];

        // Users with high level >= 99
        let queryHighLevelPlayers = [
            {
                $match: {
                    "level": {$gte: 99}
                }
            },
            {$group: {_id: null, count: {$sum: 1}}},
            {$project: {_id: 0, count: 1}}
        ];

        // New user in this period
        let queryNewPlayers = [
            {
                $match: {
                    "createdAt": {$gte: lastWeek}
                }
            },
            {$group: {_id: null, count: {$sum: 1}}},
            {$project: {_id: 0, count: 1}}
        ];

        // Top players Roulette
        let queryTopPlayers = [
            {$lookup: {from: 'users', localField: 'userID', foreignField: '_id', as: 'user'}},
            {
                $unwind: "$user"
            },
            {
                $match: {
                    "createdAt": {$gte: lastWeek},
                    "isWinning": true,
                    "userID": {$exists: true}
                }
            },
            {
                $group: {
                    _id: "$userID",
                    amount: {$sum: {$multiply: ["$amount", "$coefficient"]}},
                    user: {$first: '$user'}
                }
            },
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    "displayName": "$user.displayName",
                    "level": "$user.level",
                    "avatarFull": "$user.avatarFull",
                    "wins": "$user.rouletteGameProfit.wins"
                }
            },
            {$sort: {amount: -1}},
            {$limit: 10}
        ];

        // Top players Crash
        let queryTopCrash = [
            {$lookup: {from: 'users', localField: 'userID', foreignField: '_id', as: 'user'}},
            {
                $unwind: "$user"
            },
            {
                $match: {
                    "createdAt": {$gte: lastWeek},
                    "isWinning": true,
                    "userID": {$exists: true}
                }
            },
            {
                $group: {
                    _id: "$userID",
                    amount: {$sum: "$profit"},
                    user: {$first: '$user'}
                }
            },
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    "displayName": "$user.displayName",
                    "level": "$user.level",
                    "avatarFull": "$user.avatarFull",
                    "wins": "$user.rouletteGameProfit.wins"
                }
            },
            {$sort: {amount: -1}},
            {$limit: 10}
        ];
        const topRoulette = await RouletteBetsModel.aggregate(queryTopPlayers);
        const gamesRoulette = await RouletteGamesModel.aggregate(queryRouletteGames);
        const uniquePlayers = await UserModel.aggregate(queryNewPlayers);
        const topPlayers = await UserModel.aggregate(queryHighLevelPlayers);
        const topCrash = await CrashBetsModel.aggregate(queryTopCrash);
        const gamesCrash = await CrashGamesModel.find({}).count();
        ctx.body = {
            uniquePlayers: (uniquePlayers.length) ? uniquePlayers[0].count : 0,
            topPlayers: (topPlayers.length) ? topPlayers[0].count : 0,
            gamesRoulette: (gamesRoulette.length) ? gamesRoulette[0].count : 0,
            gamesCrash,
            topRoulette,
            topCrash
        };
    }
}
