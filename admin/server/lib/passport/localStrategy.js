import LocalStrategy from 'passport-local';
import AdminModel from '../../../../server/models/Admin';


export default new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password',
    },
    (userName, password, done) => {
        AdminModel
            .findOne({$or: [{userName}, {email: userName}]})
            .then(user => {
                if (!user) {
                    return done(new Error('userName'));
                } else if (!user.checkPassword(password)) {
                    return done(new Error('password'));
                } else {
                    return done(null, user);
                }
            })
            .catch(err => {
                return done(err);
            });
    }
);
