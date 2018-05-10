import Base from './BaseAPI';

export default class UserAPI extends Base {

    info() {
        return this.apiClient.get('user');
    }

    logout() {
        return this.apiClient.post('user/logout');
    }

    setupTradeURL(data){
        return this.apiClient.post('user/tradeurl', data);
    }

    loadSteamInventory(){
        return this.apiClient.get('user/steam-inventory');
    }

    loadInventory(){
        return this.apiClient.get('user/inventory');
    }

    createDepositOffer(data){
        return this.apiClient.post('bots/deposit-offer', data);
    }

    createWithdrawOffer(data){
        return this.apiClient.post('bots/withdraw-offer', data);
    }

    loadTradeHistory(data){
        return this.apiClient.get('user/trade-history', data);
    }

    sendSupport(data) {
        return this.apiClient.post('support', data);
    }

    getTopUser(query) {
        return this.apiClient.get('user/get-top-user', query)
    }

    createPayment(data) {
        return this.apiClient.post('payment/create', data)
    }
}


