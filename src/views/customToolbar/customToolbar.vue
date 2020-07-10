<template>
  <div class="customToolbarContainer">
    <div class="toolbarContainer">
      <div class="aside-button-group">
        <el-button-group style="margin:10px 0 ">
          <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
            <el-button icon="el-icon-zoom-in" @click="zoomIn"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
            <el-button icon="el-icon-zoom-out" @click="zoomOut"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="等比缩放" placement="bottom">
            <el-button @click="autoSize" icon="iconfont icon-expandalt-fill"></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <!-- 将所有自定义图标渲染出来 -->
          <template slot="title" class="collaspetitle">自定义节点</template>
          <span
            v-for="item in toolbarItems"
            style="display:inline-block;margin:20px; width:50px;height:50px"
            :key="item['title']"
            ref="toolItem"
          >
            <img style="width:24px;height:24px" :src="item['icon']" />
            <br />
            <span>{{item['title']}}</span>
          </span>
        </el-collapse-item>
        <!-- 模板图标 -->
        <el-collapse-item
          v-for="(palette, paletteIndex) in Object.values(palettes)"
          :title="palette['title']"
          :name="palette['name']"
          :key="paletteIndex"
          class="shapgroud"
        >
          <!-- 图标 -->
          <a
            v-for="(_, shapeIndex) in palette['shapes']"
            :shapeIndex="shapeIndex"
            :paletteIndex="paletteIndex"
            ref="stencilDragItem"
            :key="shapeIndex"
          ></a>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 画布中的顶部工具栏 -->
    <div class="top-tools">
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12" class="tools-group">
        <el-select
          class="select-edgetype"
          v-model="edgeValue"
          @change="edgeChange"
          placeholder="请选择"
          round
        >
          <el-option
            v-for="item in edgeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-tooltip class="item" effect="dark" content="组合" placement="bottom">
          <el-button type="text" icon="iconfont icon-zuhe" size="medium"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="导入xml文件" placement="bottom">
          <el-button type="text" icon="iconfont icon-fileplus-fill" @click="inPutXml"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="导出xml文件" placement="bottom">
          <el-button type="text" icon="iconfont icon-xmloutput" @click="outPutXml"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="显示网格背景" placement="bottom">
          <el-button type="text" icon="iconfont icon-dituleiwanggequ-copy"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="导出为图片" placement="bottom">
          <el-button type="text" icon="iconfont icon-tupian" @click="showImage"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="树形布局" placement="bottom">
          <el-button type="text" icon="iconfont icon-Directory-tree"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
          <el-button type="text" icon="iconfont icon-reply" @click="goBack"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="前进" placement="bottom">
          <el-button type="text" icon="iconfont icon-share" @click="goForward"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
          <el-button type="text" icon="el-icon-delete-solid" @click="deleteNode"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </div>
    <div class="graphContainer" ref="container"></div>
    <!-- 样式设置 -->
    <style-select
      @changeDashed="changeDashed"
      @changeStrokeColor="changeStrokeColor"
      @changeStrokeWidth="changeStrokeWidth"
      @changeFontSize="changeFontSize"
      @changeFontColor="changeFontColor"
      @changeLabelBackgroundColor="changeLabelBackgroundColor"
      :isNode="isNode"
      :cellStyle="cellStyle"
      :graphX="graphX"
      :graphY="graphY"
      class="style-select"
      ref="styleSelect"
    />
    <!-- XML数据导出 -->
    <upload-data
      v-if="uploadDataVisible"
      @uploadPaintFlow="uploadPaintFlow"
      :graphXml="graphXml"
      :isOutputXml="isOutputXml"
    ></upload-data>
  </div>
</template>

<script>
// 导入自定义图标数组
import { toolbarItems } from './toolbar'
import uploadData from "./component/uploadData"
import mxgraph from "../../graph/index";
const {
  mxStencilRegistry,
  mxStencil,
  mxEvent,
  mxGraph,
  mxEditor,
  mxUtils,
  mxRubberband,
  mxKeyHandler,
  mxGraphHandler,
  mxConstants,
  mxImage,
  mxConstraintHandler,
  mxCellState,
  mxCodec,
  mxEdgeStyle,
  mxRectangleShape,
  mxShape,
  mxConnectionConstraint,
  mxPoint,
  mxClipboard,
  mxPolyline,
  mxCellTracker,
  mxUndoManager,
  mxClient,
  mxEdgeHandler,
  mxPerimeter,
  mxOutline,
} = mxgraph
const path = require('path')
import styleSelect from "./component/styleSelect"

