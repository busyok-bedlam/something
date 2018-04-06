import di from '../../di';
import WSServer from '../../lib/WSServer';
import Clients from '../../lib/Clients';
const config = di.get('config');
const db = di.get('db');
const roulette_games = db.model('roulette_games');
const users = db.model('users');
const currentGame = di.get('currentGame');
const players = di.get('players');
const lastGames = di.get('lastGames');

import wsMessageType from '../../../config/wsMessageType.json';

const {
    ROULETTE_REWARDS,
    PAUSE_TIME,
    ROULETTE_WHEEL
} = config.rouletteConfig;

export default class FinishGame {
    exec() {
        console.log('FinishGame');

        const {
            number: winSector,
            color: winColor
        } = ROULETTE_WHEEL[currentGame.sector];

        let globalProfit = 0;

        currentGame.status = ROULETTE_REWARDS;
        currentGame.counter = PAUSE_TIME;


        const winMultiply = config.rouletteConfig[`${winColor}_MULTIPLY`];
        const winningPlayers = {};

        const winColorLength = lastGames.push({
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

        console.log(winningPlayers);

        const allPlayers = Object.assign({}, winningPlayers);

        console.log(allPlayers);

        users
            .find({_id: {$in: Object.keys(allPlayers)}})
            .then(result => {
                result.forEach(user => {

                    // if (!user.rouletteGameProfit) {
                    //     user.rouletteProfit = {
                    //         winnings: 0,
                    //         losses: 0,
                    //         sum: 0
                    //     };
                    // }

                    if (winningPlayers[user.id]) {
                        const {profit} = winningPlayers[user.id];
                        console.log(profit);

                        user.balance += profit;
                        // user.rouletteGameProfit.winnings++;
                        // user.rouletteGameProfit.sum += profit;
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

        if (winColorLength > 6) {lastGames.shift()}


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
