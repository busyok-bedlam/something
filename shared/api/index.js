import ApiClient    from './ApiClient';
import UserAPI      from './UserAPI';
import FaqAPI       from './FaqAPI';
import RedBlackGameAPI from './RedBlackGameAPI';
import WebSocketAPI from './WebSocketAPI';
import ChatSocketAPI from './ChatSocketAPI';

export const apiClient = new ApiClient();

const combinedAPI = {
    user: new UserAPI(apiClient),
    redBlackGame: new RedBlackGameAPI(apiClient),
    faq: new FaqAPI(apiClient),
    webSocket: new WebSocketAPI(),
    chatSocket: new ChatSocketAPI(),
};

export default combinedAPI;
