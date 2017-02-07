'use strict';

var webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    baseAssetsPath = "assets/",
    ENV = process.env.npm_lifecycle_event,
    ENV_PORT = 3666,
    isBuildEnv = ENV === "build";

module.exports = (function makeWebpackConfig () {
    var jsFileName = isBuildEnv ? baseAssetsPath + 'js/[name].[hash].js' : '[name].bundle.js',
        config = {
            entry : { app: './app/index' },
            cache: false,
            plugins: [
                new HtmlWebpackPlugin({
                    template: './index.html',
                    inject: 'body'
                }),
                new ExtractTextPlugin(baseAssetsPath + 'css/[name].[hash].css')
            ],
            devtool: 'source-map',
            resolve: {
                extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
            },
            output: {
                path:           __dirname + '/dist',
                publicPath:     isBuildEnv ? '/' : 'http://localhost:' + ENV_PORT + '/',
                filename:       jsFileName
            },
            devServer : {
                historyApiFallback: true,
                port: ENV_PORT,
                compress: true,
                contentBase: '/',
                stats: {
                    modules: false,
                    cached: false,
                    colors: true
                }
            },
            module : {
                rules: [{
                    test: /\.ts?$/,
                    loader : 'ts-loader'
                }, {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    loader: 'file-loader',
                    query: {
                        name: baseAssetsPath + "imgs/[hash].[name].[ext]"
                    }
                }, {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: [/node_modules/, /dist/]
                }, {
                    test: /\.(json)/,
                    loader: 'raw-loader',
                    query: { name: baseAssetsPath + "data/[hash].[name].[ext]" }
                }, {
                    test: /\.html$/,
                    loader: 'html-loader'
                }, {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: "style-loader",
                        loader: "css-loader"
                    })
                }]
            }
        };


    if (isBuildEnv) {
        config.devtool = false;
        config.plugins.push(
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        )
    }

    return config;
}());