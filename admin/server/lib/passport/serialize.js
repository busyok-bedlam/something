import passport from 'koa-passport';
import AdminModel from '../../../../server/models/Admin';


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userID, done) => {
    AdminModel
        .findById(userID)
        .then(
            user => done(null, user),
            error => {
                console.error(error.message);
                done(error)
            }
        );
});
