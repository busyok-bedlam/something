import di      from '../di';
import runService from '../mixins/runService';
import Clients from './Clients';
import WSServer from "./WSServer";
// import {WSM_CASHOUT} from "../../config/wsGameMessageType";
const config = di.get('config');
const db = di.get('db');
const UsersModel = db.models.users;
const GamesModel = db.models.games;
const ItemsModel = db.models.items;
const BetsModel = db.models.bets;
const gameConfig = config.gameConfig;
const wsGameConfig = config.wsGameMessageType;

export default class GameRouter {
    static autoCashOuts = [];
    static resultHistory = [];
    static playersBet = [];

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

    // static async playersBetCount(game) {
    //     this.playersBet = [];
    //     const bets = await BetsModel.find({gameId: game._id}).sort('-updatedAt');
    //     for (let i = 0; i < bets.length; i++){
    //         const user = await UsersModel.findOne({_id: bets[i].userId});
    //         this.playersBet.push({
    //             userName: user.displayName,
    //             userAvatar: user.avatarFull,
    //             bet: bets[i].amount,
    //             cashOut: bets[i].cashOut,
    //             item: bets[i].winItem,
    //             result: bets[i].result
    //         });
    //     }
    //     const data = {
    //         type: wsGameConfig.WSM_PLAYERS_BET,
    //         payload: this.playersBet,
    //     };
    //     WSServer.sendToAll(data);
    // }

    // static async autoCashRewarding(game) {
    //     if (this.autoCashOuts.length > 0) {
    //         const currentTime = (Date.now() - Date.parse(game.gameStart))/1000;
    //         const currentValue = (1 + 0.02 * currentTime * currentTime / 2).toFixed(2);
    //         if (this.autoCashOuts[0].autoCashOut < currentValue) {
    //             await runService(['bets', 'CashOut'], this.autoCashOuts[0]);
    //             console.log('AUTO REWARDING');
    //             this.autoCashOuts = this.autoCashOuts.shift();
    //             await GameRouter.autoCashRewarding(game);
    //         }
    //     }
    // }

    // static async cashOut(id) {
    //     console.log('CASHOUT');
    //     await runService(['bets', 'CashOut'], {userId: id});
    //     this.autoCashOuts = this.autoCashOuts.filter((bet) => bet.userId !== id);
    // }
    //
    // static async unselectSkin(id) {
    //     console.log('unselectSkin');
    //     let items = await ItemsModel.find({selectedBy: id});
    //     for ( let i = 0; i < items.length; i++) {
    //         items[i].status = gameConfig.STATUS.FREE;
    //         items[i].selectedBy = '';
    //         items[i].save();
    //     }
    // }

    // static async gameStart() {
    //     await GamesModel.remove({status: {'$ne': gameConfig.STATUS.FINISHED}});
    //     setInterval(async() => {
    //         try {
    //             await runService(['game', 'CreateGame']);
    //             await runService(['game', 'CalculatingGame'], this.autoCashCalculating());
    //             await runService(['game', 'RewardsGame']);
    //             this.autoCashOuts = [];
    //         } catch (error ) {
    //             console.error(error.message);
    //         }
    //     }, 5000);
    // }

