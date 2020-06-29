<template>
  <div class="customToolbarContainer">
    <div class="toolbarContainer">
      <el-collapse>
        <el-collapse-item>
          <template slot="title" class="collaspetitle">自定义节点</template>
          <!-- 将所有自定义图标渲染出来 -->
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
        <!-- 模板工具栏 -->
        <!-- <el-collapse-item
          v-for="(palette, paletteIndex) in Object.values(palettes)"
          :title="palette['title']"
          :name="palette['name']"
          :key="paletteIndex"
          class="shapgroud"
        >
        <a
            v-for="(_, shapeIndex) in palette['shapes']"
            :shapeIndex="shapeIndex"
            :paletteIndex="paletteIndex"
            ref="dragItem"
            :key="shapeIndex"
          ></a>
        </el-collapse-item>-->
      </el-collapse>
    </div>
    <!-- 画布中的顶部工具栏 -->
    <div class="top-tools">
      <el-select class="select-edgetype" v-model="edgeValue" @change="edgeChange" placeholder="请选择">
        <el-option
          v-for="item in edgeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="graphContainer" ref="container"></div>
  </div>
</template>

<script>
// 导入自定义图标数组
import { toolbarItems } from './toolbar'
import {
  mxEvent as MxEvent,
  mxGraph as MxGraph,
  mxUtils as MxUtils,
  mxRubberband as MxRubberband,
  mxKeyHandler as MxKeyHandler,
  mxGraphHandler as MxGraphHandler,
  mxConstants as MxConstants,
  // mxStencilRegistry as MxStencilRegistry,
  mxImage as MxImage,
  mxConstraintHandler as MxConstraintHandler,
  mxCellState as MxCellState,
  mxCodec as MxCodec,
  // mxEdgeStyle as MxEdgeStyle,
  mxShape as MxShape,
  mxConnectionConstraint as MxConnectionConstraint,
  mxPoint as MxPoint,
  mxPolyline as MxPolyline,
  mxCellTracker as MxCellTracker,
  // mxGraphModel as MxGraphModel,
  // mxGeometry as MxGeometry
} from 'mxgraph-js'
// const path = require('path')
export default {
  computed: {
    toolbarItems: () => toolbarItems
  },
  data () {
    return {
      graph: null,
      palettes: {},
      graphXml: '',
      edgeOptions: [
        { label: "直线", value: 'none' },
        { label: "折线", value: "ElbowConnector" },
        { label: '折线2', value: "orthogonalEdgeStyle" },
        { label: "小折线", value: "Loop" }],
      edgeValue: "default"
    }
  },
  methods: {
    // 创建Graph画布
    createGraph () {

      this.graph = new MxGraph(this.$refs.container)

      // 设置连线时的预览路径及样式
      this.graph.connectionHandler.createEdgeState = () => {
        var edge = this.graph.createEdge(null, null, null, null, null);
        return new MxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
      };

      // Specifies the default edge style
      this.graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';
      this.graph.getStylesheet().getDefaultEdgeStyle()[MxConstants.STYLE_ROUNDED] = true
      // Enables rubberband selection
      new MxRubberband(this.graph);
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
      // 监听双击事件
      this.graph.addListener(MxEvent.DOUBLE_CLICK, (graph, evt) => {
        var cell = evt['properties'].cell ? evt['properties'].cell : []
        console.info(cell) // 在控制台输出双击的cell
        this.$message.success("当前节点信息为:" + (cell.value ? cell.value : cell.title))
      })
      // 监听单击事件
      this.graph.addListener(MxEvent.CLICK, function (sender, evt) {
        // var cell = evt['properties'].cell ? evt['properties'].cell : []
        // var edgeStyle = evt.getStylesheet().getDefaultEdgeStyle()
        // console.log("edgeStyle", edgeStyle)

        // var overlays = this.graph.getCellOverlays(cell);
        // console.log("单击了节点cell", cell)
        // console.log("单击了节点sender", sender)
      });
      var that = this;
      // 给graph添加事件
      this.graph.addMouseListener(
        {
          currentState: null,
          previousStyle: null,
          mouseDown: function (sender, me) {
            console.log("mouseDown")
            if (this.currentState != null) {
              this.dragLeave(me.getEvent(), this.currentState);
              this.currentState = null;
            }
          },
          mouseMove: function (sender, me) {

            console.log("mouseMove", me.getState(), this.currentState)
            if (this.currentState != null && me.getState() == this.currentState) {
              return;
            }

            var tmp = that.graph.view.getState(me.getCell());
            console.log("tmp", tmp)
            // Ignores everything but vertices
            if (that.graph.isMouseDown || (tmp != null && !
              that.graph.getModel().isVertex(tmp.cell))) {
              tmp = null;
            }

            if (tmp != this.currentState) {
              if (this.currentState != null) {
                this.dragLeave(me.getEvent(), this.currentState);
              }

              this.currentState = tmp;

              if (this.currentState != null) {
                this.dragEnter(me.getEvent(), this.currentState);
              }
            }
          },
          mouseUp: (sender, me) => { },
          dragEnter: (evt, state) => {
            if (state != null) {
              this.previousStyle = state.style;
              state.style = MxUtils.clone(state.style);
              this.updateStyle(state, true);
              state.shape.apply(state);
              state.shape.redraw();

              if (state.text != null) {
                state.text.apply(state);
                state.text.redraw();
              }
            }
          },
          dragLeave: (evt, state) => {
            if (state != null) {
              state.style = this.previousStyle;
              this.updateStyle(state, false);
              state.shape.apply(state);
              state.shape.redraw();

              if (state.text != null) {
                state.text.apply(state);
                state.text.redraw();
              }
            }
          }
        });


    },
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
        MxUtils.makeDraggable(dom, this.graph, dropHandler, createDragPreview(), 0, 0, false, true)
      })
    },
    // 基础配置函数
    configOption () {
      // 鼠标框选 
      this.rubberBand = new MxRubberband(this.graph)

      // 启动盘事件键
      this.keyHandler = new MxKeyHandler(this.graph)

      // 键盘按下删除键绑定事件
      this.keyHandler.bindKey(46, () => {
        const cells = this.graph.getSelectionCells() || []
        this.graph.removeCells(cells, true)
      })

      // 禁用浏览器默认的右键菜单栏 
      MxEvent.disableContextMenu(this.$refs.container)
      // 自定义右键菜单栏
      this.graph.popupMenuHandler.factoryMethod = (menu) => {
        menu.addItem('导出', null, () => {
          this.graphXml = this.encode(this.graph)
          this.$alert(this.graphXml)
          this.$message('导出成功')
        })
        // 添加分割符号
        menu.addSeparator()
        menu.addItem('导入', null, () => {

          // this.$confirm('为了使导入的效果明显，会先删除所有现有的cell，并在1秒后执行导入！！！', '提示')
          //   .then(() => {
          //     this.graph.selectAll()
          //     this.graph.removeCells(this.graph.getSelectionCells())
          //     setTimeout(() => {
          //       this.decode(this.graphXml, this.graph)
          //       this.$message('导入成功')
          //     }, 1000)
          //   })
          //   .catch(() => {

          //   })

        })
        var submenu1 = menu.addItem('Submenu 1', null, null);
        // 添加分割符号
        menu.addSeparator()
        // 设置二级菜单
        menu.addItem('Subitem 1', './images/close.gif', () => {
          this.$message('Subitem 1');
        }, submenu1);
        menu.addItem('Subitem 1', './images/close.gif', () => {
          this.$message('Subitem 2');
        }, submenu1);
      }
      // 启用工具提示，新连接平滑移动  
      this.graph.setPanning(true);
      // 开启提示
      this.graph.setTooltips(true);
      // 允许连线
      this.graph.setConnectable(true)
      // 设置鼠标悬浮至节点时高亮显示的颜色
      var highlight = new MxCellTracker(this.graph, '#409eff');
      // 开启方块上的文字编辑功能
      this.graph.setCellsEditable(true)
      // 启用对齐线帮助定位
      MxGraphHandler.prototype.guidesEnabled = true;
      // 选择基本元素开启
      this.graph.setEnabled(true);



    },
    encode (graph) {
      const encoder = new MxCodec()
      const result = encoder.encode(graph.getModel())
      return MxUtils.getPrettyXml(result)
    },
    edgeChange () {
      // 自定义连线样式
      var edgeStyle = this.graph.getStylesheet().getDefaultEdgeStyle()
      edgeStyle['edgeStyle'] = this.edgeValue;
      //连线拐弯处是否使用圆角
      edgeStyle[MxConstants.STYLE_ROUNDED] = true
      //连线样式可设置为ElbowConnector,SideToSide,Loop
      // edgeStyle[MxConstants.STYLE_EDGE] = MxEdgeStyle[this.edgeValue]
      this.graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = this.edgeValue;

      this.graph.alternateEdgeStyle = 'elbow=vertical'
      this.$message.success("切换连线样式成功")
    },
    //当鼠标悬浮至节点时,给该节点添加样式
    updateStyle (state, hover) {
      if (hover) {
        state.style[MxConstants.STYLE_FILLCOLOR] = 'rgba(64, 158, 255,0.5)';
      }

      // state.style[MxConstants.STYLE_ROUNDED] = (hover) ? '1' : '0';
      // state.style[MxConstants.STYLE_STROKEWIDTH] = (hover) ? '4' : '1';
      // state.style[MxConstants.STYLE_FONTSTYLE] = (hover) ? MxConstants.FONT_BOLD : '0';
    }
    // 添加模板工具栏元素
    // addStencilPalette (title, name, file) {
    //   let req = MxUtils.load(file)
    //   let root = req.getDocumentElement()
    //   let shape = root.firstChild
    //   this.$set(this.palettes, name, { title, name, shapes: [] })

    //   while (shape != null) {
    //     if (shape.nodeType === MxConstants.NODETYPE_ELEMENT) {
    //       const shapeName = shape.getAttribute('name')
    //       const w = shape.getAttribute('w')
    //       const h = shape.getAttribute('h')

    //       MxStencilRegistry.addStencil(shapeName, new MxStencil(shape))
    //       this.palettes[name]['shapes'].push({ name: shape.getAttribute('name'), width: w / 2, height: h / 2 })
    //     }

    //     shape = shape.nextSibling
    //   }
    // },
    // 初始化模板工具栏
    // initStencilToolBar () {
    //   var domArray = this.$refs.dragItem

    //   if (!(domArray instanceof Array) || domArray.length <= 0 || (this.graph == null || this.graph == undefined)) {
    //     return
    //   }
    //   domArray.forEach(dom => {
    //     var shapeIndex = dom.getAttribute('shapeIndex')
    //     var paletteIndex = dom.getAttribute('paletteIndex')
    //     var shapeItem = Object.values(this.palettes)[paletteIndex]['shapes'][shapeIndex]
    //     var width = shapeItem['width']
    //     var height = shapeItem['height']
    //     var dragHandler = (graph, evt, cell, x, y) => {
    //       this.instanceGraph(this.graph, shapeItem, x, y, width, height)
    //     }
    //     var createDragPreview = () => {
    //       //设置鼠标拖拽节点时的样式
    //       var elt = document.createElement('div')
    //       elt.style.border = '2px dotted black'
    //       elt.style.width = `${width}px`
    //       elt.style.height = `${height}px`
    //       return elt
    //     }
    //     dom.appendChild(this.createThumb(shapeItem, width, height))

    //     MxUtils.makeDraggable(dom, this.graph, dragHandler, createDragPreview(), 0, 0, false, true)
    //   })
    // }
  },
  mounted () {
    // Overridden to define per-shape connection points
    MxGraph.prototype.getAllConnectionConstraints = function (terminal, source) {
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
    // Replaces the port image
    MxConstraintHandler.prototype.pointImage = new MxImage('./icon/dot.gif', 10, 10);
    MxShape.prototype.constraints = [new MxConnectionConstraint(new MxPoint(0.25, 0), true),
    new MxConnectionConstraint(new MxPoint(0.5, 0), true),
    new MxConnectionConstraint(new MxPoint(0.75, 0), true),
    new MxConnectionConstraint(new MxPoint(0, 0.25), true),
    new MxConnectionConstraint(new MxPoint(0, 0.5), true),
    new MxConnectionConstraint(new MxPoint(0, 0.75), true),
    new MxConnectionConstraint(new MxPoint(1, 0.25), true),
    new MxConnectionConstraint(new MxPoint(1, 0.5), true),
    new MxConnectionConstraint(new MxPoint(1, 0.75), true),
    new MxConnectionConstraint(new MxPoint(0.25, 1), true),
    new MxConnectionConstraint(new MxPoint(0.5, 1), true),
    new MxConnectionConstraint(new MxPoint(0.75, 1), true)];
    // Edges have no connection points
    MxPolyline.prototype.constraints = null;

    this.createGraph()
    this.initGraph()
    this.configOption()
    // this.addStencilPalette('箭头', 'arrows', path.join('./arrows.xml'))
    this.$nextTick(() => {
      // this.initStencilToolBar()
      this.initToolbar()

    })
  }
}
</script>

<style lang="less">
.customToolbarContainer {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .toolbarContainer {
    flex: 2;
    font-size: 20px;
    background: #efefef;
    text-align: center;
    background-color: #fff;
    width: 200px;
    position: relative;
  }

  .graphContainer {
    line-height: 100%;
    position: relative;
    background-color: #fff !important;
    flex: 10;
    background-image: url("../../assets/grid.gif");
  }
  .top-tools {
    position: absolute;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    top: 0;
    left: 16.6%;
    padding-left: 20px;
    width: 83.3%;
    z-index: 1000;
    background-color: #fff;
    height: 49px;
    border-bottom: 1px solid #ededed;
    box-shadow: 0px 2px 8px -4px #c4c7c1;
    .select-edgetype {
      width: 100px;
    }
  }
  .mxRubberband {
    background-color: rgb(58, 58, 207);
    position: absolute;
  }
  .el-collapse-item__header {
    padding-left: 30px;
  }
}
</style>
