import di from '../di';
import Base from './Base';
import BotRouter from '../lib/botRouter';


const BRouter = new BotRouter();
const passport = di.get('passport');
const db = di.get('db');
const UserModel = db.models.users;
const SupportModel = db.models.support;

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

    async createDepositOffer(ctx){
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
            const support = await new SupportModel(body);
            support.save();
            ctx.body = {'success': true};
        } catch (error) {
            ctx.body = {error};
            //TODO remove console.error
            console.error(error);
        }
    }

    async createWithdrawOffer(ctx){
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

    async loadTradeHistory(ctx){
        const {type} = ctx.query;
        const {user} = ctx.state;
        const {trades} = await this.runService(
            ['steam','LoadTradeHistory'],
            {
                type,
                userID: user._id,
            });
        ctx.body = {trades};
    }

}
