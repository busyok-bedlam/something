import User from './User';
import Support from './Support';
import Faqs from './Faqs';
import Admin from './Admin';
import Bots from './Bots';
// import Item from './Item';
import Marketplace from './Marketplace';

export default {
    user: new User(),
    // games: new Games(),
    bots: new Bots(),
    support: new Support(),
    faqs: new Faqs(),
    // file: new File(),
    admin: new Admin(),
    // item: new Item(),
    marketplace: new Marketplace(),
};
