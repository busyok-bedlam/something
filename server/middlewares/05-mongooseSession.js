import session from 'koa-generic-session';
import MongooseStore from 'koa-session-mongoose';

const mongoStore = new MongooseStore();

export {mongoStore};

export default session({
    key: 'sid',
    cookie: {
        httpOnly: true,
        path: '/',
        rewrite: true,
        signed: true,
        maxAge: null
    },

    // touch session.updatedAt in DB & reset cookie on every visit to prolong the session
    // koa-session-mongoose resaves the session as a whole, not just a single field
    rolling: true,
    store: mongoStore
});
