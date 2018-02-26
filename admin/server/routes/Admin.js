import fs   from 'fs';
import di   from '../di';
import Base from './Base';

const db = di.get('db');
const AdminModel = db.models.admins;
const passport = di.get('passport');

export default class Admin extends Base {

    async info(ctx) {
        if (ctx.isUnauthenticated() || !ctx.state.user) {
            ctx.status = 401;
            return ctx.body = {error: 'Unauthorized'};
        } else {
            ctx.body = {
                dataUser: {
                    login: ctx.state.user.login,
                    _id: ctx.state.user._id,
                }
            };
        }
    }

    async signUp(ctx, next) {
        const reqBody = Object.assign({}, ctx.request.body);
        delete reqBody._csrf;

        const newUser = await new AdminModel(reqBody).save();

        if (newUser) {
            ctx.status = 201;
            ctx.body = {dataUser: newUser};
        } else {
            ctx.status = 500;
        }
    }

    async signIn(ctx, next) {
        await passport.authenticate('local',
            (err, user, info, status) => {
                if (!user) {
                    ctx.status = 401;
                    ctx.body = {error: 'Login or password incorrect.'};
                } else {
                    ctx.login(user);
                    ctx.status = 201;
                    ctx.body = {dataUser: user};
                }
            })(ctx);
    }

    async logoutAdmin(ctx) {
        ctx.logout();
        ctx.session = null;
        ctx.body = {status: 1};
    }

    async getBanners(ctx) {
        const banners = fs.readdirSync(process.cwd() + '/public/static/banners');

        ctx.body = {banners};
    }
}
