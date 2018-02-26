import Base from './BaseAPI';

export default class AdminAPI extends Base {

    signIn(data) {
        return this.apiClient.post('admin/signin', data);
    }

    signUp(data) {
        return this.apiClient.post('admin/signup', data);
    }

    info() {
        return this.apiClient.get('admin/info');
    }

    logout() {
        return this.apiClient.post('admin/logout');
    }
}

