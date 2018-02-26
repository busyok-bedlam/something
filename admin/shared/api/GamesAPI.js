import Base from './BaseAPI';

export default class UserAPI extends Base {

    gamesCount() {
        return this.apiClient.get('games/count');
    }

    gamesList(data) {
        return this.apiClient.get('games/list', data);
    }
}

