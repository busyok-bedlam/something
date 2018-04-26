import di      from '../di';
import runService from '../mixins/runService';
import WSServer from "./WSServer";
const config = di.get('config');
const db = di.get('db');
const users = db.model('users');
const crash_games = db.model('crash_games');
const crash_bets = db.model('crash_bets');
const crashConfig = config.crashConfig;
const wsMessageType = config.wsMessageType;

export default class GameRouter {
    // static autoCashOuts = [];
    // static resultHistory = [];
    static playersBet = [];
    static roundNumber = 1;

    // static async autoCashCalculating() {
    //     console.log('autoCashCalculating');
    //     const bets = await BetsModel.find({status: gameConfig.STATUS.IN_GAME});
    //     this.autoCashOuts = bets.map((bet) => {return {userId: bet.userId, autoCashOut: bet.autoCash}});
    //     this.autoCashOuts.sort((a, b)=>{return a.autoCashOut - b.autoCashOut});
    // }

    // static async resultGameHistory(value) {
    //     console.log('resultGameHistory');
    //     const result = (Math.floor((value) * 100)/100).toFixed(2);
    //     if (this.resultHistory.length > 11) {
    //         console.log('more then 11 results');
    //         this.resultHistory.unshift(result);
    //         this.resultHistory.pop();
    //     } else {
    //         console.log('resultGameHistory push value');
    //         this.resultHistory.unshift(result);
    //     }
    //     const data = {
    //         type: wsGameConfig.WSM_RESULT_HISTORY,
    //         payload: this.resultHistory,
    //     };
    //     WSServer.sendToAll(data);
    // }
    //
    // static async sendGameHistory(id) {
    //     const data = {
    //         type: wsGameConfig.WSM_RESULT_HISTORY,
    //         payload: this.resultHistory,
    //     };
    //     WSServer.send(id, data);
    // }

    static async playersBetCount(game) {
        this.playersBet = [];
        const bets = await crash_bets.find({gameId: game._id}).sort('-updatedAt');
        for (let i = 0; i < bets.length; i++){
            const user = await users.findOne({_id: bets[i].userId});
            this.playersBet.push({
                userName: user.displayName,
                userAvatar: user.avatarFull,
                bet: bets[i].amount,
                cashOut: bets[i].cashOut,
                result: bets[i].result
            });
        }
        const data = {
            type: wsMessageType.WS_CRASH_BETS,
            payload: this.playersBet,
        };
        WSServer.sendToAll(data);
    }

    static async gameStart() {
        await crash_games.remove({status: {'$ne': crashConfig.STATUS.FINISHED}});
        setInterval(async() => {
            try {
                await runService(['game', 'CreateGame'], this.roundNumber);
                this.roundNumber++;
                // await runService(['game', 'CalculatingGame'], this.autoCashCalculating());
                await runService(['game', 'CalculatingGame']);
                await runService(['game', 'RewardsGame']);
                // this.autoCashOuts = [];
            } catch (error ) {
                console.error(error.message);
            }
        }, 5000);
    }

    static async onClientMessage(id, payload, sendResponse, isAuth = false) {
        console.log('onClientMessage');
        console.log('id', id);
        console.log('payload', payload);
        console.log(id, payload);
        try {
            const {type, data} = payload;

            switch (type) {
                case wsMessageType.WS_CRASH_NEW_BET: {
                    try {
                        console.log('WS_CRASH_NEW_BET');
                        const game = await crash_games.findOne({status: crashConfig.STATUS.IN_GAME});
                        if (!isAuth) {
                            throw new Error("Not auth user");
                        // } else if (user.blocked) {
                        //     throw new Error("You are blocked");
                        } else if (!game) {
                            throw new Error("Game not found");
                        }

                        const betData = {userId: id, data: data};
                        await runService(['bets', 'CreateBet'], betData);
                        return;
                    } catch (error) {
                        console.error(error);
                        return sendResponse(
                            id,
                            {
                                type: wsMessageType.WS_CRASH_ERROR,
                                payload: {
                                    message: `Error in sending: ${error.message || error.toString()}`
                                }
                            }
                        )
                    }
                }

                case wsMessageType.WS_CRASH_CASHOUT: {
                    await runService(['bets', 'CashOut'], {userID: id});
                    return;
                }

                default: {
                    console.error(`Unknown message type: ${type}`);
                    return sendResponse(
                        id,
                        {
                            type: wsMessageType.WS_CRASH_ERROR,
                            payload: {
                                message: `Unknown message type: ${type}`
                            }
                        }
                    )
                }
            }
        } catch (error) {
            console.error(error.message);
            return sendResponse(
                id,
                {
                    type: wsMessageType.WS_CRASH_ERROR,
                    payload: {
                        message: `Error: ${error.message}`
                    }
                }
            )
        }
    }

    static async onClientConnection(id, sendResponse, isAuth) {
        console.log('onClientConnection');
        console.log(isAuth);
        // await GameRouter.sendGameHistory(id);
        // await GameRouter.unselectSkin(id);
        try {
            console.log('User connected, isAuth: ' + isAuth);
            let game = await crash_games.findOne({status: {'$ne': crashConfig.STATUS.FINISHED}});
            if (game && game.status === crashConfig.STATUS.BETTING) {
                game.waitingTime = game.gameStart - Date.now();
            }
            if (game && game.status === crashConfig.STATUS.IN_GAME) {
                game.currentTime = Date.now() - game.gameStart;
            }
            const data = {
                type: wsMessageType.WS_CURRENT_CRASH_GAME,
                payload: game,
            };
            sendResponse( id, data);
        } catch (error) {
            console.error(error);
            sendResponse(
                id,
                {
                    type: config.wsMessageType.WS_CRASH_ERROR,
                    payload: {
                        message: `Error in sending initial data: ${error.message || error.toString()}`
                    }
                }
            )
        }
    }

    static onClientClose() {
        console.log('close');
    }

    static async onClientBroadcast(sendResponseToAll) {
        // console.log('onClientBroadcast');
        const game = await crash_games.findOne({status: {'$ne': crashConfig.STATUS.FINISHED}});
        if (game) {
            await GameRouter.playersBetCount(game);
            sendResponseToAll(
                {
                    type: wsMessageType.WS_CURRENT_CRASH_GAME,
                    payload: game,
                }
            )
        }
    }
}