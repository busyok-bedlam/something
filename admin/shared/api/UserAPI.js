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

    updateUser(data) {
        return this.apiClient.post('user/update-user', data);
    }

    findUserByID(data) {
        return this.apiClient.post('user/get-id', data);
    }

    updateUserCredentials(data) {
        return this.apiClient.post('user/update-user-credentials', data);
    }
}

