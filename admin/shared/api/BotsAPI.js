import Base from './BaseAPI';

export default class BotsAPI extends Base {

    // gamesCount() {
    //     return this.apiClient.get('games/count');
    // }

    botsList(data) {
        return this.apiClient.get('bots/list', data);
    }

    botInGameItems(data) {
        return this.apiClient.get('bots/botInGameItems', data);
    }

    deleteItems(data) {
        return this.apiClient.post('bots/deleteItems', data);
    }

    addItems(data) {
        return this.apiClient.post('bots/addItems', data);
    }

    botItems(data) {
        return this.apiClient.get('bots/botItems', data);
    }
}

