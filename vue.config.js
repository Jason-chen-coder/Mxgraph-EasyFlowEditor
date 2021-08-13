const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'html']
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$',),
        threshold: 10240,//仅处理大于此大小的资产。以字节为单位。
        minRatio: 0.8,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false,
        minSize: 0,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      minimizer: [new UglifyJsPlugin(
        {
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
        }
      ),
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
      })],

    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('')
      .test(/mxClient\.js$/)
      .use('exports-loader')
      .loader('exports-loader?mxClient,mxToolbar,mxConnectionHandler,mxEllipse,mxConnectionConstraint,mxWindow,' +
        'mxObjectCodec,mxGraphModel,mxActor,mxPopupMenu,mxShape,mxEventObject,mxGraph,mxPopupMenuHandler,mxPrintPreview,' +
        'mxEventSource,mxRectangle,mxVertexHandler,mxMouseEvent,mxGraphView,mxCodecRegistry,mxImage,mxGeometry,' +
        'mxRubberband,mxConstraintHandler,mxKeyHandler,mxDragSource,mxGraphModel,mxEvent,mxUtils,mxEvent,mxCodec,mxCell,' +
        'mxConstants,mxPoint,mxGraphHandler,mxCylinder,mxCellRenderer,mxEvent,mxUndoManager')
      .end();
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'));
    // 按这种格式.set('', resolve('')) 自己添加
  },
};

