require('babel-core/register');

['.css', '.less', '.sass', '.scss', '.ttf', '.woff', '.woff2', '.jpg', '.png', '.svg', '.eot', '.otf']
    .forEach((ext) => require.extensions[ext] = () => {
    });

require('babel-polyfill');
require('./app.js');