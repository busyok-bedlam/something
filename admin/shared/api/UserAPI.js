import Base from './BaseAPI';

export default class UserAPI extends Base {

    userCount() {
        return this.apiClient.get('user/count');
    }

    userList(data) {
        return this.apiClient.get('user/list', data);
    }

    updateUserBalance(data) {
        return this.apiClient.post('user/update_balance', data);
    }

    blockUser(data) {
        return this.apiClient.post('user/block', data);
    }

    unblockUser(data) {
        return this.apiClient.post('user/unblock', data);
    }
}

