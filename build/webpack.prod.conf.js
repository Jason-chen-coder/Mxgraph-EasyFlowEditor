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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const manifest = path.resolve(config.dll.output, 'manifest.json');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          reduce_vars: true,// 把使用多次的静态值自动定义为变量
          drop_debugger: true,// 删除所有的debugger语句   
          drop_console: true,// 删除所有的console语句    
        },
        parallel: true, // 允许并发
        cache: true, // 开启缓存
        output: {
          beautify: false // 使输出的代码尽可能紧凑
        }
      },
    }),
    new webpack.DllReferencePlugin({
      manifest,
      name: 'libs',
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'public/index.ejs',
      templateParameters: {
        edspDistTime: new Date().getTime()
      },
      inject: true,
      hash: true,
      // favicon: resolve('public/favicon.ico'),
      // title: 'admin-sunline',
      path: config.build.assetsPublicPath + config.build.assetsSubDirectory,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        // removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'none',
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['js/libs.js'],
      append: false,
      hash: true,
    }),
    // copy custom public assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'],
      },
      {
        from: config.dll.output,
        to: path.resolve(config.build.assetsRoot),
      },
    ]),
    new FileManagerPlugin({
      onEnd: [
        {
          move: [
            { source: path.resolve(__dirname, '../deploy', 'font'), destination: path.resolve(__dirname, '../deploy', 'css', 'font') },
          ],
          copy: [
            { source: path.resolve(__dirname, '../deploy', 'img/*.svg'), destination: path.resolve(__dirname, '../deploy', 'css', 'img') },
          ],
        },
      ]
    })
  ],
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin({
        parallel: true,// 多并发执行
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },//移除所有注释
            },
          ],
        },
      }),
    ],
  },
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$',
      ),
      threshold: 10240,//仅处理大于此大小的资产。以字节为单位。
      minRatio: 0.8,
    }),
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
