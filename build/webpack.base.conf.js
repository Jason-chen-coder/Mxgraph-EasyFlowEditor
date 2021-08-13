'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const threadLoaderConfig = require('./thread-loader.conf');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const webpack = require('webpack');

const excludeModuleDependencyWarning = new RegExp('"export .* was not found in \'.*\'');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

let entry = {}, output = {};
if (process.env.OPT_TYPE === 'dll') {
  // dll打包
  entry = {
    libs: config.dll.entry,
  };
  output = {
    path: config.dll.output,
    filename: config.dll.filename,
    publicPath: config.dll.publicPath,
    library: '[name]',
  };
} else {
  // if (process.env.NODE_ENV !== 'production') {
  //   threadLoader.warmup({
  //     // pool options, like passed to loader options
  //     // must match loader options to boot the correct pool
  //     ...threadLoaderConfig,
  //   }, [
  //     // modules to load
  //     // can be any module, i. e.
  //     'babel-loader',
  //     'vue-loader',
  //     'ts-loader',
  //     'svg-sprite-loader',
  //     'url-loader',
  //   ]);
  // }
  entry = {
    app: './src/main.ts',
  };
  output = {
    path: process.env.NODE_ENV === 'production' ? config.build.assetsRoot : config.dev.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  };
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry,
  output,
  resolve: {
    // 绝对路径, 查找module的话从这里开始查找(可选)
    modules: [resolve('src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json', '.less', '.css', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'edsp-vue-ui': resolve('src/packages'),
      'package.json': resolve('package.json'),
    },
  },
  optimization: {
    splitChunks: {
      //缓存组（配置的关键）
      cacheGroups: {
        commons: {
          chunks: 'all',//表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks；
          minChunks: 2,//表示被引用次数，默认为1；
          maxInitialRequests: 5, //最大的初始化加载次数，默认为 3；
          minSize: 0, // 模块的文件体积超过 0 byte就抽取到common中
          name: true,//抽取出来文件的名字，默认为 true，表示自动生成文件名
        },
      },
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      // other modules
      introJs: ['intro.js'],
    }),
    new FilterWarningsPlugin({
      exclude: excludeModuleDependencyWarning,
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
  ],
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(ts|tsx)$/,
      //   exclude: /node_modules|.vue.ts|.vue.tsx/,
      //   use: ['cache-loader', { loader: 'thread-loader', ...threadLoaderConfig }, {
      //     loader: 'tslint-loader',
      //     options: vueLoaderConfig,
      //   }],
      // },
      // {
      //   resourceQuery: /blockType=i18n/,
      //   type: 'javascript/auto',
      //   loader: '@kazupon/vue-i18n-loader',
      // },
      {
        test: /\.vue$/,
        use: ['cache-loader', { loader: 'thread-loader', ...threadLoaderConfig }, {
          loader: 'vue-loader',
          options: vueLoaderConfig,
        }],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          { loader: 'thread-loader', ...threadLoaderConfig },
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/],
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: ['cache-loader', { loader: 'thread-loader', ...threadLoaderConfig }, 'babel-loader'],
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue-echarts'),
        resolve('node_modules/resize-detector')],
      },
      // {
      //   test: /\.html$/,
      //   loader: 'vue-template-loader',
      //   include: [resolve('src', 'views')],
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader', // creates style nodes from JS strings
      //     'css-loader', // translates CSS into CommonJS
      //     'sass-loader', // compiles Sass to CSS, using Node Sass by default
      //   ],
      // },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: '[name]',
        },
        include: [resolve('src/assets/svg')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
        include: [resolve('src/assets/img'), resolve('src/assets/font/iconfont'), resolve('src/packages/styles'), resolve('src/packages/images'), resolve('src/styles'),
        resolve('src/components/topology/assets'), resolve('src/components/trace/trace-chart-table'), resolve('node_modules/jsoneditor/dist/img'), resolve('node_modules/edsp-gls-ui'), resolve('src/views/dynamicFlow/flow/css/font')
          , resolve('node_modules/bpmn-js')],
      },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      //   use: [
      //     'cache-loader', {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10000,
      //         name: utils.assetsPath('media/[name].[hash:7].[ext]'),
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('font/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
