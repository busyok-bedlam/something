import ApiClient    from './ApiClient';
import UserAPI      from './UserAPI';
import GamesAPI     from './GamesAPI';
import BotsAPI     from './BotsAPI';
import SupportsAPI  from './SupportsAPI';
import FaqsAPI      from './FaqsAPI';
import AdminAPI     from './AdminAPI';

export const apiClient = new ApiClient();

const combinedAPI = {
    user: new UserAPI(apiClient),
    games: new GamesAPI(apiClient),
    bots: new BotsAPI(apiClient),
    supports: new SupportsAPI(apiClient),
    faqs: new FaqsAPI(apiClient),
    admin: new AdminAPI(apiClient),
};

export default combinedAPI;
