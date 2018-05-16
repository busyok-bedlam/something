import Router from 'koa-router';
import routes from "./routes";
import isAuthRoutes from '../../server/lib/isAuthRouters';

const router = new Router({
    prefix: '/api/'
});


router.post('admin/signin', ::routes.admin.signIn);
router.post('admin/signup', ::routes.admin.signUp);


router.use(isAuthRoutes.isAuth);
router.get('admin/info', ::routes.admin.info);
router.post('admin/logout', ::routes.admin.logoutAdmin);

router.get('user/count', ::routes.user.countUsers);
router.get('user/list', ::routes.user.listUsers);
router.post('user/update_balance', ::routes.user.updateBalance);
router.post('user/get-id', ::routes.user.getUsersByID);
router.get('user/get-name', ::routes.user.getUsersByName);
// router.put('user/verify', ::routes.user.verifyUser);
router.post('user/update-user', ::routes.user.updateUser);
router.post('user/update-user-credentials', ::routes.user.updateUserCredentials);

// router.get('games/count', ::routes.games.countGames);
// router.get('games/list', ::routes.games.listGames);

router.get('bots/list', ::routes.bots.listBots);
router.get('bots/botInGameItems', ::routes.bots.botInGameItems);
router.get('bots/botItems', ::routes.bots.botItems);
router.post('bots/deleteItems', ::routes.bots.deleteItems);
router.post('bots/addItems', ::routes.bots.addItems);

router.get('supports/count', ::routes.support.countSupports);
router.get('supports/list', ::routes.support.listSupports);
router.post('supports/update-status', ::routes.support.updateSupportStatus);

router.get('faqs/list', ::routes.faqs.listFaqs);
router.post('faqs/create', ::routes.faqs.createFaq);
router.post('faqs/update', ::routes.faqs.updateFaq);
router.post('faqs/delete', ::routes.faqs.deleteFaq);
// router.get('admin/get-banners', routes.admin.getBanners.bind(routes.admin));
// router.post('marketplace/update-all-games-data', routes.marketplace.updateAllGamesData.bind(routes.marketplace));
// router.post('marketplace/switch-game', routes.marketplace.switchGame.bind(routes.marketplace));
// router.post('marketplace/switch-top-game', routes.marketplace.switchTopGame.bind(routes.marketplace));
// router.post('marketplace/new-game', routes.marketplace.addNewGame.bind(routes.marketplace));
// router.post('marketplace/edit-game', routes.marketplace.editGame.bind(routes.marketplace));
// router.post('marketplace/delete-game', routes.marketplace.deleteGame.bind(routes.marketplace));
// router.get('marketplace/games', routes.marketplace.getGames.bind(routes.marketplace));
// router.get('marketplace/orders/disputed', routes.marketplace.getDisputedOrders.bind(routes.marketplace));
// router.get('marketplace/orders/free', routes.marketplace.getFreeOrders.bind(routes.marketplace));
// router.get('marketplace/orders/unchecked', routes.marketplace.getUncheckedOrders.bind(routes.marketplace));
// router.post('marketplace/orders/unchecked/moderate', routes.marketplace.moderateUncheckedOrder.bind(routes.marketplace));
// router.post('marketplace/orders/unchecked/admin-select', routes.marketplace.addToAdminModerationOrders.bind(routes.marketplace));
// router.get('marketplace/orders/admin', routes.marketplace.getAdminOrders.bind(routes.marketplace));
// router.post('marketplace/orders/admin/update', routes.marketplace.updateAdminOrder.bind(routes.marketplace));
// router.post('marketplace/orders/disputed/move-to-completed', routes.marketplace.moveToCompleted.bind(routes.marketplace));
// router.post('marketplace/orders/disputed/move-to-failed', routes.marketplace.moveToFailed.bind(routes.marketplace));
// router.post('marketplace/orders/admin-select', routes.marketplace.addToAdminOrders.bind(routes.marketplace));
router.get('marketplace/updateItems', ::routes.marketplace.updateItems);
router.get('marketplace/updateInventory', ::routes.marketplace.updateInventory);

// router.get('user/view-image', routes.file.handleImages.bind(routes.file));
// router.delete('user/delete-image', routes.file.deleteImage.bind(routes.file));

// router.get('item/list', routes.item.listItems.bind(routes.item));
// router.get('item/count', routes.item.countItems.bind(routes.item));


// router.post('file/upload-banner', routes.file.uploadBanner.bind(routes.file));
// router.delete('file/delete-banner', routes.file.deleteBanner.bind(routes.file));
//
// router.post('file/upload-image', routes.file.uploadGameImage.bind(routes.file));
//
// router.get('marketplace/chat', routes.marketplace.getChatMessages.bind(routes.marketplace));
// router.post('marketplace/chat', routes.marketplace.createChatMessage.bind(routes.marketplace));

export default router;
