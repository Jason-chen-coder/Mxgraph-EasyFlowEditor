<template>
  <div class="customToolbarContainer">
    <!-- 左侧节点/放大缩小工具 菜单 -->
    <div class="toolbarContainer">
      <div class="aside-button-group">
        <el-button-group style="margin: 10px 0">
          <el-tooltip
            class="item"
            effect="dark"
            content="放大"
            placement="bottom"
          >
            <el-button icon="el-icon-zoom-in" @click="zoomIn"></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="缩小"
            placement="bottom"
          >
            <el-button icon="el-icon-zoom-out" @click="zoomOut"></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="等比缩放"
            placement="bottom"
          >
            <el-button
              @click="autoSize"
              icon="iconfont icon-expandalt-fill"
            ></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <!-- 节点样板菜单 -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1" class="general-toolbar">
          <!-- 基础节点图标 -->
          <template slot="title" class="collaspetitle">基础节点</template>
          <span
            v-for="item in generalToolbarItems"
            :style="item['style']"
            :class="item['class']"
            :key="item['index']"
            ref="generalToolItems"
          >
            <span class="generalTooltitle">{{ item["text"] }}</span>
          </span>
        </el-collapse-item>
        <el-collapse-item name="2" class="custom-toolbar">
          <!-- 自定义图标 -->
          <template slot="title" class="collaspetitle">自定义节点</template>
          <span
            v-for="item in toolbarItems"
            style
            :class="{ 'rectangle-node': item['nodeType'] === 'rectangle' }"
            class="custom-node"
            :key="item['title']"
            ref="toolItem"
          >
            <img style :src="item['icon']" />
            <br />
            <span class="node-title">{{ item["title"] }}</span>
          </span>
        </el-collapse-item>
        <!-- 箭头模板图标 -->
        <el-collapse-item
          v-for="(palette, paletteIndex) in Object.values(palettes)"
          :title="palette['title']"
          :key="paletteIndex"
          name="3"
          class="shapgroud"
        >
          <!-- 图标 -->
          <a
            v-for="(_, shapeIndex) in palette['shapes']"
            :shapeIndex="shapeIndex"
            :paletteIndex="paletteIndex"
            ref="stencilDragItem"
            class="stencil-node"
            :key="shapeIndex"
          ></a>
        </el-collapse-item>
        <!--分组图标 -->
        <el-collapse-item title="组元素" name="4">
          <ul>
            <li
              v-for="(item, index) in grouptoolItems"
              :key="index"
              class="group-item"
              ref="grouptoolItem"
            >
              <b>{{ item.title }}</b>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 画布的顶部工具栏 -->
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
          content="组合"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="iconfont icon-zuhe"
            @click="enGroup"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="导入xml文件"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="iconfont icon-fileplus-fill"
            @click="inPutXml"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="导出xml文件"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="iconfont icon-xmloutput"
            @click="outPutXml"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          v-if="showBackground"
          content="隐藏网格背景"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="iconfont icon-dituleiwanggequ-copy"
            @click="showBackground = false"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          v-else
          class="item"
          effect="dark"
          content="显示网格背景"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="iconfont icon-fangxingweixuanzhong-copy"
            @click="showBackground = true"
          ></el-button>
        </el-tooltip>
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
        <el-tooltip
          class="item"
          effect="dark"
          content="环形布局"
          placement="bottom"
        >
          <el-button
            @click="graphLayout(true, 'circleLayout')"
            type="text"
            icon="el-icon-stopwatch"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="树形布局"
          placement="bottom"
        >
          <el-button
            type="text"
            @click="graphLayout(true, 'compactTreeLayout')"
            icon="iconfont icon-Directory-tree"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="随机布局"
          placement="bottom"
        >
          <el-button
            type="text"
            @click="graphLayout(true, 'randomLayout')"
            icon="el-icon-c-scale-to-original"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="分层布局"
          placement="bottom"
        >
          <el-button
            type="text"
            @click="graphLayout(true, 'hierarchicalLayout')"
            icon="el-icon-files"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="撤销"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="iconfont icon-reply"
            @click="goBack"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="前进"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="iconfont icon-share"
            @click="goForward"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除"
          placement="bottom"
        >
          <el-button
            type="text"
            icon="el-icon-delete-solid"
            @click="deleteNode"
          ></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          style="display: flex; justify-content: flex-end; padding-right: 20px"
        >
          <el-button round size="medium" @click="loadFlowCase(1)"
            >化工流程案例</el-button
          >
          <el-button round size="medium" @click="loadFlowCase(2)"
            >组件管理案例</el-button
          >
          <el-button round size="medium" @click="loadFlowCase(3)"
            >Vue生命周期案例</el-button
          >
        </div>
      </el-col>
    </div>
    <!-- 中心画布 -->
    <div
      class="graphContainer"
      id="graphContainer"
      ref="container"
      :class="{ 'graphContainer-background': showBackground }"
    ></div>
    <!-- 右侧栏 -->
    <div class="right-bar">
      <!-- 样式设置 -->
      <style-select
        @changeDashed="changeDashed"
        @changeStrokeColor="changeStrokeColor"
        @changeStrokeWidth="changeStrokeWidth"
        @changeFontSize="changeFontSize"
        @changeFontColor="changeFontColor"
        @changeLabelBackgroundColor="changeLabelBackgroundColor"
        @changeConfigOrder="changeConfigOrder"
        @changeFillColor="changeFillColor"
        @changeShadow="changeShadow"
        @changeFontStyle="changeFontStyle"
        @changeNodeimage="changeNodeimage"
        @edgeChange="edgeChange"
        @textValueChange="textValueChange"
        :textValue="textValue"
        :isNode="isNode"
        :cellStyle="cellStyle"
        :currentNormalType="currentNormalType"
        :graphX="graphX"
        :graphY="graphY"
        ref="styleSelect"
      />
      <div class="json-viewer">
        <h4 style="text-align: center">Json数据结构</h4>
        <json-viewer
          :value="jsonData"
          style="height: 80%"
          copyable
          sort
        ></json-viewer>
      </div>
    </div>

    <!-- XML数据导入/导出 -->
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
import { generalToolbarItems } from "./general-shape"
import { toolbarItems } from './toolbar'
import uploadData from "./component/uploadData"
// 组元素
import { grouptoolItems } from './GroupToolbarItems'
import * as R from "ramda";
import mx from 'mxgraph';
import _ from 'lodash';
const mxgraph = mx({})
import styleSelect from "./component/styleSelect";
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
  mxCellState,
  mxConnectionHandler,
  mxCodec,
  mxRectangleShape,
  mxPoint,
  mxClipboard,
  mxCellTracker,
  mxUndoManager,
  mxClient,
  mxEdgeHandler,
  mxPerimeter,
  mxOutline,
  mxEventObject,
  mxGeometry,
  mxCell,
  mxShape,
  mxConstraintHandler,
  mxEllipse,
  // mxTriangle,
  mxFastOrganicLayout,
  mxHierarchicalLayout,
  mxCompactTreeLayout,
  mxMorphing,
  mxCircleLayout,
  mxSvgCanvas2D,
  mxImageExport,
  mxConnectionConstraint,
  mxPolyline,
  mxVertexHandler,
  mxRectangle,
  mxImageShape,
  ActiveXObject,
} = mxgraph;
const path = require('path');
// 配置自定义事件
Object.assign(mxEvent, {
  NORMAL_TYPE_CLICKED: 'NORMAL_TYPE_CLICKED',
});
// 导入流程图案例数据
const xmlData1 = path.join('data/data1.xml');
const xmlData2 = path.join('data/data2.xml');
const xmlData3 = path.join('data/data3.xml');
export default {
  computed: {
    // 组元素
    grouptoolItems: () => grouptoolItems,
    toolbarItems: () => toolbarItems,
    generalToolbarItems: () => generalToolbarItems,
  },
  components: {
    styleSelect,
    uploadData,
  },
  data () {
    return {
      graph: null,
      editor: null,
      palettes: {},
      graphXml: '',
      activeNames: ['1', '2', '3'],
      isNode: false,
      cellStyle: '',
      graphX: 100,
      graphY: 10,
      undoMng: '',
      textValue: '',
      uploadDataVisible: false,
      isOutputXml: false,
      edgeStyle: 'orthogonalEdgeStyle',
      outline: '',
      idSeed: 0,
      normalIdSeed: 0,
      // configOrder: 0,
      jsonData: {
        cells: {
          nodes: [],
          groups: []
        },
        edges: []
      },
      showBackground: true,
      currentNormalType: {},
      normalTypePosition: {
        top: '0',
        left: '0',
      },
    };
  },
  methods: {
    // 创建画布并进行初始化
    createGraph () {
      // 创建graph
      // 方式一：直接构建graph实例
      // this.graph = new mxGraph(this.$refs.container)
      this.editor = new mxEditor();
      this.graph = this.editor.graph;
      this.editor.setGraphContainer(this.$refs.container);
      // 配置默认全局样式
      this.configureStylesheet(this.graph);
      // 去锯齿效果
      mxRectangleShape.prototype.crisp = true;
      // 定义全局变量，如。用于触发建立新的连接的活动区域的最小尺寸（以像素为单位），该部分（100％）的小区区域被用于触发新的连接，以及一些窗口和“下拉菜菜单选择
      mxConstants.MIN_HOTSPOT_SIZE = 16;
      mxConstants.DEFAULT_HOTSPOT = 1;

      //cell创建支持传入html
      this.graph.setHtmlLabels(true);
      this.graph.setDropEnabled(true);
      this.graph.setSplitEnabled(false);
      // 有效的拖放操作，则返回true
      this.graph.isValidDropTarget = (target, cells, evt) => {
        if (this.graph.isSplitEnabled() && this.graph.isSplitTarget(target, cells, evt)) {
          console.log('拖放');
          return true;
        }
      };

      // 禁用分组的收缩功能 方法1:
      // this.graph.isCellFoldable = (cell) => {
      //   return false
      // }
      // 禁用分组的收缩功能 方法2:
      this.graph.foldingEnabled = false;
      // 组内的子元素是否随父元素变化而变化
      this.graph.recursiveResize = true;

      // 设置连线时的预览路径及样式
      this.graph.connectionHandler.createEdgeState = () => {
        // 设置预览的连接线,第三个参数为连接成功后连接线上的label
        var edge = this.graph.createEdge(null, null, null, null, null);
        // edge.style += `;edgeStyle=orthogonalEdgeStyle `
        return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
      };

      // 是否开启旋转
      mxVertexHandler.prototype.livePreview = true;
      mxVertexHandler.prototype.rotationEnabled = true;
      // 设置旋转按钮
      mxVertexHandler.prototype.createSizerShape = function (bounds, index, fillColor) {
        if (this.handleImage != null) {
          bounds = new mxRectangle(bounds.x, bounds.y, this.handleImage.width, this.handleImage.height);
          let shape = new mxImageShape(bounds, this.handleImage.src);
          // Allows HTML rendering of the images
          shape.preserveImageAspect = true;
          return shape;
        } else if (index == mxEvent.ROTATION_HANDLE) {
          // return new mxDoubleEllipse(bounds, fillColor || mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR);
          // 设置旋转图标
          bounds = new mxRectangle(bounds.x, bounds.y, 15, 15);
          let rotationShape = new mxImageShape(bounds, 'icon/rotate.svg');
          rotationShape.preserveImageAspect = true;
          return rotationShape;
        } else {
          return new mxRectangleShape(bounds, fillColor || mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR);
        }
      };
      // 设置旋转角度（解决默认旋转180度的bug）
      mxVertexHandler.prototype.getRotationHandlePosition = function () {
        let padding = this.getHandlePadding();
        return new mxPoint(this.bounds.x + this.bounds.width - this.rotationHandleVSpacing + padding.x / 2, this.bounds.y + this.rotationHandleVSpacing - padding.y / 2);
      };
      // 设置默认组
      // groupBorderSize 设置图形和它的子元素的边距
      let group = new mxCell('Group', new mxGeometry(), 'group;fontColor=white;');
      group.setVertex(true);
      // 设置组可连接
      group.setConnectable(true);
      // group.setCellsResizable(false);
      this.editor.defaultGroup = group;
      this.editor.groupBorderSize = 80;

      // 是否根元素
      this.graph.isValidRoot = function (cell) {
        return this.isValidDropTarget(cell);
      };

      // // 是否可以被选中
      // this.graph.isCellSelectable = function (cell) {
      //   return !this.isCellLocked(cell);
      // };

      // 返回元素
      this.graph.getLabel = function (cell) {
        var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
        if (this.isCellLocked(cell)) {
          // 如元素被锁定 返回空标签
          return '';
        } else if (this.isCellCollapsed(cell)) {
          var index = tmp.indexOf('</h1>');
          if (index > 0) {
            tmp = tmp.substring(0, index + 5);
          }
        }
        return tmp;
      };

      // 目标是否有效
      this.graph.isValidDropTarget = function (cell) {
        // console.log(cell, cells, evt);
        return this.isSwimlane(cell);
      };

      // 是否根元素
      this.graph.isValidRoot = function (cell) {
        return this.isValidDropTarget(cell);
      };

      // 是否可以被选中
      this.graph.isCellSelectable(true)

      // 允许重复连接
      this.graph.setMultigraph(true);
      // 禁止连接线晃动(即连线两端必须在节点上)
      this.graph.setAllowDanglingEdges(false);
      // 允许连线的目标和源是同一元素
      this.graph.setAllowLoops(false);
      //边被拖动时始终保持连接
      this.graph.setDisconnectOnMove(false);
      // 选择基本元素开启
      this.graph.setEnabled(true);
      // 动态改变样式
      this.graph.getView().updateStyle = true;
      // 鼠标框选
      this.rubberBand = new mxRubberband(this.graph);
      this.graph.setResizeContainer(true);

      // 开启画布平滑移动
      // this.graph.setPanning(true);
      this.graph.setPanning = true;
      // 开启提示
      this.graph.setTooltips(false);
      // 允许连线
      this.graph.setConnectable(true);
      //移动元素的步长
      this.graph.gridSize = 3;
      this.graph.setBorder(160);

      // 开启方块上的文字编辑功能
      this.graph.setCellsEditable(true);
      // 禁止双击修改内容(弃用)
      // this.graph.dblClick = (evt, cell) => {
      //   var model = this.graph.getModel();
      //   if (model.isVertex(cell)) {
      //     return false;
      //   }
      // };
      // Disables synchronous loading of resources
      // 可用于禁用HTML的泳道标签，避免冲突(返回false即可)
      // 判断是否为泳道标签
      // this.graph.isHtmlLabel = function (cell) {
      //   return this.isSwimlane(cell);
      // };
      //准备撤销还原功能
      // 构造具有给定历史记录大小的新撤消管理器。默认100步
      this.undoMng = new mxUndoManager();
      let listener = (sender, evt) => {
        this.undoMng.undoableEditHappened(evt.getProperty('edit'));

      };
      this.graph.getModel().addListener(mxEvent.UNDO, listener);
      this.graph.getView().addListener(mxEvent.UNDO, listener);
      // 创建缩略图
      this.outline = new mxOutline(this.graph, this.$refs.styleSelect.$refs.showMap);
      if ((this.graph) == null || (this.graph) == undefined) {
        return;
      }
      // 从value中获取显示的内容(如果节点的value为空则显示节点的title)
      this.graph.convertValueToString = (cell) => {
        return cell['value'] ? cell['value'] : cell['title'];
      };
    },

    // 新增自定义节点
    addCustomCell (dropCell, toolItem, x, y) {
      // 判断是否是放在组元素上
      const drop = !R.isNil(dropCell);
      // drop && this.$message.info(`${toolItem['title']}节点进入${dropCell.title}`);
      const { width, height } = toolItem;
      const styleObj = toolItem.style;
      const style = Object.keys(styleObj).map((attr) => `${attr}=${styleObj[attr]}`).join(';');
      const realX = drop ? x - dropCell.geometry.x : x;
      const realY = drop ? y - dropCell.geometry.y : y;
      const parent = drop ? dropCell : this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      try {
        let vertex = this.graph.insertVertex(parent, null, null, realX - (width / 2), realY - (height / 2), width, height, style + ';whiteSpace=wrap;word-break=break-all');
        vertex.title = toolItem['title'];
        vertex.id = toolItem['id'] + '-' + toolItem['idSeed'];
        // 添加完节点后自动添加顺序图标
        this.addPoint(vertex, toolItem['idSeed']);
        toolItem['idSeed']++;
        vertex['isGroup'] = toolItem['id'].includes('group') ? true : false
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
    // 布局
    graphLayout (animate, layoutType) {
      this.graph.getModel().beginUpdate()
      try {
        if (layoutType === 'randomLayout') {
          // 随机布局
          mxFastOrganicLayout.prototype.minDistanceLimit = 100
          // eslint-disable-next-line new-cap
          var layout = new mxFastOrganicLayout(this.graph)
          layout.forceConstant = 500
          layout.execute(this.graph.getDefaultParent())
        } else if (layoutType === 'hierarchicalLayout') {
          // 分层布局
          mxHierarchicalLayout.prototype.intraCellSpacing = 300
          mxHierarchicalLayout.prototype.fineTuning = false
          mxHierarchicalLayout.prototype.traverseAncestors = false
          mxHierarchicalLayout.prototype.resizeParent = true
          // 无关系实体之间的间距
          mxHierarchicalLayout.prototype.interHierarchySpacing = 200
          // 层级之间的距离
          mxHierarchicalLayout.prototype.interRankCellSpacing = 800

          // eslint-disable-next-line new-cap
          var hierarchicallayout = new mxHierarchicalLayout(this.graph, mxConstants.DIRECTION_NORTH)
          hierarchicallayout.execute(this.graph.getDefaultParent())
        } else if (layoutType === 'compactTreeLayout') {
          // 树形布局
          // eslint-disable-next-line new-cap
          var compactTreelayout = new mxCompactTreeLayout(this.graph)
          compactTreelayout.execute(this.graph.getDefaultParent())
        } else if (layoutType === 'circleLayout') {
          // 圆形布局
          // eslint-disable-next-line new-cap
          var circleLayout = new mxCircleLayout(this.graph, 400)
          circleLayout.execute(this.graph.getDefaultParent())
        }
      } finally {
        // 是否开启布局动画
        if (animate) {
          // eslint-disable-next-line new-cap
          var morph = new mxMorphing(this.graph, 20, 7.7, 40)
          morph.addListener(mxEvent.DONE, () => {
            this.graph.getModel().endUpdate()
          })
          morph.startAnimation()
        } else {
          this.graph.getModel().endUpdate()
        }
      }
    },
    // 初始化基础节点
    initGeneralTool () {
      var generalToolbarDomArray = this.$refs.generalToolItems;
      // 判断是否为数组且数组是否为空
      if (!(generalToolbarDomArray instanceof Array || generalToolbarDomArray.length <= 0)) {
        return;
      }
      generalToolbarDomArray.forEach((dom, domIndex) => {
        var toolItem = this.generalToolbarItems[domIndex];
        var { width, height } = toolItem;
        var itemClass = (toolItem.class);
        //新增基础节点
        var generalDropHandler = (graph, evt, dropCell, x, y) => {
          const drop = !R.isNil(dropCell);
          // drop && this.$message.info(`${toolItem['title']}节点进入${dropCell.title}`);
          const realX = drop ? x - dropCell.geometry.x : x;
          const realY = drop ? y - dropCell.geometry.y : y;
          const { width, height } = toolItem;
          const styleObj = toolItem.style;
          const style = Object.keys(styleObj).map((attr) => `${attr}=${styleObj[attr]}`).join(';');
          const parent = drop ? dropCell : this.graph.getDefaultParent();
          this.graph.getModel().beginUpdate();
          try {
            let vertex = this.graph.insertVertex(parent, null, null, realX - (width / 2), realY - (height / 2), width, height, style + ';whiteSpace=wrap;word-break=break-all');
            vertex.title = `<div style='word-break:break-all'>` + toolItem['title'] + '</div>';
            vertex.dropAble = toolItem['dropAble'];
            vertex.id = toolItem['id'] + '-' + toolItem['idSeed'];
            toolItem['idSeed']++;
            vertex['isGroup'] = toolItem['id'].includes('group') ? true : false

          } finally {
            this.graph.getModel().endUpdate();
          }
        };
        // 设置节点被拖拽时的样式(预览)
        var generalcreateDragPreview = () => {
          var elt = document.createElement('div');
          elt.style.width = `${width}px`;
          elt.style.height = `${height}px`;
          elt.style.transform = 'translate(-50%,-50%)';
          elt.className = itemClass;
          return elt;
        };
        // 允许拖拽
        let ds = mxUtils.makeDraggable(dom, this.graph, generalDropHandler, generalcreateDragPreview(), 0, 0, true, true);
        ds.setGuidesEnabled(true);
      });
    },

    // 初始化自定义图标
    initCustomToolbar () {
      // 获取工具栏中的自定义节点的dom
      var toolbarDomArray = this.$refs.toolItem;
      if (!(toolbarDomArray instanceof Array) || toolbarDomArray.length <= 0) {
        return;
      }

      toolbarDomArray.forEach((dom, domIndex) => {
        var toolItem = this.toolbarItems[domIndex];
        var { width, height } = toolItem;
        var image = toolItem.style.image;
        //定义拖拽后的回调函数
        var dropHandler = (graph, evt, cell, x, y) => {
          this.addCustomCell(cell, toolItem, x, y);
        };
        // 设置节点被拖拽时的样式(预览)
        var createDragPreview = () => {
          var elt = document.createElement('div');
          elt.style.border = '2px dotted black';
          elt.style.width = `${width}px`;
          elt.style.height = `${height}px`;
          elt.style.backgroundImage = `url(${image})`;
          elt.style.backgroundSize = `contain`;
          elt.style.transform = 'translate(-50%,-50%)';
          elt.style.backgroundRepeat = 'no-repeat';
          return elt;
        };
        // 允许拖拽
        let ds = mxUtils.makeDraggable(dom, this.graph, dropHandler, createDragPreview(), 0, 0, false, true, true);
        ds.setGuidesEnabled(true);
      });
    },
    // 拖拽组元素
    makeToolbarDraggable () {
      const grouptoolItem = this.$refs.grouptoolItem;
      if (!(grouptoolItem instanceof Array)) {
        return;
      }
      grouptoolItem.forEach((item, index) => {
        const toolItem = this.grouptoolItems[index];
        const { height, width } = toolItem;
        // 创建拖拽时的预览图形
        const createDragPreview = () => {
          const elt = document.createElement('div');
          elt.style.border = '2px dotted black';
          elt.style.width = `${width}px`;
          elt.style.height = `${height}px`;
          elt.style.transform = 'translate(-50%,-50%)';
          elt.className = toolItem.class;
          return elt;
        };
        // drop的处理函数
        const dropHandler = (graph, evt, cell, x, y) => {
          this.instanceCell(cell, toolItem, x, y);
        };
        // 获取拖放的对象
        const getDropTarget = (graph, x, y) => {
          const cell = graph.getCellAt(x, y);
          return R.propOr(null, 'dropAble', cell) ? cell : null;
        };
        mxUtils.makeDraggable(item, this.graph, dropHandler, createDragPreview(index), 0, 0, false, true, true, getDropTarget);
      });
    },
    // 新增组元素
    instanceCell (dropCell, toolItem, x, y) {
      const drop = !R.isNil(dropCell);
      // drop && this.$message.info(`${toolItem['title']}节点入${dropCell.title}`);
      const styleObj = toolItem['style'] || {};
      const style = Object.keys(styleObj).map((key) => `${key}=${styleObj[key]}`).join(';');
      const realX = drop ? x - dropCell.geometry.x : x;
      const realY = drop ? y - dropCell.geometry.y : y;
      const { height, width } = toolItem;
      const parent = drop ? dropCell : this.graph.getDefaultParent();
      const isHtml = Object.is('1', toolItem['style']['html']);
      const tmpIndex = Date.now();
      const value = isHtml ? toolItem['html'](tmpIndex) : null;
      this.graph.getModel().beginUpdate();
      try {
        const vertex = this.graph.insertVertex(parent, null, value, realX - (width / 2), realY - (height / 2), width, height, style + ';whiteSpace=wrap;word-break=break-all');
        vertex['title'] = toolItem['title'];
        vertex['dropAble'] = toolItem['dropAble'];
        vertex['id'] = toolItem['id'];
        vertex['isGroup'] = toolItem['id'].includes('group') ? true : false
        // 设置连接点
        // cell['constraints'] = toolItem['constraints']
        this.$nextTick(() => {
          const createdCallback = toolItem['created'];
          if (createdCallback instanceof Function) {
            createdCallback(this.graph, vertex, tmpIndex);
          }
        });
      } finally {
        this.graph.getModel().endUpdate();
      }
    },

    // 基础配置函数
    eventCenter () {

      // 给graph添加事件
      // 监听自定义事件
      this.graph.addListener(mxEvent.NORMAL_TYPE_CLICKED, (sender, evt) => {
        let cell = evt.properties.cell.state.cell;
        this.currentNormalType = cell;
      });
      // this.graph.addListener(mxEvent.VERTEX_START_MOVE, (sender, evt) => {
      //   console.log('VERTEX_START_MOVE', sender, evt);
      // });
      // 画布平移事件
      this.graph.addListener(mxEvent.PAN, (sender, evt) => {
        console.log('画布平移了', sender, evt);
      });
      // 新增节点事件
      this.graph.addListener(mxEvent.ADD_CELLS, (sender, evt) => {
        this.$nextTick(() => {
          let addCell = evt.properties.cells[0];
          if (addCell.vertex) {
            // 判断是否为组节点
            if (addCell.isGroup) {
              this.$message.info('添加了一个组');
              let groupObj = _.pick(addCell, ['id', 'title', 'parent', 'geometry']);
              this.jsonData['cells']['groups'].push(groupObj);
            } else {
              let nodeObj = _.pick(addCell, ['id', 'title', 'parent', 'geometry']);
              this.jsonData['cells']['nodes'].push(nodeObj);
              this.$message.info('添加了一个节点');
            }
            //  向jsonData中更新数据
          } else if (addCell.edge) {
            console.log(addCell)
            let lineObj = _.pick(addCell, ['id', 'edge', 'source', 'parent', 'geometry', 'value']);
            this.jsonData['edges'].push(lineObj);
            this.$message.info('添加了一条线');
          }
        })
      });

      //拖动节点的事件
      this.graph.addListener(mxEvent.CELLS_MOVED, (sender, evt) => {
        // console.log(this.graph, 'graph');
        let cellsName = [];
        this.$nextTick(() => {
          evt.properties.cells.forEach(item => {
            item.parent.id.includes('group') && cellsName.push(item.title);
          });
          evt.properties.cells[0].parent.id !== '1' && this.$message.info(`${[...cellsName]}节点进入${evt.properties.cells[0].parent.title}`);
        });
      });
      // 删除节点触发事件
      this.graph.addListener(mxEvent.CELLS_REMOVED, (sender, evt) => {
        this.$nextTick(() => {
          let removeCells = evt.properties.cells;
          console.log(removeCells, 'removeCells')
          removeCells.forEach(item => {
            // 拿每一个cellId在jsonData中进行遍历,并进行移除
            if (item.vertex) {
              // 判断是否为组节点
              if (item.isGroup) {
                this.$message.info(`移除了${item.id}组`);
                this.jsonData['cells']['groups'].splice(this.jsonData['cells']['groups'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
              } else {
                this.$message.info(`移除${item.id}节点`);
                this.jsonData['cells']['nodes'].splice(this.jsonData['cells']['nodes'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
              }
            } else if (item.edge) {
              this.$message.info('移除了线');
              this.jsonData['edges'].splice(this.jsonData['edges'].findIndex(jsonItem => { return jsonItem.id === item.id }), 1)
            }
            // this.jsonData.forEach(item)
          });
        });
      });

    },
    // 配置鼠标事件
    configMouseEvent () {
      this.graph.addMouseListener(
        {
          currentState: null,
          previousStyle: null,

          mouseDown: (sender, evt) => {
            if (!evt.state) {
              console.log('点击了画布');
              return;
            } else if (evt.state.cell.edge) {
              console.log('点击了连线');
              return;
            }

            const cell = evt.state.cell;
            let clickNormalType = false;
            if (cell.style !== undefined) {
              clickNormalType = cell.style.includes('normalType');
            }
            if (clickNormalType) {
              // 使用 mxGraph 事件中心，注册自定义事件
              this.graph.fireEvent(new mxEventObject(mxEvent.NORMAL_TYPE_CLICKED, 'cell', evt));
            } else {
              return;
            }
          },

          mouseMove: (sender, me) => {
            // console.log('mouseMove')
            this.graphX = Math.ceil(me.graphX);
            this.graphY = Math.ceil(me.graphY);
          },

          mouseUp: (sender, evt) => {
            console.log('mouseUp');
            if (evt.sourceState === undefined) {
              return false;
            } else {
              var cell = evt.sourceState.cell;
              // console.log(cell);
              //  var cell = this.graph.getSelectionCell();
              if (cell) {
                this.textValue = cell['value'] ? cell['value'] : cell['title'];
                console.log(this.textValue, 'cellValue')
                console.log('cellValuie', cell)
                cell.vertex ? this.isNode = true : this.isNode = false;
                var getcellStyle = cell.getStyle() ? cell.getStyle() : null;
                if (!this.isNode) {
                  // 点击的不是节点
                  getcellStyle ? this.edgeStyle = getcellStyle : 'orthogonalEdgeStyle';
                } else {
                  // 点击的是节点
                  // console.log('getcellStyle', getcellStyle);
                  if (getcellStyle) {
                    var arr = getcellStyle.split(';');
                    // arr.pop()
                    var styleObject = {};
                    arr.forEach(item => {
                      styleObject[item.split('=')[0]] = item.split('=')[1];
                    });
                    this.cellStyle = styleObject;
                  }
                }
              } else {
                this.$message.error('请选择节点或者连线');
              }
            }
          },
        });
    },
    //配置键盘事件
    configKeyEvent () {
      // 启动盘事件键
      this.keyHandler = new mxKeyHandler(this.graph);
      // 键盘按下删除键绑定事件
      this.keyHandler.bindKey(46, () => {
        this.deleteNode()
      });
      this.keyHandler.bindControlKey(65, () => {
        this.graph.selectAll();
      });
      this.keyHandler.bindControlKey(67, () => {
        this.copy();
      });
      this.keyHandler.bindControlKey(88, () => {
        this.cut();
      });
      this.keyHandler.bindControlKey(86, () => {
        this.paste();
      });
      this.keyHandler.bindControlKey(89, () => {
        this.goForward();
      });
      this.keyHandler.bindControlKey(90, () => {
        this.goBack();
      });
    },
    //配置右键菜单栏
    configMenu () {
      // 禁用浏览器默认的右键菜单栏
      mxEvent.disableContextMenu(this.$refs.container);
      this.graph.popupMenuHandler.factoryMethod = (menu) => {
        menu.addItem('输出所有节点', null, () => {
          Object.values(this.graph.getModel().cells).forEach((cell) => {
            console.log(cell);
          });
        });

        menu.addSeparator();
        menu.addItem('复制', null, () => {
          this.copy();
        });

        menu.addItem('粘贴', null, () => {
          this.paste();
        });

        menu.addSeparator();
        menu.addItem('组合', null, () => {
          this.enGroup();
        });

        menu.addItem('分解', null, () => {
          this.graph.ungroupCells(this.graph.getSelectionCells());
        });
        menu.addSeparator();
        menu.addItem('流动的线(测试)', null, () => {
          let cell = this.graph.getSelectionCell();
          if (cell && cell.edge) {
            let state = this.graph.view.getState(cell);
            state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
            state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
            state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray');
            state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'flow');
          } else {
            this.$message.error('请选择连线');
          }
        });
        menu.addSeparator();
        // menu.addItem('配置完成', null, () => {
        //   let cell = this.graph.getSelectionCell().children[0];
        //   let cellArrayStyle = cell.getStyle().split(';');
        //   cellArrayStyle.shift();
        //   let cellStyle = {};
        //   cellArrayStyle.forEach(item => {
        //     cellStyle[item.split('=')[0]] = item.split('=')[1];
        //   });
        //   let cellImage = cellStyle['image'].replace('unselect', 'selected');
        //   this.graph.setCellStyles(mxConstants.STYLE_IMAGE, cellImage, [cell]);
        //   this.graph.refresh(cell);
        // });
        menu.addItem('全选', null, () => {
          this.graph.selectAll();
        });
        menu.addItem('选中所有节点', null, () => {
          this.graph.selectCells(true, false);
        });
        menu.addItem('选中所有连线', null, () => {
          this.graph.selectCells(false, true);
        });
        // 分割符号
        menu.addSeparator();
        menu.addItem('修改样式', null, () => {
          var cell = this.graph.getSelectionCell();
          if (cell) {
            cell.vertex ? this.isNode = true : this.isNode = false;
            var getcellStyle = cell.getStyle() ? cell.getStyle() : '';
            if (getcellStyle) {
              var arr = getcellStyle.split(';');
              //弹出最后一个空样式
              // arr.pop()
              var styleObject = {};
              arr.forEach((item => {
                styleObject[item.split('=')[0]] = item.split('=')[1];
              }));
              this.cellStyle = styleObject;
              // if (this.isNode) {

              // }
            }
          } else {
            this.$message.error('请选择节点或者连线');
          }
        });
      };
    },
    //  配置全局样式
    configureStylesheet (graph) {
      // 设置节点的文字可被移动
      graph.vertexLabelsMovable = false;
      // 设置鼠标悬浮至节点或者连线时高亮显示的颜色
      new mxCellTracker(graph, '#409eff');
      var style = new Object();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;
      // style[mxConstants.STYLE_SPACING_TOP] = 6;
      style[mxConstants.STYLE_SPACING_LEFT] = 5;
      // style[mxConstants.STYLE_GRADIENTCOLOR] = 'skyblue'; // 渐变颜色
      style[mxConstants.STYLE_STROKECOLOR] = '#5d65df';   // 线条颜色
      style[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
      style[mxConstants.STYLE_FONTCOLOR] = '#1d258f';     // 字体颜色
      style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';    // 字体风格
      style[mxConstants.STYLE_FONTSIZE] = '12';           // 字体大小
      style[mxConstants.STYLE_FONTSTYLE] = '0';           // 斜体字
      style[mxConstants.WORD_WRAP] = 'normal';             // 文字换行    word-break: break-all;
      style[mxConstants['word-break']] = 'break-all';             // 文字换行
      style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';             // 文字换行
      style[mxConstants.STYLE_ROUNDED] = false;             // 圆角
      style[mxConstants.STYLE_IMAGE_WIDTH] = '28';        // 图片宽度
      style[mxConstants.STYLE_IMAGE_HEIGHT] = '28';       // 图片高度
      style[mxConstants.STYLE_OPACITY] = '100';            // 节点透明度(不包含字体)
      graph.getStylesheet().putDefaultVertexStyle(style);

      style = new Object();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
      style[mxConstants.STYLE_FILLCOLOR] = '#409eff';
      // style[mxConstants.STYLE_GRADIENTCOLOR] = '#409eff';
      style[mxConstants.STYLE_STROKECOLOR] = '#409eff';
      style[mxConstants.STYLE_FONTCOLOR] = '#000000';
      style[mxConstants.STYLE_ROUNDED] = false;
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
      // 获取全局Edge、label样式
      var edgeStyle = this.graph.getStylesheet().getDefaultEdgeStyle();
      let labelStyle = this.graph.getStylesheet().getDefaultVertexStyle();
      // labelStyle[mxConstants.STYLE_WHITE_SPACE] = 'wrap'; //自动换行
      console.log(labelStyle, 'labelStyle')
      // 设置连线风格(设置为正交折线)
      edgeStyle['edgeStyle'] = 'orthogonalEdgeStyle';

      // 选中 cell/edge 后的伸缩大小的点/拖动连线位置的点的颜色
      // style[mxConstants.STYLE_WHITE_SPACE] = 'wrap'

      mxConstants.HANDLE_FILLCOLOR = '#409eff';
      mxConstants.HANDLE_STROKECOLOR = 'transparent';
      mxConstants.STYLE_ANCHOR_POINT_DIRECTION = 'anchorPointDirection';
      mxConstants.STYLE_STYLE_ROTATION = 'rotation';
      // 是否缩放网格
      mxGraphHandler.prototype.scaleGrid = true;
      mxGraph.prototype.pageBreakDashed = false;

      // 指定是否应使用其他单元格对齐当前所选内容的右侧，中间或左侧。默认为false。
      mxGraphHandler.prototype.guidesEnabled = true;
      mxGraphHandler.prototype.htmlPreview = false;
      mxGraphHandler.prototype.allowLivePreview = true;
      // 指定预览形状的颜色。默认为黑色。
      mxGraphHandler.prototype.previewColor = "red"
      // 应该使用实时预览的最大单元数。默认值为0，表示没有实时预览。
      mxGraphHandler.prototype.maxLivePreview = 100;

      // Alt 按下禁用导航线
      mxGraphHandler.prototype.useGuidesForEvent = function (me) {
        return !mxEvent.isAltDown(me.getEvent());
      };
      // 导航线颜色
      mxConstants.GUIDE_COLOR = '#1a73e8';
      // 导航线宽度
      mxConstants.GUIDE_STROKEWIDTH = 2;
      // 导航线自动连接到目标
      mxEdgeHandler.prototype.snapToTerminals = true;
      // 选中线条时的虚线颜色
      mxConstants.EDGE_SELECTION_COLOR = '#99ccff';
      // mxConstants.DEFAULT_INVALID_COLOR = 'yellow';
      // mxConstants.INVALID_CONNECT_TARGET_COLOR = 'yellow';
      // 连线(未满足连线要求)时预览的颜色
      mxConstants.INVALID_COLOR = '#99ccff';
      // 连线(满足连线要求)时预览的颜色
      mxConstants.VALID_COLOR = 'blue';
      // mxConstants.GUIDE_COLOR = 'yellow';
      // mxConstants.LOCKED_HANDLE_FILLCOLOR = '#24bcab';
      // 选中节点时选中框的颜色
      mxConstants.VERTEX_SELECTION_COLOR = '#99ccff';

      //折叠-/展开+图标大小
      // mxGraph.prototype.collapsedImage = new mxImage('images/collapsed.gif', 15, 15);
      // mxGraph.prototype.expandedImage = new mxImage('images/expanded.gif', 15, 15);

      // 配置节点中心的连接图标(注釋掉即可指定錨點連接到另一個節點的錨點上)
      mxConnectionHandler.prototype.connectImage = new mxImage('./icon/connectionpoint.png', 14, 14);
      // 显示中心端口图标
      graph.connectionHandler.targetConnectImage = false;
      // 是否开启浮动自动连接
      this.graph.connectionHandler.isConnectableCell = function () {
        return true;
      };
      // 设定锚点的位置、可编辑状态和图标
      mxConstraintHandler.prototype.pointImage = new mxImage('icon/dot.svg', 10, 10)
      // 设置锚点上的高亮颜色
      mxConstraintHandler.prototype.createHighlightShape = function () {
        return new mxEllipse(null, '#409eff99', '#409eff99', 15)
      }

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
    },

    //设置连线样式
    changeDashed (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_DASHED, value, [...cell]);
      // this.graph.refresh(cell)
    },

    //设置线条颜色样式
    changeStrokeColor (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, value, [...cell]);
      // this.graph.refresh(cell)
    },

    //设置线条宽度
    changeStrokeWidth (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, [...cell]);
      // this.graph.refresh(cell)
    },

    //设置字体大小
    changeFontSize (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_FONTSIZE, value, [...cell]);
      // this.graph.refresh(cell)
    },

    //设置字体颜色
    changeFontColor (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, value, [...cell]);
      // this.graph.refresh(cell)
    },

    //设置线条说明的背景颜色
    changeLabelBackgroundColor (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, value, [...cell]);
      // this.graph.refresh(cell)
    },

    changeFillColor (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, value, [...cell]);
    },

    changeShadow (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_SHADOW, +(value), [...cell]);
    },

    changeFontStyle (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_FONTSTYLE, value, [...cell]);
    },

    changeNodeimage (value) {
      var cell = this.graph.getSelectionCells();
      this.graph.setCellStyles(mxConstants.STYLE_IMAGE, value, [...cell]);
    },

    // 删除节点
    deleteNode () {
      var cells = this.graph.getSelectionCells();
      this.graph.removeCells([...cells]);
    },

    // 修改连线样式
    edgeChange (value) {
      try {
        var cell = this.graph.getSelectionCells();
        this.graph.setCellStyles('edgeStyle', value, [...cell]);
        let style = cell[0].style;
        let valStr = cell[0].value;
        this.graph.removeCells(cell);
        let parent = this.graph.getDefaultParent();
        let v1 = '';
        let v2 = '';
        // 获取ID单元
        parent['children'].forEach(item => {
          item['id'] === cell[0].source.id ? v1 = item : false;
          item['id'] === cell[0].target.id ? v2 = item : false;
        });
        this.graph.getModel().beginUpdate();
        this.graph.insertEdge(parent, null, valStr, v1, v2, style);
        this.graph.getModel().endUpdate();
        this.$message.success('切换连线样式成功');
      } catch (error) {
        this.$message.error('切换连线样式失败');
        console.log(error);
      }
    },

    // 修改节点文本内容
    textValueChange (value) {
      var cell = this.graph.getSelectionCells();
      console.log(value, '节点文本新内容', this.graph);
      this.graph.cellLabelChanged(cell[0], value)
    },
    changeConfigOrder (val) {
      // 获取当前的normalType元素,并更新他的title
      this.currentNormalType.title = val.newConfigOrder;
      // 修改指定cell的背景图片
      this.graph.setCellStyles(mxConstants.STYLE_IMAGE, `./images/order/unselect-${val.newConfigOrder}.png`, [this.currentNormalType]);
      this.graph.refresh(this.currentNormalType);
    },

    //复制
    copy () {
      let selectionCells = this.graph.getSelectionCells();
      mxClipboard.copy(this.graph, selectionCells);
    },
    //粘贴
    paste () {
      mxClipboard.paste(this.graph);
    },
    //剪切
    cut () {
      var cells = [];
      cells = this.graph.getSelectionCells();
      mxClipboard.cut(this.graph, cells);
    },
    // 前进
    goForward () {
      this.undoMng.redo();
    },

    // 撤退
    goBack () {
      this.undoMng.undo();
    },

    // 放大
    zoomIn () {
      this.graph.zoomIn();
    },

    // 缩小
    zoomOut () {
      this.graph.zoomOut();
    },

    // 等比例缩放
    autoSize () {
      // 方法一
      // this.editor.execute('actualSize');
      //方法二：
      this.graph.zoomActual();
      this.graph.fit();//自适应
      this.graph.center();//将画布放到容器中间
    },

    // 生成图片
    showImage () {
      this.editor.execute('show');//直接页面跳转,并以svg流程图
      // 下载svg流程图
      console.log('this.gtaph', this.graph)
      const svg = this.exportModelSvg();
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = url;
      link.download = 'model.svg';
      link.click();
    },

    exportModelSvg () {
      let scale = this.graph.view.scale;
      let bounds = this.graph.getGraphBounds();
      let border = 10;

      // Prepares SVG document that holds the output
      let svgDoc = mxUtils.createXmlDocument();
      let root = (svgDoc.createElementNS != null) ?
        svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');

      if (root.style != null) {
        root.style.backgroundColor = '#FFFFFF';
      } else {
        root.setAttribute('style', 'background-color:#FFFFFF');
      }

      if (svgDoc.createElementNS == null) {
        root.setAttribute('xmlns', mxConstants.NS_SVG);
      }
      let width = Math.ceil(bounds.width * scale / scale + 2 * border);
      let height = Math.ceil(bounds.height * scale / scale + 2 * border);
      root.setAttribute('class', 'svg-container');
      root.setAttribute('width', width + 'px');
      root.setAttribute('height', height + 'px');
      root.setAttribute('viewBox', "0 0 " + width + " " + height);
      root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
      root.setAttribute('version', '1.1');

      // Adds group for anti-aliasing via transform
      let group = (svgDoc.createElementNS != null) ?
        svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
      group.setAttribute('transform', 'translate(0.5,0.5)');
      root.appendChild(group);
      svgDoc.appendChild(root);

      // Renders graph. Offset will be multiplied with state's scale when painting state.
      let svgCanvas = new mxSvgCanvas2D(group);
      svgCanvas.translate(Math.floor(border / scale - bounds.x), Math.floor(border / scale - bounds.y));
      svgCanvas.scale(scale);

      let imgExport = new mxImageExport();
      imgExport.drawState(this.graph.getView().getState(this.graph.model.root), svgCanvas);

      //let xml = encodeURIComponent(mxUtils.getXml(root)); //no need
      let xml = mxUtils.getXml(root);
      return xml;

    },
    enGroup () {
      this.editor.graph.setSelectionCell(this.editor.groupCells());
      this.$message.success('组合成功');
      // this.editor.groupCells(null, 0, this.graph.getSelectionCells());
    },

    // 开始导入xml文件
    inPutXml () {
      this.isOutputXml = false;
      this.uploadDataVisible = true;
      this.graphXml = '';
    },

    // 导入xml文件后更新视图
    uploadPaintFlow (newvalue) {
      this.graph.selectAll();
      this.graph.removeCells(this.graph.getSelectionCells());
      setTimeout(() => {
        this.decode(newvalue, this.graph);
        this.$message.success('渲染成功');
      }, 1000);
    },

    createXmlDom (str) {
      if (document.all) { //判断浏览器是否是IE
        var xmlDom = new ActiveXObject('Microsoft.XMLDOM');
        xmlDom.loadXML(str);
        return xmlDom;
      } else {
        return (new DOMParser()).parseFromString(str, 'text/xml');
      }
    },

    // 渲染xml流程图
    decode (graphXml, graph) {
      this.graph.getModel().beginUpdate();
      try {
        // 渲染流程图 方法一:
        // const xmlDocument = mxUtils.parseXml(graphXml)
        // const decoder = new mxCodec(xmlDocument)
        // decoder.decode(xmlDocument.documentElement, graph.getModel())
        // 渲染流程图 方法二:
        var xmlDoc = this.createXmlDom(graphXml);
        var node = xmlDoc.documentElement;
        var dec = new mxCodec(node.ownerDocument);
        dec.decode(node, graph.getModel());
      } finally {
        this.graph.getModel().endUpdate();
        // 渲染完成调整位置
        this.autoSize()
      }
    },

    // 导出xml文件
    outPutXml () {
      this.isOutputXml = true;
      this.uploadDataVisible = true;
      this.graphXml = this.encode(this.graph);
    },

    // 导出xml数据
    encode (graph) {
      const encoder = new mxCodec();
      const result = encoder.encode(graph.getModel());
      return mxUtils.getPrettyXml(result);
    },
    //添加箭头组函数
    addStencilPalette (title, name, file) {
      let req = mxUtils.load(file);
      let root = req.getDocumentElement();
      let shape = root.firstChild;
      this.$set(this.palettes, name, { title, name, shapes: [] });
      while (shape != null) {
        if (shape.nodeType === mxConstants.NODETYPE_ELEMENT) {
          const shapeName = shape.getAttribute('name');
          const h = shape.getAttribute('h');
          // shape.querySelector('path').setAttribute('fill', 'transparent')
          const w = shape.getAttribute('w');
          mxStencilRegistry.addStencil(shapeName, new mxStencil(shape));
          this.palettes[name]['shapes'].push({
            name: shape.getAttribute('name'),
            width: w / 2,
            height: h / 2,
            fill: 'transparent',
          });
        }
        shape = shape.nextSibling;
      }
    },

    // 初始化箭头节点组的工具栏
    initStencilToolBar () {
      var stencilDomArray = this.$refs.stencilDragItem;
      if (!(stencilDomArray instanceof Array) || stencilDomArray.length <= 0 || (this.graph == null || this.graph == undefined)) {
        return;
      }
      stencilDomArray.forEach(dom => {
        const shapeIndex = dom.getAttribute('shapeIndex');
        const paletteIndex = dom.getAttribute('paletteIndex');
        const shapeItem = Object.values(this.palettes)[paletteIndex]['shapes'][shapeIndex];
        const shapeWidth = shapeItem['width'];
        const shapeHeight = shapeItem['height'];
        const stencilDragHandler = (graph, evt, cell, x, y) => {
          this.instanceGraph(this.graph, shapeItem, x, y, shapeWidth, shapeHeight, cell);
        };
        var createDragPreview = () => {
          //设置鼠标拖拽箭头节点时的样式
          const elt = document.createElement('div');
          elt.style.border = '2px dotted black';
          elt.style.cursor = 'pointer';
          elt.style.width = `${shapeWidth}px`;
          elt.style.height = `${shapeHeight}px`;
          elt.style.transform = 'translate(-50%,-50%)';
          return elt;
        };
        dom.appendChild(this.createThumb(shapeItem, shapeWidth, shapeHeight));
        mxUtils.makeDraggable(dom, this.graph, stencilDragHandler, createDragPreview(), 0, 0, false, true);
      });
    },

    // 新增箭头节点
    instanceGraph (graph, shapeItem, x, y, width, height, dropCell) {
      const drop = !R.isNil(dropCell);
      // drop && this.$message.info(`箭头节点入${dropCell.title}`);
      const realX = drop ? x - dropCell.geometry.x : x;
      const realY = drop ? y - dropCell.geometry.y : y;
      const parent = drop ? dropCell : graph.getDefaultParent();
      graph.getModel().beginUpdate();
      try {
        let cell = graph.insertVertex(parent, null, null, realX - (width / 2), realY - (height / 2), width, height, `shape=${shapeItem['name']};whiteSpace=wrap;word-break=break-all;`);
        cell['isGroup'] = false
        cell.customer = true;
      } finally {
        graph.getModel().endUpdate();
      }
    },

    // 拖拽结束时新增的箭头节点
    createThumb (item, width, height) {
      const tmpGraph = new mxGraph(document.createElement('div'));
      const thumbBorder = 2;
      tmpGraph.labelsVisible = false;
      tmpGraph.view.scaleAndTranslate(1, 0, 0);
      this.instanceGraph(tmpGraph, item, 0, 0, width, height);
      const bounds = tmpGraph.getGraphBounds();
      const s = Math.floor(Math.min((width - 2 * thumbBorder) / bounds.width, (height - 2 * thumbBorder) / bounds.height) * 100) / 100;

      tmpGraph.view.scaleAndTranslate(s, Math.floor((width - bounds.width * s) / 2 / s - bounds.x), Math.floor((height - bounds.height * s) / 2 / s - bounds.y));

      const node = tmpGraph.view.getCanvas().ownerSVGElement.cloneNode(true);

      node.style.position = 'relative';
      node.style.overflow = 'hidden';
      node.style.cursor = 'pointer';
      node.style.width = `${width}px`;
      node.style.height = `${height}px`;
      node.style.left = `${thumbBorder}px`;
      node.style.top = `${thumbBorder}px`;
      node.style.display = 'inline-block';
      return node;
    },

    // 添加序号图标
    addPoint (cell, number) {
      const normalTypeVertex = this.graph.insertVertex(cell, null, null,
        null, null, 30, 30,
        `port;normalType;orderPoint=true;fillColor=none;image=./images/order/unselect-${number}.png;spacingLeft=-45px;spacingBottom=-45px`);
      // 固定序号图标的位置.不随节点变大而改变位置
      // normalTypeVertex.geometry.offset = new mxPoint(45, 45);
      // 序号图标无法连接
      // normalTypeVertex.setConnectable(false);
      normalTypeVertex.id = (cell.id).split('-')[0] + `-unselect-${number}`;
      normalTypeVertex.value = number;
      normalTypeVertex.geometry.relative = true;
      // 将新增的图标鼠标悬浮换成手势的图案
      // const oldGetCursorForCell = mxGraph.prototype.getCursorForCell;
      // this.graph.getCursorForCell = function (...args) {
      //   const [cell] = args;
      //   if (cell.edge || cell.style == undefined) {
      //     return;
      //   }
      //   return cell.style.includes('normalType') ?
      //     'pointer' :
      //     oldGetCursorForCell.apply(this, args);
      // };
    },

    // 加载案例流程图
    loadFlowCase (index) {
      this.$confirm('请确认您当前流程图数据已保存至本地 ?', '提示', {
        confirmButtonText: '我已保存',
        cancelButtonText: '取消加载',
        type: 'warning',
      }).then(() => {
        let loadData = '';
        switch (index) {
          case 1:
            loadData = xmlData1;
            break;
          case 2:
            loadData = xmlData2;
            break;
          case 3:
            loadData = xmlData3;
            break;
        }
        console.log('loadData', loadData);
        let newXml = mxUtils.load(loadData).request.response;
        this.graph.selectAll();
        this.graph.removeCells(this.graph.getSelectionCells());
        setTimeout(() => {
          this.decode(newXml, this.graph);

          this.$message.success('加载流程图案例成功');
        }, 1000);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消加载流程图案例',
        });
      });
    },
    handleScroll (e) {
      if (e.wheelDelta === 120) {
        this.graph.zoomIn()
      } else {
        this.graph.zoomOut()
      }
    },
  },
  mounted () {
    // 检测浏览器兼容性
    if (!mxClient.isBrowserSupported()) {
      this.$message.error('当前浏览器不支持拓扑图功能，请更换浏览器访问，建议使用Chrome浏览器访问!');
    } else {
      // Overridden to define per-shape connection points
      mxGraph.prototype.getAllConnectionConstraints = function (terminal) {
        if (terminal != null && terminal.shape != null) {
          if (terminal.shape.stencil != null) {
            if (terminal.shape.stencil.constraints != null) {
              return terminal.shape.stencil.constraints;
            }
          } else if (terminal.shape.constraints != null) {
            return terminal.shape.constraints;
          }
        }
        return null;
      };
      this.createGraph();
      this.eventCenter();
      this.configMouseEvent();
      this.configMenu();
      this.addStencilPalette('箭头组', 'arrows', path.join('./stencil/arrows.xml'));
      this.$nextTick(() => {
        this.initCustomToolbar();
        this.initGeneralTool();
        this.initStencilToolBar();
        this.makeToolbarDraggable();
        this.configKeyEvent();
      });
    }
    document.getElementById('graphContainer').addEventListener('mousewheel', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  destroyed () {
    document.getElementById('graphContainer').removeEventListener('mousewheel', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    this.graph.destroy();
  },
}
</script>
<style lang="less">
@import "./general-shap.css";
.customToolbarContainer {
  width: 100%;
  height: 100vh;
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
    width: 10%;
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
      .custom-node {
        display: inline-block;
        margin: 10px 0 0 0;
        width: 28%;
        height: 60px;
        border: 1px solid #000000;
        padding: 5px 0;
        img {
          // width: 34px;
          height: 34px;
        }
      }
      .rectangle-node {
        width: 45%;
        height: 40px;
        margin: 10px 0 0 0;
        background-color: #ffff;
        position: relative;
        border: 1px solid #000000;
        padding: none;
        img {
          position: absolute;
          left: 0;
          // width: none;
          height: 35px;
          top: 50%;
          transform: translateY(-50%);
        }
        .node-title {
          position: absolute;
          left: 60%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
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
  }
  .graphContainer-background {
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
  .right-bar {
    width: 260px;
    background-color: #fff;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid #ededed;
    padding-top: 50px;
    box-sizing: border-box;
    .json-viewer {
      overflow: auto;
      position: absolute;
      top: 35%;
      width: 260px;
      height: 70%;
      bottom: 0;
      right: 0;
    }
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
  .stencil-node {
    width: 20%;
  }
  svg g path {
    stroke: #515151;
    -webkit-text-fill-color: #515151;
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
.group-item {
  cursor: pointer;
  height: 40px;
  margin: 5px 0;
  line-height: 40px;
  width: 80%;
  display: inline-block;
  border: 1px solid #eeee;
}
</style>
