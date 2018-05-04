import di from '../../di';

const db = di.get('db');
const UserModel = db.models.users;
const RouletteBetsModel = db.model('roulette_bets');
const RouletteGamesModel = db.model('roulette_games');
const CrashGamesModel = db.model('crash_games');
const CrashBetsModel = db.model('crash_bets');
const TopPlayersModel = db.model('top_players');

export default class TopPlayersUpdate {
    async exec() {
        this.__update();
        setInterval(this.__update, 1000 * 60 * 60);
    }

    async __update() {
        console.log('Update Top Players');
        let periods = [1, 7, 30];
        await TopPlayersModel.find({}).remove();
        periods.forEach(async (period) => {
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
                        "result": 'won',
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
                        "wins": "$user.crashGameProfit.wins"
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
            let res = {
                period,
                uniquePlayers: (uniquePlayers.length) ? uniquePlayers[0].count : 0,
                topPlayers: (topPlayers.length) ? topPlayers[0].count : 0,
                gamesRoulette: (gamesRoulette.length) ? gamesRoulette[0].count : 0,
                gamesCrash,
                topRoulette,
                topCrash
            };
            await new TopPlayersModel(res).save();
        });
    }
}