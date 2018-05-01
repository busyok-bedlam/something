import db from "mongoose";

db.model('SkinData', db.Schema({
    appid: String,          // '730',
    icon_url: String,       // '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhjxszFcDoV086zkIiEg8j4OrzZgiUGvpUp3eiZptrw0Fft8xU4Ymn0IoPEdlQ7ZwyDq1i6x7y-gMfv7pmd1zI97Us53qRd',
    icon_url_large: String, // '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhjxszFcDoV086zkIiEg8j4OrzZglRd6dd2j6eWo9yt31Xs-EU5azr6LNDBcwY5Z12B_gO7x7q81J-4us-YzCMw6CR2-z-DyH05vt6N',
    name: String,           // 'MAG-7 | Heat',
    market_hash_name: String, //'MAG-7 | Heat (Factory New)',
    market_name: String,    //'MAG-7 | Heat (Factory New)',
    type: String,           //'Restricted Shotgun',
    price: Number,
}));

