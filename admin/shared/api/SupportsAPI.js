import Base from './BaseAPI';

export default class SupportsAPI extends Base {

    supportsCount() {
        return this.apiClient.get('supports/count');
    }

    supportsList(data) {
        return this.apiClient.get('supports/list', data);
    }

    updateSupportStatus(data) {
        return this.apiClient.post('supports/update-status', data);
    }
}

