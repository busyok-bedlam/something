import di from '../di';
import Base from './Base';
import marketplaceRouter from '../lib/botRouter';
const MR = new marketplaceRouter();

export default class Marketplace extends Base {
  async loadUserInventory(ctx) {
    const {page} = ctx.request.body;
    const {user} = ctx.state;
    const {inventory} = await MR.exec('user/LoadInventory', {userID: user._id});
    ctx.body = {inventory};
  }
  async loadMarketplaceInventory(ctx) {
    const {page} = ctx.request.body;
    const {user} = ctx.state;
    const {inventory} = await MR.exec('bot/LoadInventory', {});
    ctx.body = {inventory};
  }
  async createDepositOffer(ctx) {
    const {ids} = ctx.request.body;
    const {user} = ctx.state;
    const {redirectUrl} = await MR.exec('bot/CreateDepositOffer', {userID: user._id, ids});
    ctx.body = {redirectUrl};
  }
  async createWithdrawOffer(ctx) {
    const {ids} = ctx.request.body;
    const {user} = ctx.state;
    const {redirectUrl} = await MR.exec('bot/CreateWithdrawOffer', {userID: user._id, ids});
    ctx.body = {redirectUrl};
  }
}
