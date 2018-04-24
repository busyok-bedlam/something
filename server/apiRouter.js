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

router.use(isAuthRoutes.isAuth);
router.post('user/tradeurl', ::routes.user.setupTradeURL);
router.get('user/steam-inventory', ::routes.user.getSteamInventory);
router.get('user/inventory', ::routes.user.getInventory);

router.post('bots/deposit-offer', ::routes.user.createDepositOffer);
router.post('bots/withdraw-offer', ::routes.user.createWithdrawOffer);

router.get('user/get-top-user', ::routes.user.getTopUsers);
router.post('support', ::routes.user.sendSupport);

router.get('user/trade-history', ::routes.user.loadTradeHistory);

router.get('user', ::routes.user.info);
router.post('user/logout', ::routes.user.logout);

export default router;
