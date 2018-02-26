import {Strategy} from "passport-steam";
import config     from '../../../config';
import UserModel  from '../../../db/models/User';

export default new Strategy(config['STEAM_AUTH'],
    (identifier, profile, done) => {
        process.nextTick(() => {
            UserModel
                .findById(profile.id)
                .then(user => {
                    if (!user) {
                        UserModel.create({
                            _id: profile.id,
                            displayName: profile.displayName,
                            avatar: profile._json.avatar,
                            avatarFull: profile._json.avatarfull,
                            profileUrl: profile._json.profileurl,
                        })
                            .then(savedUser => done(null, savedUser));
                    } else {
                        user.displayName = profile.displayName;
                        user.avatar = profile._json.avatar;
                        user.avatarFull = profile._json.avatarfull;
                        user.profileUrl = profile._json.profileurl;
                        user.save()
                            .then(savedUser => done(null, savedUser));
                    }
                })
                .catch(error => {
                    console.error(error.message);
                    done(error);
                });
        });
    }
);




