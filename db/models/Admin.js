import db from "mongoose";
import crypto from "crypto";


const adminSchema = new db.Schema({
    login: {
        type: String,
        required: [true, "Name is required."]
    },
    passwordHash: {
        type: String
    },
    salt: {
        type: String
    }
}, {
    timestamps: true
});

adminSchema.virtual('password')
    .set(function(password) {

        if (password !== undefined) {
            if (password.length < 4) {
                this.invalidate('password', 'Min password length 4.');
            }
        }

        this._plainPassword = password;

        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 128, 'sha1').toString('hex');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function() {
        return this._plainPassword;
    });

adminSchema.methods.checkPassword = function(password) {
    if (!password || !this.passwordHash) {
        return false;
    }

    return crypto.pbkdf2Sync(password, this.salt, 1000, 128, 'sha1').toString('hex') == this.passwordHash;
};

export default db.model('admin', adminSchema);
