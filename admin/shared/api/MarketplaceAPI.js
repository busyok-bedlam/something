import Base from './BaseAPI';

export default class MarketplaceAPI extends Base {

    updateItems() {
        return this.apiClient.get('marketplace/updateItems');
    }

    updateInventory() {
        return this.apiClient.get('marketplace/updateInventory');
    }
}

