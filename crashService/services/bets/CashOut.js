import di from '../../di';
import Clients from "../../lib/Clients";
import WSServer from '../../lib/WSServer';

const db = di.get('db');
const GamesModel = db.models.games;
const BetsModel = db.models.bets;
const ItemsModel = db.models.items;
const UsersModel = db.models.users;
const config = di.get('config');
const gameConfig = config.gameConfig;
const wsGameConfig = config.wsGameMessageType;

export default class CashOut {

    async exec(data) {
        const id = data.userId;
        const autoCashOut = data.autoCashOut;
        try {
            await UsersModel.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    status: 'FREE'
                }
            );
            const userData = {
                type: wsGameConfig.UPDATE_USER_STATUS,
                payload: 'FREE',
            };
            WSServer.send(id, userData);
            await this.__SkinRewards(id, autoCashOut);
        } catch (error) {
            console.error(error);
            return WSServer.send(
                id,
                {
                    type: wsGameConfig.WS_ERROR,
                    payload: {
                        message: `Error in sending: ${error.message || error.toString()}`
                    }
                }
            )
        }
    }

    async __SkinRewards (id, autoCashOut) {
        const game = await GamesModel.findOne({status: gameConfig.STATUS.IN_GAME});
        const currentTime = (Date.now() - Date.parse(game.gameStart))/1000;
        const currentValue = (1 + 0.02 * currentTime * currentTime / 2).toFixed(2);
        console.log('currentValue', currentValue);
        const bet = await BetsModel.findOneAndUpdate(
            {
                userId: id,
                status: gameConfig.STATUS.IN_GAME,
                gameId: game._id,
            },
            {
                status: gameConfig.STATUS.FINISHED,
                cashOut: autoCashOut ? autoCashOut : currentValue,
                result: 'won',
            });
        let items = bet.items;
        if (autoCashOut && bet.selectedSkin && autoCashOut >= bet.selectedSkin.price / bet.amount) {
            let item = await ItemsModel.findOneAndUpdate(
                {
                    user: '',
                    name: bet.selectedSkin.name,
                    status: gameConfig.STATUS.FREE,
                    app_id: bet.gameType === 'csgo' ? 730 : 578080,
                },
                {
                    user: id,
                }
            ).populate('itemData');
            if (item) {
                console.log('CASH OUT bet', bet);
                bet.winItem = item.itemData.icon_url;
                bet.save();
            } else {
                WSServer.send(
                    id,
                    {
                        type: wsGameConfig.WS_ERROR,
                        payload: {
                            message: 'This skyn has already been won by another player, you will receive another skyns at the same price.',
                        }
                    }
                );
                let cashOutAmount = autoCashOut ? autoCashOut * bet.amount * 0.98 : currentValue * bet.amount * 0.98;
                await this.__FindReward(id, cashOutAmount.toFixed(2), bet);
            }

            for (let i = 0; i < items.length; i++) {
                await ItemsModel.findOneAndUpdate(
                    {
                        _id: items[i],
                        status: gameConfig.STATUS.IN_GAME
                    },
                    {
                        user: '',
                        status: gameConfig.STATUS.FREE
                    }
                );
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                await ItemsModel.findOneAndUpdate(
                    {
                        _id: items[i],
                        status: gameConfig.STATUS.IN_GAME
                    },
                    {
                        user: '',
                        status: gameConfig.STATUS.FREE
                    }
                );
            }
            let cashOutAmount = autoCashOut ? autoCashOut * bet.amount * 0.98 : currentValue * bet.amount * 0.98;
            await this.__FindReward(id, cashOutAmount.toFixed(2), bet);
        }

        items = await ItemsModel.find({user: id, app_id: bet.gameType === 'csgo' ? 730 : 578080}).populate('itemData');
        const data = {
            type: wsGameConfig.UPDATE_USER_INVENTORY,
            payload: {items},
        };
        WSServer.send(id, data);
        const Betdata = {
            type: wsGameConfig.USER_BET_RESULT,
            payload: 'won',
        };
        WSServer.send(id, Betdata);
    }

    async __FindReward (id, cashOutAmount, bet) {
        console.log('cashOutAmount', cashOutAmount);
        let ernItems = {};
        let ernAmount = 0;
        for (let i = cashOutAmount; i > 0.025;) {
            let item = await ItemsModel.findOneAndUpdate(
                {
                    user: '',
                    status:gameConfig.STATUS.FREE,
                    price: { $gt: i*0.9, $lt: i*1.1 },
                    app_id: bet.gameType === 'csgo' ? 730 : 578080,
                },
                {
                   user: id,
                }
            ).populate('itemData');
            if (item) {
                ernItems[item._id] = item;
                ernAmount += item.price;
                bet.winItem = ernItems[Object.keys(ernItems)[0]].itemData.icon_url;
                bet.save();
                i = (cashOutAmount - ernAmount)*0.819;
            } else i = i*0.819;
            if (Object.keys(ernItems).length >= 2) break;
        }
        const ernItemsData = {
            type: wsGameConfig.UPDATE_USER_SELECTED_ITEMS,
            payload: {ernItems},
        };
        WSServer.send(id, ernItemsData);
    }
}