export default {
  computed: {
    toolbarItems: () => toolbarItems
  },
  components: {
    styleSelect,
    uploadData
  },
  data () {
    return {
      graph: null,
      editor: null,
      palettes: {},
      graphXml: '',
      activeNames: ['1'],
      edgeOptions: [
        { label: "直线", value: 'none' },
        { label: "折线", value: "ElbowConnector" },
        { label: '折线2', value: "orthogonalEdgeStyle" },
        { label: "小折线", value: "Loop" }],
      edgeValue: "折线2",
      isNode: true,
      cellStyle: "",
      graphX: 100,
      graphY: 10,
      undoMng: "",
      uploadDataVisible: false,
      isOutputXml: false,
      outline: ""
    }
  },
  methods: {

    createGraph () {
      // 创建graph
      // 方式一：直接构建graph实例
      // this.graph = new mxGraph(this.$refs.container)
      this.editor = new mxEditor()
      this.graph = this.editor.graph
      this.editor.setGraphContainer(this.$refs.container);
      // 去锯齿效果
      mxRectangleShape.prototype.crisp = true;
      //cell创建支持传入html
      this.graph.setHtmlLabels(true);
      // 设置连线时的预览路径及样式
      this.graph.connectionHandler.createEdgeState = () => {
        // 设置预览的连接线,第三个参数为连接成功后连接线上的label
        var edge = this.graph.createEdge(null, null, '默认连线说明', null, null);
        return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
      };

      //准备撤销还原功能
      // 构造具有给定历史记录大小的新撤消管理器。默认100步
      this.undoMng = new mxUndoManager();
      let listener = (sender, evt) => {
        this.undoMng.undoableEditHappened(evt.getProperty('edit'));
      };
      this.graph.getModel().addListener(mxEvent.UNDO, listener);
      this.graph.getView().addListener(mxEvent.UNDO, listener)
    },

    // 初始化画布
    initGraph () {
      if ((this.graph) == null || (this.graph) == undefined) {
        return
      }

      // 获取全局Edge、label样式
      var edgeStyle = this.graph.getStylesheet().getDefaultEdgeStyle()
      let labelStyle = this.graph.getStylesheet().getDefaultVertexStyle();

      // 选中 cell/edge 后的伸缩大小的点/拖动连线位置的点的颜色
      mxConstants.HANDLE_FILLCOLOR = '#99ccff'
      mxConstants.HANDLE_STROKECOLOR = '#0088cf'
      mxConstants.STYLE_ANCHOR_POINT_DIRECTION = 'anchorPointDirection'
      mxConstants.STYLE_STYLE_ROTATION = 'rotation';

      this.configureStylesheet(this.graph);

      // 设置连线风格(设置为正交折线)
      edgeStyle['edgeStyle'] = 'orthogonalEdgeStyle';

      this.graph.convertValueToString = (cell) => {
        // 从value中获取显示的内容
        return cell['value'] ? cell['value'] : cell['title']
      }
      // 创建缩略图
      this.outline = new mxOutline(this.graph, this.$refs.styleSelect.$refs.showMap);
      // 给graph添加事件
      this.graph.addMouseListener(
        {
          currentState: null,
          previousStyle: null,
          mouseDown: function (sender, me) {
            console.log('mouseDown')
            // if (this.currentState != null) {
            //   // 修改节点信息
            //   this.dragLeave(me.getEvent(), this.currentState);
            //   this.currentState = null;
            // }
          },
          mouseMove: (sender, me) => {
            // console.log('mouseMove')
            this.graphX = Math.ceil(me.graphX);
            this.graphY = me.graphY;
          },
          mouseUp: (sender, me) => {
            console.log('mouseUp')
            // console.log(sender, me)
          },
        });


    },
    // 添加元素
    addCell (toolItem, x, y) {
      const { width, height } = toolItem
      const styleObj = toolItem['style']
      const style = Object.keys(styleObj).map((attr) => `${attr}=${styleObj[attr]}`).join(';')
      const parent = this.graph.getDefaultParent()
      this.graph.getModel().beginUpdate()
      try {
        let vertex = this.graph.insertVertex(parent, null, null, x, y, width, height, style)

        vertex.title = toolItem['title']
      } finally {
        this.graph.getModel().endUpdate()
      }
    },

    // 初始化工具栏
    initToolbar () {
      // 获取工具栏中的自定义节点的dom
      var domArray = this.$refs.toolItem
      if (!(domArray instanceof Array) || domArray.length <= 0) {
        return
      }
      domArray.forEach((dom, domIndex) => {
        var toolItem = this.toolbarItems[domIndex]
        var { width, height } = toolItem
        var image = toolItem.style.image
        //定义拖拽后的回调函数
        var dropHandler = (graph, evt, cell, x, y) => {
          this.addCell(toolItem, x, y)
        }
        // 设置节点被拖拽时的样式(预览)
        var createDragPreview = () => {
          var elt = document.createElement('div')
          elt.style.border = '2px dotted black'
          elt.style.width = `${width}px`
          elt.style.height = `${height}px`
          elt.style.backgroundImage = `url(${image})`
          elt.style.backgroundSize = `contain	`
          elt.style.backgroundRepeat = 'no - repeat';
          return elt
        }
        // 允许拖拽
        mxUtils.makeDraggable(dom, this.graph, dropHandler, createDragPreview(), 0, 0, false, true)
      })
    },
    // 基础配置函数
    configOption () {
      // 鼠标框选 
      this.rubberBand = new mxRubberband(this.graph)

      // 启动盘事件键
      this.keyHandler = new mxKeyHandler(this.graph)

      // 键盘按下删除键绑定事件
      this.keyHandler.bindKey(46, () => {
        // const cells = this.graph.getSelectionCells() || []
        this.graph.removeCells()
      })

      // 禁用浏览器默认的右键菜单栏 
      mxEvent.disableContextMenu(this.$refs.container)
      // 自定义右键菜单栏
      this.graph.popupMenuHandler.factoryMethod = (menu) => {
        menu.addItem('输出所有节点的id', null, () => {
          // this.graphXml = this.encode(this.graph)
          // console.log(this.graphXml)
          // this.$message.success('导出成功')
          Object.values(this.graph.getModel().cells).forEach((cell, index) => {
            console.log(cell.id)
          })
        })
        menu.addSeparator()
        menu.addItem('导入', null, () => {
          this.$confirm('为了使导入的效果明显，会先删除所有现有的cell，并在1秒后执行导入！！！', '提示')
            .then(() => {
              this.graph.selectAll()
              this.graph.removeCells(this.graph.getSelectionCells())
              setTimeout(() => {
                this.decode(this.graphXml, this.graph)
                this.$message('导入成功')
              }, 1000)
            })
            .catch(() => { })
        })
        menu.addSeparator()
        menu.addItem('复制', null, () => {
          let selectionCells = this.graph.getSelectionCells();
          mxClipboard.copy(this.graph, selectionCells);
        })
        menu.addSeparator()
        menu.addItem('粘贴', null, () => {
          mxClipboard.paste(this.graph);
        })

        // 添加分割符号
        menu.addSeparator()
        menu.addItem('修改样式', null, () => {
          var cell = this.graph.getSelectionCell();
          if (cell) {
            cell.vertex ? this.isNode = true : this.isNode = false
            var cell = this.graph.getSelectionCell();
            // this.cellStyle = cell.getStyle() ? cell.getStyle() : "";
            var getcellStyle = cell.getStyle() ? cell.getStyle() : "";
            if (getcellStyle) {
              var arr = getcellStyle.split(";")
              arr.pop()
              var styleObject = {}
              arr.forEach((item => {
                styleObject[item.split("=")[0]] = item.split("=")[1]
              }))
              this.cellStyle = styleObject
            }
          } else {
            this.$message.error("请选择节点或者连线")
          }
        })
      }
      // 启用工具提示，新连接平滑移动  
      this.graph.setPanning(true);
      // 开启提示
      this.graph.setTooltips(true);
      // 允许连线
      this.graph.setConnectable(true)
      // 设置鼠标悬浮至节点或者连线时高亮显示的颜色
      var highlight = new mxCellTracker(this.graph, '#409eff');
      // 开启方块上的文字编辑功能
      this.graph.setCellsEditable(true)
      // 启用对齐线帮助定位
      mxGraphHandler.prototype.guidesEnabled = true;
      // 自动导航目标
      mxEdgeHandler.prototype.snapToTerminals = true;
      // 选择基本元素开启
      this.graph.setEnabled(true);
    },

    // 自定义全局连线样式
    edgeChange () {
      //连线样式可设置为ElbowConnector,SideToSide,Loop
      // edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle[this.edgeValue]
      this.graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = this.edgeValue;
      this.graph.alternateEdgeStyle = 'elbow=vertical'
      this.$message.success("切换连线样式成功")
    },
    // 配置全局样式
    configureStylesheet (graph) {
      var style = new Object();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
      style[mxConstants.STYLE_SPACING_TOP] = '56';
      style[mxConstants.STYLE_GRADIENTCOLOR] = 'skyblue'; // 渐变颜色
      style[mxConstants.STYLE_STROKECOLOR] = '#5d65df';   // 线条颜色
      style[mxConstants.STYLE_FILLCOLOR] = '#adc5ff';
      style[mxConstants.STYLE_FONTCOLOR] = '#1d258f';     // 字体颜色
      style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';    // 字体风格
      style[mxConstants.STYLE_FONTSIZE] = '12';           // 字体大小
      style[mxConstants.STYLE_FONTSTYLE] = '1';           // 斜体字
      style[mxConstants.STYLE_ROUNDED] = true;             // 圆角
      style[mxConstants.STYLE_IMAGE_WIDTH] = '18';        // 图片宽度
      style[mxConstants.STYLE_IMAGE_HEIGHT] = '18';       // 图片高度
      style[mxConstants.STYLE_OPACITY] = '80';            // 节点透明度(不包含字体)
      graph.getStylesheet().putDefaultVertexStyle(style);

      style = new Object();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
      style[mxConstants.STYLE_FILLCOLOR] = '#FF9103';
      style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
      style[mxConstants.STYLE_STROKECOLOR] = '#E86A00';
      style[mxConstants.STYLE_FONTCOLOR] = '#000000';
      style[mxConstants.STYLE_ROUNDED] = true;
      style[mxConstants.STYLE_OPACITY] = '80';
      style[mxConstants.STYLE_STARTSIZE] = '30';
      style[mxConstants.STYLE_FONTSIZE] = '16';
      style[mxConstants.STYLE_FONTSTYLE] = 1;
      // style['edgeStyle'] = 'orthogonalEdgeStyle';
      style[mxConstants.STYLE_ORTHOGONAL_LOOP] = 1;
      style[mxConstants.STYLE_JETTY_SIZE] = "auto";
      graph.getStylesheet().putCellStyle('group', style);
      console.log('edgestyle', style)
      style = new Object();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
      style[mxConstants.STYLE_FONTCOLOR] = '#774400';
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
      style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
      style[mxConstants.STYLE_FONTSIZE] = '10';
      style[mxConstants.STYLE_FONTSTYLE] = 2;
      style[mxConstants.STYLE_IMAGE_WIDTH] = '16';
      style[mxConstants.STYLE_IMAGE_HEIGHT] = '16';
      graph.getStylesheet().putCellStyle('port', style);

      style = graph.getStylesheet().getDefaultEdgeStyle();
      style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
      style[mxConstants.STYLE_STROKEWIDTH] = '2';
      style[mxConstants.STYLE_ROUNDED] = true;
      style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
    },
    //设置虚线样式
    changeDashed (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_DASHED, value, [...cell]);
      this.graph.refresh(cell)
    },
    //设置线条颜色样式
    changeStrokeColor (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, value, [...cell]);
      this.graph.refresh(cell)
    },
    //设置线条宽度
    changeStrokeWidth (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, [...cell]);
      this.graph.refresh(cell)
    },
    //设置字体大小
    changeFontSize (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_FONTSIZE, value, [...cell]);
      this.graph.refresh(cell)
    },
    //设置字体颜色
    changeFontColor (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, value, [...cell]);
      this.graph.refresh(cell)
    },
    //设置线条说明的背景颜色
    changeLabelBackgroundColor (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, value, [...cell]);
      this.graph.refresh(cell)
    },
    // 删除节点
    deleteNode () {
      this.graph.removeCells()
    },
    // 前进
    goForward () {
      // 还原
      this.undoMng.redo();
    },
    // 撤退
    goBack () {
      // 撤销
      this.undoMng.undo();
    },
    // 放大
    zoomIn () {
      this.graph.zoomIn()
    },
    // 缩小
    zoomOut () {
      // 缩小
      this.graph.zoomOut()
    },
    // 等比例缩放
    autoSize () {
      this.editor.execute('actualSize')
    },
    // 生成图片
    showImage () {
      this.editor.execute('show');
    },
    // 开始导入xml文件
    inPutXml () {
      this.isOutputXml = false;
      this.uploadDataVisible = true;
      this.graphXml = ''
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
    decode (graphXml, graph) {
      this.graph.getModel().beginUpdate();
      // window['mxGraphModel'] = mxGraphModel;
      // window['mxGeometry'] = mxGeometry;
      const xmlDocument = mxUtils.parseXml(graphXml)
      const decoder = new mxCodec(xmlDocument)
      decoder.decode(xmlDocument.documentElement, graph.getModel())
      this.graph.getModel().endUpdate()
    },
    // 导出xml文件
    outPutXml () {
      this.isOutputXml = true;
      this.uploadDataVisible = true;
      this.graphXml = this.encode(this.graph)
    },
    // 导出xml数据
    encode (graph) {
      const encoder = new mxCodec()
      const result = encoder.encode(graph.getModel())
      return mxUtils.getPrettyXml(result)
    },
    addStencilPalette (title, name, file) {
      let req = mxUtils.load(file)
      let root = req.getDocumentElement()
      let shape = root.firstChild
      this.$set(this.palettes, name, { title, name, shapes: [] })
      while (shape != null) {
        if (shape.nodeType === mxConstants.NODETYPE_ELEMENT) {
          const shapeName = shape.getAttribute('name')
          const w = shape.getAttribute('w')
          const h = shape.getAttribute('h')

          mxStencilRegistry.addStencil(shapeName, new mxStencil(shape))
          this.palettes[name]['shapes'].push({ name: shape.getAttribute('name'), width: w / 2, height: h / 2 })
        }
        shape = shape.nextSibling
        console.log(this.palettes[name]['shapes'])
      }
    },
    initStencilToolBar () {
      var stencilDomArray = this.$refs.stencilDragItem;
      console.log('stencilDomArray', stencilDomArray)
      if (!(stencilDomArray instanceof Array) || stencilDomArray.length <= 0 || (this.graph == null || this.graph == undefined)) {
        return
      }
      stencilDomArray.forEach(dom => {
        const shapeIndex = dom.getAttribute('shapeIndex')
        const paletteIndex = dom.getAttribute('paletteIndex')
        const shapeItem = Object.values(this.palettes)[paletteIndex]['shapes'][shapeIndex]
        console.log()
        const shapeWidth = shapeItem['width']
        const shapeHeight = shapeItem['height']
        const stencilDragHandler = (graph, evt, cell, x, y) => {
          this.instanceGraph(this.graph, shapeItem, x, y, shapeWidth, shapeHeight)
        }
        var createDragPreview = () => {
          //设置鼠标拖拽节点时的样式
          const elt = document.createElement('div')
          elt.style.border = '2px dotted black'
          elt.style.width = `${shapeWidth}px`
          elt.style.height = `${shapeHeight}px`
          return elt
        }
        dom.appendChild(this.createThumb(shapeItem, shapeWidth, shapeHeight))

        mxUtils.makeDraggable(dom, this.graph, stencilDragHandler, createDragPreview(), 0, 0, false, true)
      })
    },
    instanceGraph (graph, shapeItem, x, y, width, height) {
      const stencilParent = graph.getDefaultParent()
      graph.getModel().beginUpdate()
      try {
        let vertex = graph.insertVertex(stencilParent, null, null, x, y, width, height, `shape=${shapeItem['name']};`)

        vertex.customer = true
      } finally {
        graph.getModel().endUpdate()
      }
    },
    createThumb (item, width, height) {
      const tmpGraph = new mxGraph(document.createElement('div'))
      const thumbBorder = 2

      tmpGraph.labelsVisible = false
      tmpGraph.view.scaleAndTranslate(1, 0, 0)

      this.instanceGraph(tmpGraph, item, 0, 0, width, height)

      const bounds = tmpGraph.getGraphBounds()
      const s = Math.floor(Math.min((width - 2 * thumbBorder) / bounds.width, (height - 2 * thumbBorder) / bounds.height) * 100) / 100

      tmpGraph.view.scaleAndTranslate(s, Math.floor((width - bounds.width * s) / 2 / s - bounds.x), Math.floor((height - bounds.height * s) / 2 / s - bounds.y))

      const node = tmpGraph.view.getCanvas().ownerSVGElement.cloneNode(true)

      node.style.position = 'relative'
      node.style.overflow = 'hidden'
      node.style.cursor = 'move'
      node.style.width = `${width}px`
      node.style.height = `${height}px`
      node.style.left = `${thumbBorder}px`
      node.style.top = `${thumbBorder}px`
      node.style.display = 'inline-block'

      return node
    },
  },
  mounted () {
    // 检测浏览器兼容性
    if (!mxClient.isBrowserSupported()) {
      this.$message.error('当前浏览器不支持拓扑图功能，请更换浏览器访问，建议使用Chrome浏览器访问!');
    }
    else {
      // Overridden to define per-shape connection points
      mxGraph.prototype.getAllConnectionConstraints = function (terminal, source) {
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
      // 设定连接点的位置、可编辑状态和图标
      mxConstraintHandler.prototype.pointImage = new mxImage('./icon/dot.gif', 10, 10);
      mxShape.prototype.constraints = [
        new mxConnectionConstraint(new mxPoint(0, 0), true),
        new mxConnectionConstraint(new mxPoint(0.25, 0), true),
        new mxConnectionConstraint(new mxPoint(0.5, 0), true),
        new mxConnectionConstraint(new mxPoint(0.75, 0), true),
        new mxConnectionConstraint(new mxPoint(0, 0.25), true),
        new mxConnectionConstraint(new mxPoint(0, 0.5), true),
        new mxConnectionConstraint(new mxPoint(0, 0.75), true),
        new mxConnectionConstraint(new mxPoint(1, 0), true),
        new mxConnectionConstraint(new mxPoint(1, 0.25), true),
        new mxConnectionConstraint(new mxPoint(1, 0.5), true),
        new mxConnectionConstraint(new mxPoint(1, 0.75), true),
        new mxConnectionConstraint(new mxPoint(0, 1), true),
        new mxConnectionConstraint(new mxPoint(0.25, 1), true),
        new mxConnectionConstraint(new mxPoint(0.5, 1), true),
        new mxConnectionConstraint(new mxPoint(0.75, 1), true),
        new mxConnectionConstraint(new mxPoint(1, 1), true)];
      // Edges have no connection points
      mxPolyline.prototype.constraints = null;

      this.createGraph()
      this.initGraph()
      this.configOption()
      this.addStencilPalette('箭头', 'arrows', path.join('./arrows.xml'))
      this.$nextTick(() => {
        this.initToolbar();
        this.initStencilToolBar();
      })
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
  }
  .toolbarContainer::-webkit-scrollbar {
    display: none;
  }
  .graphContainer {
    margin-top: 50px;
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
  .mxRubberband {
    background-color: rgb(58, 58, 207);
    position: absolute;
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
    background: #ffff;
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
}
</style>
