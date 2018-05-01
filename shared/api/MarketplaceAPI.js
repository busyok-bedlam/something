import Base from './BaseAPI';

export default class MarketplaceAPI extends Base {
    loadUserInventory(data) {
        return this.apiClient.get('marketplace/user-inventory', data)
    }
    loadMarketplaceInventory(data) {
        return this.apiClient.get('marketplace/marketplace-inventory', data)
    }
    createDepositOffer(data) {
        return this.apiClient.post('marketplace/deposit-offer', data)
    }
    createWithdrawOffer(data) {
        return this.apiClient.post('marketplace/withdraw-offer', data)
    }
}


