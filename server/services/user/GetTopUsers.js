import di from "../../di";

const db = di.get("db");
const JackpotGameModel = db.model('JackpotGame');

export default class GetTopUsers {

    async exec(params) {

        let lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - params);

        let query = [
            { $match: {"createdAt": {$gte: lastWeek}, "winnerLink": {$exists: true}} },
            { $group: {
                    _id: "$winnerLink",
                    count:  { $sum: 1},
                    profit: { $sum: "$winnerSum"}}},
            { $sort:  {profit: -1}},
            { $limit: 10 }
        ];

        const topsRoulette = await JackpotGameModel.aggregate(query);

        // const topsCoin = await GameModel.aggregate(query);
        // return {topsJackpot, topsCoin};
        return {topsRoulette};
    }
}

