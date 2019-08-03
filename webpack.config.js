const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.DEV === undefined;

module.exports = {
  mode: 'development',
  target: isProd ? 'node' : 'web',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.node/,
        use: ['node-loader'],
      },
    ],
  },
  devServer: {
    contentBase: __dirname,
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hot: true,
  },
  resolve: {
    extensions: ['*', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: { fs: 'empty' },
  plugins: isProd ? [] : [
    new HtmlWebpackPlugin({
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
