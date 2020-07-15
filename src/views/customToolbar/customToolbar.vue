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
      <!-- 节点样板栏 -->
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
    <div class="graphContainer" id="graphContainer" ref="container"></div>
    <!-- 样式设置 -->
    <style-select
      @changeDashed="changeDashed"
      @changeStrokeColor="changeStrokeColor"
      @changeStrokeWidth="changeStrokeWidth"
      @changeFontSize="changeFontSize"
      @changeFontColor="changeFontColor"
      @changeLabelBackgroundColor="changeLabelBackgroundColor"
      @changeConfigOrder="changeConfigOrder"
      :isNode="isNode"
      :cellStyle="cellStyle"
      :configOrder="configOrder"
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
  mxCellOverlay,
  mxEventObject
} = mxgraph
const path = require('path');
Object.assign(mxEvent, {
  NORMAL_TYPE_CLICKED: 'NORMAL_TYPE_CLICKED',
});

import styleSelect from "./component/styleSelect";
// import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas'


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
      outline: "",
      idSeed: 0,
      configOrder: 0,
      currentNormalType: {},
      normalTypePosition: {
        top: '0',
        left: '0',
      },
    }
  },
  methods: {
    changeConfigOrder (val) {
      // 获取当前的cell
      this.currentNormalType.title = val.newConfigOrder;
      // 修改指定cell的背景图片
      this.graph.setCellStyles(mxConstants.STYLE_IMAGE, `./images/order/unselect-${val.newConfigOrder}.png`, [this.currentNormalType]);
      this.graph.refresh(this.currentNormalType)
    },
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
      this.graph.setHtmlLabels(false);
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

      // 配置默认全局样式
      this.configureStylesheet(this.graph);
      // 获取全局Edge、label样式
      var edgeStyle = this.graph.getStylesheet().getDefaultEdgeStyle()
      // let labelStyle = this.graph.getStylesheet().getDefaultVertexStyle();
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
              // 使用 mxGraph 事件中心，触发自定义事件
              this.graph.fireEvent(new mxEventObject(mxEvent.NORMAL_TYPE_CLICKED, 'cell', evt));
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

            }
          },
        });
      // 监听自定义事件
      this.graph.addListener(mxEvent.NORMAL_TYPE_CLICKED, this.showNormalTypeSelect);
    },
    showNormalTypeSelect (sender, evt) {
      let cell = evt.properties.cell.state.cell;
      this.configOrder = cell.title
      this.currentNormalType = cell
      // const { x, y } = evt
      // this.normalTypePosition.left = `${x - 210}px`;
      // this.normalTypePosition.top = `${y - 8}px`;
      // this.normalTypeSelectVisible = true;
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
        // Presets the collapsed size
        vertex.geometry.alternateBounds = new mxRectangle(0, 0, 120, 40);
        vertex.title = toolItem['title']
        vertex.id = toolItem['id'] + '-' + toolItem['idSeed'];
        // 添加完节点后自动添加顺序图标
        this.addPoint(vertex, toolItem['idSeed'])
        toolItem['idSeed']++;
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
          elt.style.backgroundSize = `contain`
          elt.style.backgroundRepeat = 'no-repeat';
          return elt
        }
        // 允许拖拽
        let ds = mxUtils.makeDraggable(dom, this.graph, dropHandler, createDragPreview(), 0, 0, true, true)
        ds.setGuidesEnabled(true);

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
        this.graph.removeCells()
      })

      // 禁用浏览器默认的右键菜单栏 
      mxEvent.disableContextMenu(this.$refs.container)
      // 自定义右键菜单栏
      this.graph.popupMenuHandler.factoryMethod = (menu) => {
        menu.addItem('输出所有节点', null, () => {
          Object.values(this.graph.getModel().cells).forEach((cell) => {
            console.log(cell)
          })
        })

        menu.addSeparator()
        menu.addItem('复制', null, () => {
          let selectionCells = this.graph.getSelectionCells();
          mxClipboard.copy(this.graph, selectionCells);
        })
        menu.addItem('粘贴', null, () => {
          mxClipboard.paste(this.graph);
        })
        menu.addSeparator()
        menu.addItem('组合', null, () => {
          let vertex = new mxCell(null, new mxGeometry(0, 0));
          vertex.setVertex(true);
          this.graph.groupCells(vertex, 0, this.graph.getSelectionCells());
        })
        menu.addItem('分解', null, () => {
          this.graph.ungroupCells(this.graph.getSelectionCells());
        })
        menu.addSeparator()
        menu.addItem('配置完成', null, () => {
          let cell = this.graph.getSelectionCell().children[0];
          let cellArrayStyle = cell.getStyle().split(';');
          cellArrayStyle.shift();
          let cellStyle = {}
          cellArrayStyle.forEach(item => {
            cellStyle[item.split('=')[0]] = item.split('=')[1]
          })
          let cellImage = cellStyle['image'].replace('unselect', 'selected');
          this.graph.setCellStyles(mxConstants.STYLE_IMAGE, cellImage, [cell]);
          console.log(cell)
          this.graph.refresh(cell)
        })
        // 分割符号
        menu.addSeparator()
        menu.addItem('修改样式', null, () => {
          var cell = this.graph.getSelectionCell();
          if (cell) {
            cell.vertex ? this.isNode = true : this.isNode = false
            var getcellStyle = cell.getStyle() ? cell.getStyle() : "";
            if (getcellStyle) {
              var arr = getcellStyle.split(";")
              arr.pop()
              var styleObject = {}
              arr.forEach((item => {
                styleObject[item.split("=")[0]] = item.split("=")[1]
              }))
              this.cellStyle = styleObject
              if (this.isNode) {

              }
            }
          } else {
            this.$message.error("请选择节点或者连线")
          }
        })
      }
      // 启用工具提示，新连接平滑移动  
      this.graph.setPanning(true);
      // 开启提示
      this.graph.setTooltips(false);
      // 允许连线
      this.graph.setConnectable(true)

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
    //  配置全局样式
    configureStylesheet (graph) {

      // 设置节点的文字可被移动
      graph.vertexLabelsMovable = true;
      // 设置鼠标悬浮至节点或者连线时高亮显示的颜色
      new mxCellTracker(graph, '#409eff');

      var style = new Object();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;
      // style[mxConstants.STYLE_SPACING_TOP] = 6;
      style[mxConstants.STYLE_SPACING_LEFT] = 5;
      // style[mxConstants.STYLE_GRADIENTCOLOR] = 'skyblue'; // 渐变颜色
      style[mxConstants.STYLE_STROKECOLOR] = '#5d65df';   // 线条颜色
      style[mxConstants.STYLE_FILLCOLOR] = 'transparent';
      style[mxConstants.STYLE_FONTCOLOR] = '#1d258f';     // 字体颜色
      style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';    // 字体风格
      style[mxConstants.STYLE_FONTSIZE] = '12';           // 字体大小
      style[mxConstants.STYLE_FONTSTYLE] = '1';           // 斜体字
      // style[mxConstants.STYLE_ROUNDED] = true;             // 圆角
      style[mxConstants.STYLE_IMAGE_WIDTH] = '28';        // 图片宽度
      style[mxConstants.STYLE_IMAGE_HEIGHT] = '28';       // 图片高度
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
      graph.getStylesheet().putCellStyle('group', style);

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
      style[mxConstants.STYLE_BACKGROUNDCOLOR] = 'transparent';
      graph.getStylesheet().putCellStyle('port', style);


      style = graph.getStylesheet().getDefaultEdgeStyle();
      style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
      style[mxConstants.STYLE_STROKEWIDTH] = '2';
      style[mxConstants.STYLE_ROUNDED] = true;


      // 选中 cell/edge 后的伸缩大小的点/拖动连线位置的点的颜色
      mxConstants.HANDLE_FILLCOLOR = '#99ccff'
      mxConstants.HANDLE_STROKECOLOR = '#0088cf'
      mxConstants.STYLE_ANCHOR_POINT_DIRECTION = 'anchorPointDirection'
      mxConstants.STYLE_STYLE_ROTATION = 'rotation';


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
      // this.graph.fit();//自适应
      // this.graph.center(true, true, 0.5, 0.5);//将画布放到容器中间
      // // var sc = graph.getView().getScale();//获取当前的缩放比例
      // // this.graph.zoomTo(Math.round(sc / 6));//在缩放一半，否则是满屏状态，不好看
    },
    // 生成图片
    showImage () {
      this.editor.execute('show');//直接页面跳转,并以svg流程图
      // this.exportFile('png');

    },
    exportFile (format) {
      var bg = '#ffffff';
      var scale = 1;
      var b = 1;
      var imgExport = new mxImageExport();
      var bounds = this.graph.getGraphBounds();
      var vs = this.graph.view.scale;
      // New image export
      var xmlDoc = mxUtils.createXmlDocument();
      var root = xmlDoc.createElement('output');
      xmlDoc.appendChild(root);
      // Renders graph. Offset will be multiplied with state's scale when painting state.
      var xmlCanvas = new mxXmlCanvas2D(root);
      xmlCanvas.translate(Math.floor((b / scale - bounds.x) / vs), Math.floor((b / scale - bounds.y) / vs));
      xmlCanvas.scale(scale / vs);
      imgExport.drawState(this.graph.getView().getState(this.graph.model.root), xmlCanvas);
      // Puts request data together
      var w = Math.ceil(bounds.width * scale / vs + 2 * b);
      var h = Math.ceil(bounds.height * scale / vs + 2 * b);
      var xml = mxUtils.getXml(root);
      if (bg != null) {
        bg = '&bg=' + bg;
      }
      new mxXmlRequest('../../../public/Export.ashx', 'filename=export.' + format + '&format=' + format +
        bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)).
        simulate(document, '_blank');
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
          const h = shape.getAttribute('h')
          shape.querySelector('path').setAttribute('fill', 'transparent')
          const w = shape.getAttribute('w')
          mxStencilRegistry.addStencil(shapeName, new mxStencil(shape))
          this.palettes[name]['shapes'].push({ name: shape.getAttribute('name'), width: w / 2, height: h / 2, fill: 'transparent' })
        }
        shape = shape.nextSibling
      }
      console.log(' this.palettes', this.palettes)
    },
    // 初始化箭头节点组的工具栏
    initStencilToolBar () {
      var stencilDomArray = this.$refs.stencilDragItem;
      if (!(stencilDomArray instanceof Array) || stencilDomArray.length <= 0 || (this.graph == null || this.graph == undefined)) {
        return
      }
      stencilDomArray.forEach(dom => {
        const shapeIndex = dom.getAttribute('shapeIndex')
        const paletteIndex = dom.getAttribute('paletteIndex')
        const shapeItem = Object.values(this.palettes)[paletteIndex]['shapes'][shapeIndex]
        const shapeWidth = shapeItem['width']
        const shapeHeight = shapeItem['height']
        const stencilDragHandler = (graph, evt, cell, x, y) => {

          this.instanceGraph(this.graph, shapeItem, x, y, shapeWidth, shapeHeight)
          console.log("拖拽箭头", graph, evt, cell, shapeItem, x, y)
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
    // 拖拽结束是新增的箭头节点
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

    addPoint (cell, number) {
      const normalTypeVertex = this.graph.insertVertex(cell, null, null,
        1, 1, 30, 30,
        `port;normalType;fillColor=none;image=./images/order/unselect-${number}.png;spacingLeft=18;spacingBottom=18`, true);
      // 固定序号图标的位置.不随节点变大而改变位置
      normalTypeVertex.geometry.offset = new mxPoint(-18, -18);
      normalTypeVertex.setConnectable(false);
      normalTypeVertex.id = (cell.id).split('-')[0] + `-unselect-${number}`;
      normalTypeVertex.title = number;
      // 将新增的图标鼠标悬浮换成手势的图案
      const oldGetCursorForCell = mxGraph.prototype.getCursorForCell;
      this.graph.getCursorForCell = function (...args) {
        const [cell] = args;
        cell.style.includes('normalType') ? console.log(cell) : false
        if (cell.edge || cell.style == undefined) {
          return
        }
        return cell.style.includes('normalType') ?
          'pointer' :
          oldGetCursorForCell.apply(this, args);
      };

    }
  },
  mounted () {
    // 检测浏览器兼容性
    if (!mxClient.isBrowserSupported()) {
      this.$message.error('当前浏览器不支持拓扑图功能，请更换浏览器访问，建议使用Chrome浏览器访问!');
    }
    else {
      // Overridden to define per-shape connection points
      mxGraph.prototype.getAllConnectionConstraints = function (terminal) {
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
      mxConstraintHandler.prototype.pointImage = new mxImage('./icon/dot.gif', 3, 3);
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
      mxPolyline.prototype.constraints = null;

      this.createGraph()
      this.initGraph()
      this.configOption()
      this.addStencilPalette('箭头组', 'arrows', path.join('./arrows.xml'))
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
  svg g path {
    fill: transparent;
  }
}
</style>
