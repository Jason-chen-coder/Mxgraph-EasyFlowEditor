'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const address = require('address');

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

// const smp = new SpeedMeasurePlugin();

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const manifest = path.resolve(config.dll.output, 'manifest.json');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: config.dev.devtool,
  devtool: 'eval-source-map',

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    inline: config.dev.inline,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest,
      name: 'libs',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.ejs',
      templateParameters: {
        edspDistTime: new Date().getTime()
      },
      inject: true,
      hash: true,
      // favicon: resolve('public/favicon.ico'),
      path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['./js/libs.js'],
      append: false,
      hash: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
      {
        from: config.dll.output,
        to: './',
      },
    ]),
  ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `  App running at:`,
            `  - Local:    http://localhost:${port}`,
            `  - Network:  http://${address.ip()}:${port}`,
          ],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined,
      }));

      resolve(devWebpackConfig);
    }
  });
});
