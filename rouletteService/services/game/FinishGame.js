import di from '../../di';
import WSServer from '../../lib/WSServer';
import Clients from '../../lib/Clients';
const config = di.get('config');
const db = di.get('db');
const roulette_games = db.model('roulette_games');
const users = db.model('users');
const RouletteBetsModel = db.model('roulette_bets');
const currentGame = di.get('currentGame');
const players = di.get('players');
const lastGames = di.get('lastGames');
const redisClient = di.get('redisClient');

import wsMessageType from '../../../config/wsMessageType.json';

const {
    ROULETTE_REWARDS,
    PAUSE_TIME,
    ROULETTE_WHEEL,
    ROULETTE_COLOR_PINK,
    ROULETTE_COLOR_GREEN,
    ROULETTE_COLOR_GREY
} = config.rouletteConfig;

export default class FinishGame {
    exec() {
        console.log('FinishGame');

        const {
            number: winSector,
            color: winColor
        } = ROULETTE_WHEEL[currentGame.sector];

        let lossColors = [];

        currentGame.status = ROULETTE_REWARDS;
        currentGame.counter = PAUSE_TIME;


        const winMultiply = config.rouletteConfig[`${winColor}_MULTIPLY`];
        const winningPlayers = {};
        const losingPlayers = {};

        const winColorLength = lastGames.unshift({
            sector: winSector,
            color: winColor.substring(15).toLowerCase()
        });

        players[winColor].forEach(player => {
            // globalProfit -= player.bet * winMultiply;
            console.log(player);
            console.log(player.bet);
            console.log(winMultiply);

            if (!Clients.allClients[player.userID]) {
                console.error("Win Player but not client: ", player.userID);
            }

            winningPlayers[player.userID] = {
                profit: player.bet * winMultiply,
                player: Clients.allClients[player.userID]
                    ? Clients.allClients[player.userID]
                    : null
            };
        });

        switch (winColor) {
            case ROULETTE_COLOR_PINK:
                lossColors[0] = ROULETTE_COLOR_GREEN;
                lossColors[1] = ROULETTE_COLOR_GREY;
                break;

            case ROULETTE_COLOR_GREEN:
                lossColors[0] = ROULETTE_COLOR_PINK;
                lossColors[1] = ROULETTE_COLOR_GREY;
                break;

            case ROULETTE_COLOR_GREY:
                lossColors[0] = ROULETTE_COLOR_PINK;
                lossColors[1] = ROULETTE_COLOR_GREEN;
                break;
        }

        players[lossColors[0]].forEach(player => {

            // if (!allClients[v.userID]) {
            //     console.error("Loss Player but not client: ", v.userID);
            // }

            losingPlayers[player.userID] = {
                profit: player.bet,
                // ws: allClients[v.userID]
                //     ? allClients[v.userID].ws
                //     : null
            };
        });

        players[lossColors[1]].forEach(player => {

            // if (!allClients[v.userID]) {
            //     console.error("Loss Player but not client: ", v.userID);
            // }

            if (losingPlayers[player.userID]) {
                losingPlayers[player.userID].profit += player.bet;
            } else {
                losingPlayers[player.userID] = {
                    profit: player.bet,
                    // ws: allClients[v.userID]
                    //     ? allClients[v.userID].ws
                    //     : null
                };
            }
        });

        const allPlayers = Object.assign({}, winningPlayers, losingPlayers);
        users
            .find({_id: {$in: Object.keys(allPlayers)}})
            .then(result => {
                result.forEach(user => {

                    if (!user.rouletteGameProfit) {
                        user.rouletteProfit = {
                            wins: 0,
                            losses: 0,
                            profit: 0
                        };
                    }

                    if (winningPlayers[user.id]) {
                        const {profit} = winningPlayers[user.id];
                        console.log(profit);
                        console.log(winningPlayers[user.id]);
                        RouletteBetsModel.update({
                            rouletteID: currentGame.rouletteID,
                            userID: user.id,
                            color: winColor
                        }, { isWinning: true }, { multi: true }, () => {});

                        user.balance += profit;
                        user.rouletteGameProfit.wins++;
                        user.rouletteGameProfit.profit += profit;
                        user
                            .save()
                            .then((updatedUser) => {
                                // if (!ws || ws.readyState !== 1) return;
                                WSServer.send(updatedUser._id, {
                                    type: wsMessageType.WS_BALANCE_UPDATE,
                                    payload: {
                                        user: updatedUser
                                    }
                                });
                        });
                    } else if (losingPlayers[user.id]) {
                        user.rouletteGameProfit.losses++;
                        user.rouletteGameProfit.profit -= losingPlayers[user.id].profit;
                        user.save();
                    } else {
                        console.error(new Error('Unknown player.'))
                    }
                });
            });


        roulette_games
            .update({_id: currentGame.day}, {
                $set: {
                    lastRouletteID: currentGame.rouletteID,
                    hash: currentGame.hash
                },
                $push: {
                    games: {
                        $each: [{
                            rouletteID: currentGame.rouletteID,
                            hashGame: currentGame.hashGame,
                            sector: winSector,
                            color: winColor.substring(15).toLowerCase()
                        }],
                        $position: 0
                    },
                }
            }, {upsert: true})
            .catch(err => console.error(err));

        if (winColorLength > 10) {lastGames.pop()}

        redisClient.set('RouletteTotal', 0);

        WSServer.sendToAll({
            type: ROULETTE_REWARDS,
            payload: {
                sector: winSector,
                color: winColor,
                lastGames
            }
            //sector
            //winColor
        });

        return new Promise(resolve => {
            this.timerPause = setInterval(() => {
                if (currentGame.counter > 0) {
                    currentGame.counter--;
                } else {
                    clearInterval(this.timerPause);
                    currentGame.lastRouletteID = currentGame.rouletteID;
                    resolve();
                }
            }, 1000);
        });

    }
}
