'use strict';
process.env.NODE_ENV = 'production';
process.env.OPT_TYPE = 'dll';
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const path = require('path');

const manifest = path.resolve(config.dll.output, 'manifest.json');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new webpack.DllPlugin({
      path: manifest,
      name: '[name]_[hash]',
    }),
  ],
});
