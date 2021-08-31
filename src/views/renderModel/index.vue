<template>
  <div class="customToolbarContainer">
    <!-- 画布中的顶部工具栏 -->
    <div class="top-tools">
      <el-col :span="4">
        <div
          class="grid-content bg-purple"
          style="
            color: rgb(64, 158, 255);
            font-weight: 800;
            font-size: 22px;
            margin-left: 44px;
          "
        >
          Easy Editor
        </div>
      </el-col>
      <el-col :span="12" class="tools-group">
        <el-tooltip
          class="item"
          effect="dark"
          content="放大"
          placement="bottom"
        >
          <el-button
            icon="el-icon-zoom-in"
            style="font-size: 18px"
            type="text"
            @click="zoomIn"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="缩小"
          placement="bottom"
        >
          <el-button
            icon="el-icon-zoom-out"
            style="font-size: 18px"
            type="text"
            @click="zoomOut"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="等比缩放"
          placement="bottom"
        >
          <el-button
            @click="autoSize"
            type="text"
            style="font-size: 16px"
            icon="iconfont icon-expandalt-fill"
          ></el-button>
        </el-tooltip>
        <!-- <el-tooltip class="item" effect="dark" content="导出xml文件" placement="bottom">
          <el-button type="text" icon="iconfont icon-xmloutput" @click="outPutXml"></el-button>
        </el-tooltip>-->
        <!-- <el-tooltip class="item" effect="dark" content="显示网格背景" placement="bottom">
          <el-button type="text" icon="iconfont icon-dituleiwanggequ-copy"></el-button>
        </el-tooltip>-->
        <el-tooltip
          class="item"
          effect="dark"
          content="导出为图片"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="iconfont icon-tupian"
            @click="showImage"
          ></el-button>
        </el-tooltip>
        <!-- <el-tooltip class="item" effect="dark" content="树形布局" placement="bottom">
          <el-button type="text" icon="iconfont icon-Directory-tree"></el-button>
        </el-tooltip>-->
      </el-col>
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          style="display: flex; justify-content: flex-end; padding-right: 20px"
        >
          <el-button round size="medium" @click="loadFlowCase(1)"
            >组件关系</el-button
          >
          <el-button round size="medium" @click="loadFlowCase(2)"
            >部署流程</el-button
          >
          <el-button round size="medium" @click="loadFlowCase(3)"
            >Vue生命周期案例</el-button
          >
        </div>
      </el-col>
    </div>
    <!-- 中心画布 -->
    <div class="graphContainer" id="graphContainer" ref="container"></div>
    ]
  </div>
