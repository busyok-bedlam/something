import passport from 'koa-passport';
import UserModel from '../../../db/models/User';


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userID, done) => {
    UserModel
        .findById(userID)
        .then(
            user => done(null, user),
            error => {
                console.error(error.message);
                done(error)
            }
        );
});
