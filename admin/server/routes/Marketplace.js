// import di from '../di';
import Base from './Base';
import marketplaceRouter from '../lib/marketplaceRouter';
const MR = new marketplaceRouter();

export default class Marketplace extends Base {
  // async loadUserInventory(ctx) {
  //   const {user} = ctx.state;
  //   const {inventory, params} = await MR.exec('user/LoadInventory', {userID: user._id, params: ctx.request.query});
  //   ctx.body = {inventory, params};
  // }
  // async loadMarketplaceInventory(ctx) {
  //   const {inventory, params} = await MR.exec('bot/LoadInventory', {params: ctx.request.query});
  //   ctx.body = {inventory, params};
  // }
  // async createDepositOffer(ctx) {
  //   const {ids} = ctx.request.body;
  //   const {user} = ctx.state;
  //   const {redirectUrl} = await MR.exec('bot/CreateDepositOffer', {userID: user._id, ids});
  //   ctx.body = {redirectUrl};
  // }
  // async createWithdrawOffer(ctx) {
  //   const {ids} = ctx.request.body;
  //   const {user} = ctx.state;
  //   const {redirectUrl} = await MR.exec('bot/CreateWithdrawOffer', {userID: user._id, ids});
  //   ctx.body = {redirectUrl};
  // }
  async updateItems(ctx) {
    console.log('updateItems');
    const {user} = ctx.state;
    // const result = await MR.exec('steam/UpdateItems', {userID: user._id});
    await MR.exec('steam/UpdateItems', {userID: user._id});
    ctx.body = {result: true};
  }
  async updateInventory(ctx) {
    console.log('updateInventory', ctx);
    const {user} = ctx.state;
    // const result = await MR.exec('bot/UpdateMarketplaceInventory', {userID: user._id});
    await MR.exec('bot/UpdateMarketplaceInventory', {userID: user._id});
    ctx.body = {result: true};
  }
}
