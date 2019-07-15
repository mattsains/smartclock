const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        contentBase: __dirname,
        port: 3000,
        publicPath: "http://localhost:3000/",
        hot: true
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: { fs: 'empty' },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};