/**
 * Created by deema on 19.04.17.
 */
let totp = require('steam-totp');

totp.getTimeOffset((err, offset) => {
    if (err) {
        console.error(err);
    }

    const code = totp.getAuthCode('rxpCm9EHfJhl82wTOj20IJFqano=', offset);

    console.log(code);

});
