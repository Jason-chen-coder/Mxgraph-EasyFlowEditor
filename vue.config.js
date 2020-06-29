const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.module
      .rule('')
      .test(/mxClient\.js$/)
      .use('exports-loader')
      .loader('exports-loader?mxClient,mxGraphModel,mxActor,mxShape,mxEventObject,mxGraph,mxPrintPreview,mxEventSource,mxRectangle,mxVertexHandler,mxMouseEvent,mxGraphView,mxImage,mxGeometry,mxRubberband,mxKeyHandler,mxDragSource,mxGraphModel,mxEvent,mxUtils,mxWindow,mxEvent,mxCodec,mxCell,mxConstants,mxPoint,mxGraphHandler,mxCylinder,mxCellRenderer,mxEvent,mxUndoManager')
      .end();
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'));
    // 按这种格式.set('', resolve('')) 自己添加
  }
};

