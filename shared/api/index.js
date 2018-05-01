import ApiClient    from './ApiClient';
import UserAPI      from './UserAPI';
import FaqAPI       from './FaqAPI';
import WebSocketAPI from './WebSocketAPI';
import ChatSocketAPI from './ChatSocketAPI';
import RouletteSocketAPI from './RouletteSocketAPI';
import CrashSocketAPI from './CrashSocketAPI';
import MarketplaceAPI from './MarketplaceAPI';

export const apiClient = new ApiClient();

const combinedAPI = {
    user: new UserAPI(apiClient),
    faq: new FaqAPI(apiClient),
    marketplace: new MarketplaceAPI(apiClient),
    webSocket: new WebSocketAPI(),
    chatSocket: new ChatSocketAPI(),
    rouletteSocket: new RouletteSocketAPI(),
    crashSocket: new CrashSocketAPI()
};

export default combinedAPI;
