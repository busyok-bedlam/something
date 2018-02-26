const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('webpack-hot-middleware');

let admin = 0;
let mobile = 0;
let port = 3005;

process.argv.forEach(val => {
    if (val === '--env.admin') {
        admin = 1;
        // port = 3009;
    }
});

module.exports = {
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        host: 'localhost',
        port: port
    },
    entry: [
        'webpack/hot/only-dev-server',
        admin === 1
            ? __dirname + "/admin/shared/app.js"
            : __dirname + "/shared/app.js",

    ],
    output: {
        path: admin === 1
            ? __dirname + "/admin/public/static/build/"
            : __dirname + "/public/static/build/",
        filename: 'main.js',
        publicPath: process.env.NODE_ENV === 'production'
            ? "/static/build/"
            : `http://localhost:${port}/static/build/`,
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.jsx?$/,
        //         loader: 'eslint',
        //         exclude: [/node_modules/, /public/]
        //     }
        // ],
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'autoprefixer-loader']
                })
            }, {

                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'autoprefixer-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                })
            },
            {
                test: /\.(jsx|js)$/,
                loader: process.env.NODE_ENV !== 'production'
                    ? 'react-hot-loader/webpack!babel-loader' :
                    'babel-loader',
                exclude: [/node_modules/, /public/]
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(woff|woff2|ttf|eot)/,
                loader: 'url-loader?limit=1'
            }, {
                test: /\.gif$/,
                loader: 'url-loader?limit=10000&mimetype=image/gif'
            }, {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            }, {
                test: /\.png$/,
                loader: 'url-loader?limit=100000&mimetype=image/png'
            },{
                test: /\.svg/,
                loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify (
                    process.env.NODE_ENV || 'production'
                )
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};
