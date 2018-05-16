import LocalStrategy from 'passport-local';
import AdminModel from '../../../../db/models/Admin';


export default new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password',
    },
    (login, password, done) => {
        AdminModel
            .findOne({$or: [{login}, {email: login}]})
            .then(user => {
                console.log(user);
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
