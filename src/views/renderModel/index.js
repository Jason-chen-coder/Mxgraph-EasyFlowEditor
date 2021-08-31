/*
 * @Descripttion: 
 * @version: 
 * @Author: Jason chen
 * @Date: 2021-08-31 11:10:34
 * @LastEditors: Jason chen
 * @LastEditTime: 2021-08-31 11:13:05
 */
const mx = require('mxgraph')

const mxgraph = mx({
  // 核心中所有图像url的Basepath，不带斜杠。在mxClient.imageBasePath中指定路径.
  mxImageBasePath: 'mxgraph/images',
  // 核心中的所有url的Basepath，不带斜杠。在mxClient.basePath中指定路径。
  // 指向的路径一定要是一个可以通过 url 访问的静态资源目录
  mxBasePath: 'mxgraph',
  // 可选的全局配置变量。切换加载mxGraph和mxEditor中的两个资源文件。
  // 默认值是true。在主线程警告上禁用同步XMLHttpRequest
  mxLoadResources: true
  // 指定是否应加载任何样式表。 默认值是true。
  // mxLoadStylesheets: false,
  // 可选的全局配置变量，在开发模式下强制加载JavaScript文件。
  // mxForceIncludes: true,
  // 可选的全局配置变量来指定资源文件的扩展名。
  // mxResourceExtension: '.txt'
})

// Object.keys(mxgraph).forEach((key) => {
//   window[key] = mxgraph[key];
// });

const MxCell = mxgraph.mxCell
const MxConstants = mxgraph.mxConstants
const MxEvent = mxgraph.mxEvent
const MxGraph = mxgraph.mxGraph

const MxRubberBand = mxgraph.mxRubberband

const MxUtils = mxgraph.mxUtils
const MxCodec = mxgraph.mxCodec
const MxGeometry = mxgraph.mxGeometry
const MxEditor = mxgraph.mxEditor
const MxGraphHandler = mxgraph.mxGraphHandler
const MxRectangleShape = mxgraph.mxRectangleShape
const MxCellTracker = mxgraph.mxCellTracker
const MxClient = mxgraph.mxClient
const MxPerimeter = mxgraph.mxPerimeter
const MxEventObject = mxgraph.mxEventObject
const ActiveXObject = mxgraph.activeXObject


MxRubberBand.prototype.defaultOpacity = 30

export {
  MxEvent,
  MxGraph,
  MxEditor,
  MxUtils,
  MxGraphHandler,
  MxConstants,
  MxCodec,
  MxRectangleShape,
  MxCellTracker,
  MxClient,
  MxPerimeter,
  MxEventObject,
  MxGeometry,
  MxCell,
  ActiveXObject
}