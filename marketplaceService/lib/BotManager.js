import BotManager from 'node-steam-bot-manager';
import services from '../services';

const runService = function (actionPath, args) {
    const action = new services[actionPath[0]][actionPath[1]]();
    return action.exec(args);
};
const botManager = new BotManager();

const OFFER_STATUS = {
    "Invalid": 1,
    "Active": 2,            // This trade offer has been sent, neither party has acted on it yet.
    "Accepted": 3,          // The trade offer was accepted by the recipient and items were exchanged.
    "Countered": 4,         // The recipient made a counter offer
    "Expired": 5,           // The trade offer was not accepted before the expiration date
    "Canceled": 6,          // The sender cancelled the offer
    "Declined": 7,          // The recipient declined the offer
    "InvalidItems": 8,      // Some of the items in the offer are no longer available (indicated by the missing flag in the output)
    "CreatedNeedsConfirmation": 9, // The offer hasn't been sent yet and is awaiting further confirmation
    "CanceledBySecondFactor": 10, // Either party canceled the offer via email/mobile confirmation
    "InEscrow": 11,          // The trade has been placed on h
};

const sentOfferChanged = async (bot, offer, oldState) => {
    try {
        switch (offer.state) {
            case OFFER_STATUS.Accepted: {
                if (offer.itemsToGive.length === 0) {
                    await runService(['bot', 'HandleAcceptDepositOffer'], {offer});
                } else if (offer.itemsToReceive.length === 0) {
                    await runService(['bot', 'HandleAcceptWithdrawOffer'], {offer});
                }
                return;
            }
            case OFFER_STATUS.Invalid:
            case OFFER_STATUS.InvalidItems:
            case OFFER_STATUS.Expired:
            case OFFER_STATUS.Declined:
            case OFFER_STATUS.Canceled: {
                if (offer.itemsToGive.length === 0) {
                    await runService(['bot', 'HandleCancelDepositOffer'], {offer});
                } else if (offer.itemsToReceive.length === 0) {
                    await runService(['bot', 'HandleCancelWithdrawOffer'], {offer});
                }
                return;
            }
        }
    } catch (error) {
        console.error(error);
        console.log(bot);
        console.log(offer);
    }
}


// this.botManager.on('newOffer', this.newOffer.bind(this)); //for accepting all offers from users(must be commented or protected from users)
botManager.on('sentOfferChanged', sentOfferChanged);
botManager.on('loggedIn', (bot) => console.log('Bot logged in'));
botManager.infoDebug('Starting Bot Manager');
botManager.on('sessionExpired', (botAccount) => {

    console.log('ON SESSION EXPIRED');
    botAccount.Auth.loginAccount();

});


//for accepting all offers from users(must be commented or protected from users)

// async newOffer(bot, offer){
//   console.log('NEW OFFER');
//   offer.accept((err, status)=>{
//     if(!err){
//       this.__confirmOutstandingTrades(bot);
//     } else {
//       console.error('Error in accepting:');
//       console.error(err);
//     }
//   })
// }
//
// __confirmOutstandingTrades(bot){
//   return new Promise((resolve, reject)=>{
//     bot.Trade.confirmOutstandingTrades((confirmations)=>{
//       resolve(confirmations);
//     });
//   })
// }


export default botManager;