const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  console.log('env', env);
  console.log('argv', argv);
  return {
    entry: {
      main: './src/index.js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          phaser: {
            test: /[\\/]node_modules[\\/]phaser[\\/]/,
            name: 'phaser',
            chunks: 'all',
          },
        },
      },
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.json/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
      port: 9090,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
      }),
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({ mode: argv.mode }),
      }),
    ],
  };
};
