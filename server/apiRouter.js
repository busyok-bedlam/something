import Router       from 'koa-router';
import routes       from "./routes";
import isAuthRoutes from './lib/isAuthRouters';
import di           from './di';

const passport = di.get('passport');
const router = new Router({
    prefix: '/api/'
});

//for all users
router.get('auth/steam', ::routes.user.authSteam);
router.get('auth/steam/return', passport.authenticate('steam', {successRedirect: '/', failureRedirect: '/'}));
router.get('marketplace/marketplace-inventory', ::routes.marketplace.loadMarketplaceInventory);

router.use(isAuthRoutes.isAuth);
router.post('user/tradeurl', ::routes.user.setupTradeURL);

router.get('marketplace/user-inventory', ::routes.marketplace.loadUserInventory);
router.post('marketplace/deposit-offer', ::routes.marketplace.createDepositOffer);
router.post('marketplace/withdraw-offer', ::routes.marketplace.createWithdrawOffer);

router.get('user/get-top-user', ::routes.user.getTopUsers);
router.post('support', ::routes.user.sendSupport);

router.get('user/trade-history', ::routes.user.loadTradeHistory);

router.get('user', ::routes.user.info);
router.post('user/logout', ::routes.user.logout);

router.post('payment/create', ::routes.payment.createPayment);

export default router;
