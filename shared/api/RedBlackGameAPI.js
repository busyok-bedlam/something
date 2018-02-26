import Base from './BaseAPI';

export default class RedBlackGameAPI extends Base {

    getHistory(data) {
        return this.apiClient.get('redblackgame/history', data);
    }
}