</template>
<script>
// 导入自定义图标数组
import {
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
} from "../../graph/index"
const path = require('path');
// 配置自定义事件
Object.assign(MxEvent, {
  NORMAL_TYPE_CLICKED: 'NORMAL_TYPE_CLICKED',
});
// 导入流程图案例数据
const xmlData1 = path.join("./data/data1.xml");
const xmlData2 = path.join("./data/data2.xml");
const xmlData3 = path.join("./data/data3.xml");
export default {

  components: {
  },
  data () {
    return {
      graph: null,
      editor: null,
      palettes: {},
      graphXml: '',
      activeNames: ['1', '2', '3'],
      isNode: false,
      cellStyle: "",
      graphX: 100,
      graphY: 10,
      undoMng: "",
      isOutputXml: false,
      edgeStyle: 'orthogonalEdgeStyle',
      outline: "",
      idSeed: 0,
      normalIdSeed: 0,
      // configOrder: 0,
      currentNormalType: {},
      normalTypePosition: {
        top: '0',
        left: '0',
      },
    }
  },
  methods: {

    createGraph () {
      this.editor = new MxEditor()
      this.graph = this.editor.graph
      this.editor.setGraphContainer(this.$refs.container);
      // 配置默认全局样式
      this.configureStylesheet(this.graph);
      // 去锯齿效果
      MxRectangleShape.prototype.crisp = true;
      // 定义全局变量，如。用于触发建立新的连接的活动区域的最小尺寸（以像素为单位），该部分（100％）的小区区域被用于触发新的连接，以及一些窗口和“下拉菜菜单选择
      MxConstants.MIN_HOTSPOT_SIZE = 16;
      MxConstants.DEFAULT_HOTSPOT = 1;

      //cell创建支持传入html
      this.graph.setHtmlLabels(true);

      // 禁用分组的收缩功能 方法1:
      // this.graph.isCellFoldable = (cell) => {
      //   return false
      // }

      // 禁用分组的收缩功能 方法2:
      this.graph.foldingEnabled = false;

      // 显示中心端口图标
      this.graph.connectionHandler.targetConnectImage = false;

      // 禁止连接线晃动(即连线两端必须在节点上)
      this.graph.setAllowDanglingEdges(true);

      // 设置默认组
      // groupBorderSize 设置图形和它的子元素的边距
      var group = new MxCell('Group', new MxGeometry(), 'group;fontColor=white;');
      group.setVertex(false);
      // 设置组可连接
      group.setConnectable(false);
      this.editor.defaultGroup = group;
      this.editor.groupBorderSize = 40;
      // 返回元素
      this.graph.getLabel = function (cell) {
        var tmp = MxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
        if (this.isCellLocked(cell)) {
          // 如元素被锁定 返回空标签
          return '';
        }
        else if (this.isCellCollapsed(cell)) {
          var index = tmp.indexOf('</h1>');
          if (index > 0) {
            tmp = tmp.substring(0, index + 5);
          }
        }
        return tmp;
      }

      // 目标是否有效
      this.graph.isValidDropTarget = function (cell, cells, evt) {
        console.log(cell, cells, evt)
        return this.isSwimlane(cell);
      };

      // 是否根元素
      this.graph.isValidRoot = function (cell) {
        return this.isValidDropTarget(cell);
      }

      // 是否可以被选中
      this.graph.isCellSelectable = function () {
        return false
      };

      // 禁用HTML的泳道标签，避免冲突
      // 判断是否为泳道标签
      this.graph.isHtmlLabel = function (cell) {
        return !this.isSwimlane(cell);
      }

    },
    // 初始化画布
    initGraph () {
      if ((this.graph) == null || (this.graph) == undefined) {
        return
      }
      this.graph.convertValueToString = (cell) => {
        // 从value中获取显示的内容
        return cell['value'] ? cell['value'] : cell['title']
      }
      // 创建缩略图
      // this.outline = new mxOutline(this.graph, this.$refs.styleSelect.$refs.showMap);
    },

    showNormalTypeSelect (sender, evt) {
      let cell = evt.properties.cell.state.cell;
      this.currentNormalType = cell

    },


    // 基础配置函数
    configOption () {
      // 给graph添加事件
      this.graph.addMouseListener(
        {
          currentState: null,
          previousStyle: null,

          mouseDown: (sender, evt) => {
            if (!evt.state) {
              console.log('点击了画布')
              return;
            } else if (evt.state.cell.edge) {
              console.log('点击了连线')
              return;
            }

            const cell = evt.state.cell;
            let clickNormalType = false;
            if (cell.style !== undefined) {
              clickNormalType = cell.style.includes('normalType');
            }
            if (clickNormalType) {
              // 使用 MxGraph 事件中心，触发自定义事件
              this.graph.fireEvent(new MxEventObject(MxEvent.NORMAL_TYPE_CLICKED, 'cell', evt));
            } else {
              return
            }
          },

          mouseMove: (sender, me) => {
            // console.log('mouseMove')
            this.graphX = Math.ceil(me.graphX);
            this.graphY = me.graphY;
          },

          mouseUp: (sender, evt) => {
            console.log("mouseUp")
            if (evt.sourceState == undefined) {
              return;
            } else {
              var cell = evt.sourceState.cell;
              //  var cell = this.graph.getSelectionCell();
              if (cell) {
                cell.vertex ? this.isNode = true : this.isNode = false
                var getcellStyle = cell.getStyle() ? cell.getStyle() : null;
                if (!this.isNode) {
                  getcellStyle ? this.edgeStyle = getcellStyle : 'orthogonalEdgeStyle'
                }
                console.log(cell)
                if (getcellStyle) {
                  var arr = getcellStyle.split(";")
                  // arr.pop()
                  var styleObject = {}
                  arr.forEach((item => {
                    styleObject[item.split("=")[0]] = item.split("=")[1]
                  }))
                  this.cellStyle = styleObject
                  // if (this.isNode) {

                  // }
                }
              } else {
                this.$message.error("请选择节点或者连线")
              }
            }
          },
        });
      // 监听自定义事件
      this.graph.addListener(MxEvent.NORMAL_TYPE_CLICKED, this.showNormalTypeSelect);

      this.graph.setResizeContainer(false);
      // 禁用浏览器默认的右键菜单栏 
      MxEvent.disableContextMenu(this.$refs.container)

      // 自定义右键菜单栏
      this.graph.popupMenuHandler.factoryMethod = (menu) => {
        menu.addItem('输出所有节点', null, () => {
          Object.values(this.graph.getModel().cells).forEach((cell) => {
            console.log(cell)
          })
        })
      }
      // 启用工具提示，新连接平滑移动  
      this.graph.setPanning(true);

      // 开启提示
      this.graph.setTooltips(false);
      // 允许连线
      this.graph.setConnectable(false)

      // 开启方块上的文字编辑功能
      this.graph.setCellsEditable(false)

      // 禁止改变元素大小
      this.graph.setCellsResizable(false);
      // 是否缩放网格
      MxGraphHandler.prototype.scaleGrid = false;

      // 启用导航线帮助定位
      MxGraphHandler.prototype.guidesEnabled = false;
      // Alt 按下禁用导航线
      MxGraphHandler.prototype.useGuidesForEvent = function (me) {
        return !MxEvent.isAltDown(me.getEvent());
      };

      // 选择基本元素开启
      this.graph.setEnabled(false);
    },

    //  配置全局样式
    configureStylesheet (graph) {
      // 设置节点的文字可被移动
      graph.vertexLabelsMovable = false;
      // 设置鼠标悬浮至节点或者连线时高亮显示的颜色
      new MxCellTracker(graph, '#409eff');
      var style = new Object();
      style[MxConstants.STYLE_SHAPE] = MxConstants.SHAPE_LABEL;
      style[MxConstants.STYLE_PERIMETER] = MxPerimeter.RectanglePerimeter;
      style[MxConstants.STYLE_VERTICAL_ALIGN] = MxConstants.ALIGN_CENTER;
      style[MxConstants.STYLE_ALIGN] = MxConstants.ALIGN_CENTER;
      style[MxConstants.STYLE_IMAGE_ALIGN] = MxConstants.ALIGN_CENTER;
      style[MxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = MxConstants.ALIGN_CENTER;
      // style[MxConstants.STYLE_SPACING_TOP] = 6;
      style[MxConstants.STYLE_SPACING_LEFT] = 5;
      // style[MxConstants.STYLE_GRADIENTCOLOR] = 'skyblue'; // 渐变颜色
      style[MxConstants.STYLE_STROKECOLOR] = '#5d65df';   // 线条颜色
      style[MxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
      style[MxConstants.STYLE_FONTCOLOR] = '#1d258f';     // 字体颜色
      style[MxConstants.STYLE_FONTFAMILY] = 'Verdana';    // 字体风格
      style[MxConstants.STYLE_FONTSIZE] = '12';           // 字体大小
      style[MxConstants.STYLE_FONTSTYLE] = '0';           // 斜体字
      style[MxConstants.STYLE_ROUNDED] = false;             // 圆角
      style[MxConstants.STYLE_IMAGE_WIDTH] = '28';        // 图片宽度
      style[MxConstants.STYLE_IMAGE_HEIGHT] = '28';       // 图片高度
      style[MxConstants.STYLE_OPACITY] = '100';            // 节点透明度(不包含字体)
      graph.getStylesheet().putDefaultVertexStyle(style);

      style = new Object();
      style[MxConstants.STYLE_SHAPE] = MxConstants.SHAPE_SWIMLANE;
      style[MxConstants.STYLE_PERIMETER] = MxPerimeter.RectanglePerimeter;
      style[MxConstants.STYLE_ALIGN] = MxConstants.ALIGN_CENTER;
      style[MxConstants.STYLE_VERTICAL_ALIGN] = MxConstants.ALIGN_TOP;
      style[MxConstants.STYLE_FILLCOLOR] = '#409eff';
      // style[MxConstants.STYLE_GRADIENTCOLOR] = '#409eff';
      style[MxConstants.STYLE_STROKECOLOR] = '#409eff';
      style[MxConstants.STYLE_FONTCOLOR] = '#000000';
      style[MxConstants.STYLE_ROUNDED] = false;
      style[MxConstants.STYLE_OPACITY] = '80';
      style[MxConstants.STYLE_STARTSIZE] = '30';
      style[MxConstants.STYLE_FONTSIZE] = '16';
      style[MxConstants.STYLE_FONTSTYLE] = 1;
      graph.getStylesheet().putCellStyle('group', style);

      style = new Object();
      style[MxConstants.STYLE_SHAPE] = MxConstants.SHAPE_IMAGE;
      style[MxConstants.STYLE_FONTCOLOR] = '#774400';
      style[MxConstants.STYLE_PERIMETER] = MxPerimeter.RectanglePerimeter;
      style[MxConstants.STYLE_PERIMETER_SPACING] = '6';
      style[MxConstants.STYLE_ALIGN] = MxConstants.ALIGN_LEFT;
      style[MxConstants.STYLE_VERTICAL_ALIGN] = MxConstants.ALIGN_MIDDLE;
      style[MxConstants.STYLE_FONTSIZE] = '10';
      style[MxConstants.STYLE_FONTSTYLE] = 2;
      style[MxConstants.STYLE_IMAGE_WIDTH] = '16';
      style[MxConstants.STYLE_IMAGE_HEIGHT] = '16';
      style[MxConstants.STYLE_BACKGROUNDCOLOR] = 'transparent';
      graph.getStylesheet().putCellStyle('port', style);


      style = graph.getStylesheet().getDefaultEdgeStyle();
      style[MxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
      style[MxConstants.STYLE_STROKEWIDTH] = '2';
      style[MxConstants.STYLE_ROUNDED] = false;
      // 获取全局Edge、label样式
      var edgeStyle = this.graph.getStylesheet().getDefaultEdgeStyle()
      // let labelStyle = this.graph.getStylesheet().getDefaultVertexStyle();
      // 设置连线风格(设置为正交折线)
      edgeStyle['edgeStyle'] = 'orthogonalEdgeStyle';

      // 选中 cell/edge 后的伸缩大小的点/拖动连线位置的点的颜色
      MxConstants.STYLE_WHITE_SPACE = 'wrap';
      MxConstants.HANDLE_FILLCOLOR = '#99ccff'
      MxConstants.HANDLE_STROKECOLOR = '#0088cf'
      MxConstants.STYLE_ANCHOR_POINT_DIRECTION = 'anchorPointDirection'
      MxConstants.STYLE_STYLE_ROTATION = 'rotation';
    },

    // 放大
    zoomIn () {
      this.graph.zoomIn()
    },

    // 缩小
    zoomOut () {
      this.graph.zoomOut()
    },

    // 等比例缩放
    autoSize () {
      this.editor.execute('actualSize')
      // this.graph.fit();//自适应
      // this.graph.center(true, true, 0.5, 0.5);//将画布放到容器中间
      // // var sc = graph.getView().getScale();//获取当前的缩放比例
      // // this.graph.zoomTo(Math.round(sc / 6));//在缩放一半，否则是满屏状态，不好看
    },

    // 生成图片
    showImage () {
      this.editor.execute('show');//直接页面跳转,并以svg流程图
    },


    // 导入xml文件后更新视图
    uploadPaintFlow (newvalue) {
      this.graph.selectAll()
      this.graph.removeCells(this.graph.getSelectionCells())
      setTimeout(() => {
        this.decode(newvalue, this.graph)
        this.$message.success("渲染成功")
      }, 1000)
    },

    createXmlDom (str) {
      if (document.all) { //判断浏览器是否是IE
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
        xmlDom.loadXML(str);
        return xmlDom;
      } else {
        return (new DOMParser()).parseFromString(str, "text/xml");
      }
    },

    // 渲染xml流程图
    decode (graphXml, graph) {
      this.graph.getModel().beginUpdate();
      try {
        // 渲染流程图 方法一:
        // const xmlDocument = MxUtils.parseXml(graphXml)
        // const decoder = new MxCodec(xmlDocument)
        // decoder.decode(xmlDocument.documentElement, graph.getModel())
        // 渲染流程图 方法二:
        var xmlDoc = this.createXmlDom(graphXml);
        var node = xmlDoc.documentElement;
        var dec = new MxCodec(node.ownerDocument);
        dec.decode(node, graph.getModel());
      } finally {
        this.graph.getModel().endUpdate()
      }
    },

    // 导出xml文件
    outPutXml () {
      this.isOutputXml = true;
      this.graphXml = this.encode(this.graph)
    },

    // 导出xml数据
    encode (graph) {
      const encoder = new MxCodec()
      const result = encoder.encode(graph.getModel())
      return MxUtils.getPrettyXml(result)
    },
    // 加载案例流程图
    loadFlowCase (index) {

      let loadData = "";
      switch (index) {
        case 1: loadData = xmlData1; break
        case 2: loadData = xmlData2; break
        case 3: loadData = xmlData3; break
      }
      let newXml = MxUtils.load(loadData).request.response
      this.graph.selectAll()
      this.graph.removeCells(this.graph.getSelectionCells())
      setTimeout(() => {
        this.decode(newXml, this.graph)

        this.$message.success("加载流程图案例成功")
      }, 1000)
    }
  },

  mounted () {
    // 检测浏览器兼容性
    if (!MxClient.isBrowserSupported()) {
      this.$message.error('当前浏览器不支持拓扑图功能，请更换浏览器访问，建议使用Chrome浏览器访问!');
    }
    else {
      // Overridden to define per-shape connection points
      MxGraph.prototype.getAllConnectionConstraints = function (terminal) {
        if (terminal != null && terminal.shape != null) {
          if (terminal.shape.stencil != null) {
            if (terminal.shape.stencil.constraints != null) {
              return terminal.shape.stencil.constraints;
            }
          }
          else if (terminal.shape.constraints != null) {
            return terminal.shape.constraints;
          }
        }
        return null;
      };
      this.createGraph()
      this.initGraph()
      this.configOption()
    }
  }
}
</script>

<style lang="less">
.customToolbarContainer {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  .toolbarContainer {
    padding-top: 50px;
    font-size: 20px;
    background: #efefef;
    text-align: center;
    background-color: #fff;
    border-right: 1px solid #ededed;
    width: 15%;
    position: relative;
    box-sizing: border-box;
    overflow-y: scroll;
    .general-toolbar {
      .el-collapse-item__wrap .el-collapse-item__content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        .common {
          width: 30%;
          cursor: pointer;
          // padding: 10px;
          height: 50px;
          white-space: wrap;
          text-align: center;
          position: relative;
          .generalTooltitle {
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            // transform: translateX(-50%);
          }
        }
      }
    }
    .custom-toolbar {
      .el-collapse-item__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        span {
          cursor: pointer;
        }
      }
    }
  }
  .toolbarContainer::-webkit-scrollbar {
    display: none;
  }
  .graphContainer {
    margin-top: 50px;
    height: 100% !important;
    line-height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #fff !important;
    flex: 1;
    background-image: url("../../assets/grid.gif");
  }
  .top-tools {
    position: absolute;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    top: 0;
    left: 0;
    padding: 0 20px 0 20px;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    height: 50px;
    // border-bottom: 1px solid #ededed;
    box-shadow: 0px 2px 8px -4px #c4c7c1;
    .select-edgetype {
      width: 100px;
      margin-right: 10px;
    }
  }
  .el-collapse-item__header {
    padding-left: 30px;
  }
  .style-select {
    width: 20%;
    background-color: #fff;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid #ededed;
    padding-top: 50px;
    box-sizing: border-box;
  }
  .tools-group {
    display: flex;
    justify-content: center;
    button {
      margin-left: 22px;
    }
  }
  .aside-button-group {
    width: 100%;
    position: sticky;
    top: 0px;
    background: #ffffff;
    box-sizing: border-box;
    z-index: 1000;
    border: 1px solid #ededed;
    border-left: none;
  }
}

table.mxPopupMenu {
  background: #fff;
  cursor: pointer;
  border: 1px solid #ededed;
  padding: 5px;
}

div.mxPopupMenu {
  position: absolute;
}
.shapgroud {
  .el-collapse-item__content {
    display: flex;
    flex-wrap: wrap;
  }
  svg g path {
    fill: transparent;
  }
}
.flow {
  stroke-dasharray: 8;
  animation: dash 0.5s linear;
  animation-iteration-count: infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: -16;
  }
}
</style>
