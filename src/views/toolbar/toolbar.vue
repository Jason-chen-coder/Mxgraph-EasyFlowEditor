<template>
  <div ref="container" class="graphContainer">
    <div ref="tbContainer" class="tbContainer"></div>
  </div>
</template>

<script>
import {
  mxToolbar as MxToolbar,
  mxGraphModel as MxGraphModel,
  mxGraph as MxGraph,
  mxCell as MxCell,
  mxGeometry as MxGeometry,
  mxEvent as MxEvent,
  mxUtils as MxUtils,
  mxRubberband as MxRubberband,
  mxKeyHandler as MxKeyHandler,
} from 'mxgraph-js'

export default {
  data () {
    return {
      model: null,
      graph: null
    }
  },
  methods: {
    // 当工具栏图标被拖动后执行此方法
    addToolbarItem (graph, toolbar, prototype, image) {
      // 如果鼠标点击连接图标并移动到另外一个元素时，就建立两个图标的连接
      let funct = function (graph, evt, cell, x, y) {
        graph.stopEditing(false)
        let vertex = graph.getModel().cloneCell(prototype)
        // 鼠标松开后节点元素的坐标
        vertex.geometry.x = x
        vertex.geometry.y = y
        // 向graph中添加节点
        graph.addCell(vertex)
        graph.setSelectionCell(vertex)
      }
      // 创建拖动时的预览图标
      let img = toolbar.addMode(null, image, function (evt, cell) {
        var pt = this.graph.getPointForEvent(evt)
        funct(graph, evt, cell, pt.x, pt.y)
      })
      // 总是在所有的浏览器中的任何其他侦听器之前，首先调用此侦听器。
      MxEvent.addListener(img, 'mousedown', function (evt) {
        if (img.enabled === false) {
          MxEvent.consume(evt)
        }
      })
      // 使图标可以拖动
      MxUtils.makeDraggable(img, graph, funct)
      return img
    }
  },
  mounted () {

    // 准备一个div作为toolbar的容器
    let tbContainer = this.$refs.tbContainer

    // 创建一个mxToolbar
    let toolbar = new MxToolbar(tbContainer)

    toolbar.enabled = false
    // 创建一个div作为graph的容器
    this.model = new MxGraphModel()
    this.graph = new MxGraph(this.$refs.container, this.model)

    // 在图中，是否启用新的连接
    this.graph.setConnectable(true)

    // 重复连接 
    this.graph.setMultigraph(false)

    // 禁用浏览器默认的右键菜单栏 
    MxEvent.disableContextMenu(this.$refs.container);

    // 允许移动 Vertex 的 Label 
    this.graph.setVertexLabelsMovable(true);

    // 允许连线的目标和源是同一元素 
    this.graph.setAllowLoops(true);

    // 鼠标框选 
    this.rubberBand = new MxRubberband(this.graph)

    // 启动盘事件键
    this.keyHandler = new MxKeyHandler(this.graph)

    // 键盘按下删除键绑定事件
    this.keyHandler.bindKey(46, () => {
      const cells = this.graph.getSelectionCells() || []
      this.graph.removeCells(cells, true)
    })

    let addVertex = (icon, w, h, style) => {
      let vertex = new MxCell(null, new MxGeometry(0, 0, w, h), style)

      vertex.setVertex(true)
      let img = this.addToolbarItem(this.graph, toolbar, vertex, icon)
      img.enabled = true

      this.graph.getSelectionModel().addListener(MxEvent.CHANGE, () => {
        let tmp = this.graph.isSelectionEmpty()

        MxUtils.setOpacity(img, (tmp) ? 1000 : 20)
        img.enabled = tmp
      })
    }
    addVertex('./mxgraph/images/rectangle.gif', 100, 40, '')
    addVertex('./mxgraph/images/rounded.gif', 100, 40, 'shape=rounded')
    addVertex('./mxgraph/images/ellipse.gif', 40, 40, 'shape=ellipse')
    addVertex('./mxgraph/images/rhombus.gif', 40, 40, 'shape=rhombus')
    addVertex('./mxgraph/images/triangle.gif', 40, 40, 'shape=triangle')
    addVertex('./mxgraph/images/cylinder.gif', 40, 40, 'shape=cylinder')
    addVertex('./mxgraph/images/actor.gif', 40, 40, 'shape=actor')
    addVertex('./mxgraph/images/actor.gif', 40, 40, 'shape=actor')
  }
}
</script>
<style lang="less">
.graphContainer {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/grid.gif");
  background-color: #fff;
  .tbContainer {
    position: absolute;
    overflow: hidden;
    background-color: #efefef;
    padding: 2px;
    left: 0px;
    top: 0px;
    width: 40px;
    bottom: 0px;
    background-color: #fff;
    text-align: center;
    img {
      width: 25px;
      margin: 10px;
    }
  }
  .mxRubberband {
    background-color: skyblue;
    position: absolute;
  }
  // .mxToolbarMode {
  //   top: 300px !important;
  //   left: 200px !important;
  // }
}
</style>
