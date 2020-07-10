<template>
  <div class="stencilToolbarContainer">
    <div class="toolbarContainer">
      <el-collapse>
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
            ref="dragItem"
            :key="shapeIndex"
          ></a>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="graphContainer" tabindex="1" ref="container"></div>
  </div>
</template>

<script>
const path = require('path');
import mxgraph from "../../graph/index";
const {
  mxUtils,
  mxGraph,
  mxEvent,
  mxKeyHandler,
  mxRubberband,
  mxConstants,
  mxStencilRegistry,
  mxStencil,
  mxCodec,
  mxGraphModel,
  mxGeometry,
} = mxgraph
export default {
  name: 'stencilToolbar',
  data () {
    return {
      graph: null,
      keyHandler: null,
      palettes: {},
      graphXml: ''
    }
  },
  methods: {
    // 创建Graph画布
    createGraph () {
      this.graph = new mxGraph(this.$refs.container)
      this.$refs.container.style.background = 'url("./mxgraph/images/grid.gif")'
    },
    encode (graph) {
      const encoder = new mxCodec()
      const result = encoder.encode(graph.getModel())

      return mxUtils.getPrettyXml(result)
    },
    decode (graphXml, graph) {
      window['mxGraphModel'] = mxGraphModel
      window['mxGeometry'] = mxGeometry

      const xmlDocument = mxUtils.parseXml(graphXml)
      const decoder = new mxCodec(xmlDocument)
      const node = xmlDocument.documentElement

      decoder.decode(node, graph.getModel())
    },
    initGraph () {
      if (this.graph == null || this.graph == undefined) {
        return
      }
      // 禁用浏览器默认的右键菜单栏 
      mxEvent.disableContextMenu(this.$refs.container);

      //开启鼠标框选
      this.rubberBand = new mxRubberband(this.graph)
      this.graph.setCellsEditable(false) // 不可修改
      // 绑定删除键事件
      this.keyHandler = new mxKeyHandler(this.graph)
      this.keyHandler.bindKey(46, () => {
        const cells = this.graph.getSelectionCells() || []
        this.graph.removeCells(cells, true)
      })

      // 给鼠标右键添加选项和功能
      this.graph.popupMenuHandler.factoryMethod = (menu) => {
        menu.addItem('导出', null, () => {
          // this.graphXml = this.encode(this.graph)
          // this.$alert(this.graphXml)
          // this.$message('导出成功')
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
      }
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
    initStencilToolBar () {
      var domArray = this.$refs.dragItem

      if (!(domArray instanceof Array) || domArray.length <= 0 || (this.graph == null || this.graph == undefined)) {
        return
      }
      domArray.forEach(dom => {
        const shapeIndex = dom.getAttribute('shapeIndex')
        const paletteIndex = dom.getAttribute('paletteIndex')
        const shapeItem = Object.values(this.palettes)[paletteIndex]['shapes'][shapeIndex]
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
    }
  },
  mounted () {
    this.createGraph()
    this.initGraph()
    this.addStencilPalette('箭头', 'arrows', path.join('./arrows.xml'))
    this.$nextTick(() => {
      this.initStencilToolBar()
    })
  }
}
</script>

<style lang="less">
.stencilToolbarContainer {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .toolbarContainer {
    flex: 2;
    font-size: 20px;
    background: #efefef;
    text-align: center;
    overflow: auto;
  }

  .graphContainer {
    outline: none;
    position: relative;
    flex: 10;
    background-color: #fff !important;
  }
  .shapgroud {
    .el-collapse-item__content {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .mxRubberband {
    background-color: skyblue;
    position: absolute;
  }
}
</style>