    static async onClientMessage(id, payload, sendResponse, isAuth = false) {
        console.log('onClientMessage');
        console.log('id', id);
        console.log('payload', payload);
        // let items = await ItemsModel.find({user: id});
        // console.log(items);
        // console.log(id, payload);
        // try {
        //     const {type, data} = payload;
        //
        //     switch (type) {
        //         case wsGameConfig.WSM_ADDED_BET: {
        //             try {
        //                 console.log('WSM_ADDED_BET');
        //                 const game = await GamesModel.findOne({status: gameConfig.STATUS.BETTING});
        //                 const user = await UsersModel.findOne({_id: id});
        //                 if (!isAuth) {
        //                     throw new Error("Not auth user");
        //                 } else if (user.blocked) {
        //                     throw new Error("You are blocked");
        //                 } else if (!game) {
        //                     throw new Error("Game not found");
        //                 }
        //
        //                 const betData = {userId: id, data: data};
        //                 await runService(['bets', 'CreateBet'], betData);
        //                 let items = await ItemsModel.find(
        //                     {
        //                         user: id,
        //                         app_id: user.gameType === 'csgo' ? 730 : 578080,
        //                     }).populate('itemData');
        //                 const itemsData = {
        //                     type: "UPDATE_USER_INVENTORY",
        //                     payload: {items},
        //                 };
        //                 sendResponse( id, itemsData);
        //                 return;
        //             } catch (error) {
        //                 console.error(error);
        //                 return sendResponse(
        //                     id,
        //                     {
        //                         type: config.wsGameMessageType.WSM_ERROR,
        //                         payload: {
        //                             message: `Error in sending: ${error.message || error.toString()}`
        //                         }
        //                     }
        //                 )
        //             }
        //         }
        //
        //         case wsGameConfig.WSM_CASHOUT: {
        //             // await runService(['bets', 'CashOut'], {userId: id});
        //             await GameRouter.cashOut(id);
        //             return;
        //         }
        //
        //         case wsGameConfig.WSM_SELECT_SKIN: {
        //             let item = await ItemsModel.findOne({_id: data._id,});
        //             if (item.status === gameConfig.STATUS.FREE) {
        //                 item.status = gameConfig.STATUS.BETTING;
        //                 item.selectedBy = id;
        //                 item.save();
        //             } else {
        //                 sendResponse(
        //                     id,
        //                     {
        //                         type: wsGameConfig.WSM_ERROR,
        //                         payload: {
        //                             message: `error, item is already chosen`
        //                         }
        //                     }
        //                 )
        //             }
        //             return;
        //         }
        //
        //         case wsGameConfig.WSM_DROP_SKIN: {
        //             await GameRouter.unselectSkin(id);
        //             return;
        //         }
        //
        //         default: {
        //             console.error(`Unknown message type: ${type}`);
        //             return sendResponse(
        //                 id,
        //                 {
        //                     type: wsGameConfig.WS_ERROR,
        //                     payload: {
        //                         message: `Unknown message type: ${type}`
        //                     }
        //                 }
        //             )
        //         }
        //     }
        // } catch (error) {
        //     console.error(error.message);
        //     return sendResponse(
        //         id,
        //         {
        //             type: config.wsGameMessageType.WS_ERROR,
        //             payload: {
        //                 message: `Error: ${error.message}`
        //             }
        //         }
        //     )
        // }
    }

    static async onClientConnection(id, sendResponse, isAuth) {
        console.log('onClientConnection');
        console.log(isAuth);
        // await GameRouter.sendGameHistory(id);
        // await GameRouter.unselectSkin(id);
        // try {
        //     console.log('User connected, isAuth: ' + isAuth);
        //     let game = await GamesModel.findOne({status: {'$ne': gameConfig.STATUS.FINISHED}});
        //     if (game && game.status === gameConfig.STATUS.BETTING) {
        //         game.waitingTime = game.gameStart - Date.now();
        //     }
        //     if (game && game.status === gameConfig.STATUS.IN_GAME) {
        //         game.currentTime = Date.now() - game.gameStart;
        //     }
        //     const data = {
        //         type: wsGameConfig.WSM_CURRENT_GAME,
        //         payload: game,
        //     };
        //     sendResponse( id, data);
        // } catch (error) {
        //     console.error(error);
        //     // sendResponse(
        //     //     id,
        //     //     {
        //     //         type: config.wsMessageType.WS_ERROR,
        //     //         payload: {
        //     //             message: `Error in sending initial data: ${error.message || error.toString()}`
        //     //         }
        //     //     }
        //     // )
        // }
    }

    static onClientClose() {
        console.log('close');
    }

    static async onClientBroadcast(sendResponseToAll) {
        console.log('onClientBroadcast');
        // const game = await GamesModel.findOne({status: {'$ne': gameConfig.STATUS.FINISHED}});
        // if (game) {
        //     await GameRouter.playersBetCount(game);
        //     // sendResponseToAll(
        //     //     {
        //     //         type: wsGameConfig.WSM_CURRENT_GAME,
        //     //         payload: game,
        //     //     }
        //     // )
        // }
        // if (game && game.status !== gameConfig.STATUS.FINISHED) {
        //     try {
        //         await GameRouter.autoCashRewarding(game);
        //     } catch (error) {
        //         console.error(error.message);
        //     }
        // }
    }
}