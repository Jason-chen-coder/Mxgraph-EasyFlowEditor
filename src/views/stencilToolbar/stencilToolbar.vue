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
import {
  mxUtils as MxUtils,
  mxGraph as MxGraph,
  mxEvent as MxEvent,
  mxKeyHandler as MxKeyHandler,
  mxRubberband as MxRubberBand,
  mxConstants as MxConstants,
  mxStencilRegistry as MxStencilRegistry,
  mxStencil as MxStencil,
  mxCodec as MxCodec,
  mxGraphModel as MxGraphModel,
  mxGeometry as MxGeometry
} from 'mxgraph-js'

const path = require('path')

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
      this.graph = new MxGraph(this.$refs.container)
      this.$refs.container.style.background = 'url("./mxgraph/images/grid.gif")'
    },
    encode (graph) {
      const encoder = new MxCodec()
      const result = encoder.encode(graph.getModel())

      return MxUtils.getPrettyXml(result)
    },
    decode (graphXml, graph) {
      window['mxGraphModel'] = MxGraphModel
      window['mxGeometry'] = MxGeometry

      const xmlDocument = MxUtils.parseXml(graphXml)
      const decoder = new MxCodec(xmlDocument)
      const node = xmlDocument.documentElement

      decoder.decode(node, graph.getModel())
    },
    initGraph () {
      if (this.graph == null || this.graph == undefined) {
        return
      }
      // 禁用浏览器默认的右键菜单栏 
      MxEvent.disableContextMenu(this.$refs.container);

      //开启鼠标框选
      this.rubberBand = new MxRubberBand(this.graph)
      this.graph.setCellsEditable(false) // 不可修改
      // 绑定删除键事件
      this.keyHandler = new MxKeyHandler(this.graph)
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
      let req = MxUtils.load(file)
      let root = req.getDocumentElement()
      let shape = root.firstChild
      this.$set(this.palettes, name, { title, name, shapes: [] })

      while (shape != null) {
        if (shape.nodeType === MxConstants.NODETYPE_ELEMENT) {
          const shapeName = shape.getAttribute('name')
          const w = shape.getAttribute('w')
          const h = shape.getAttribute('h')

          MxStencilRegistry.addStencil(shapeName, new MxStencil(shape))
          this.palettes[name]['shapes'].push({ name: shape.getAttribute('name'), width: w / 2, height: h / 2 })
        }

        shape = shape.nextSibling
      }
    },
    createThumb (item, width, height) {
      const tmpGraph = new MxGraph(document.createElement('div'))
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
    initToolBar () {
      const domArray = this.$refs.dragItem

      if (!(domArray instanceof Array) || domArray.length <= 0 || (this.graph == null || this.graph == undefined)) {
        return
      }
      domArray.forEach(dom => {
        const shapeIndex = dom.getAttribute('shapeIndex')
        const paletteIndex = dom.getAttribute('paletteIndex')
        const shapeItem = Object.values(this.palettes)[paletteIndex]['shapes'][shapeIndex]
        const width = shapeItem['width']
        const height = shapeItem['height']
        const dragHandler = (graph, evt, cell, x, y) => {
          this.instanceGraph(this.graph, shapeItem, x, y, width, height)
        }
        const createDragPreview = () => {
          //设置鼠标拖拽节点时的样式
          const elt = document.createElement('div')
          elt.style.border = '2px dotted black'
          elt.style.width = `${width}px`
          elt.style.height = `${height}px`
          return elt
        }
        dom.appendChild(this.createThumb(shapeItem, width, height))

        MxUtils.makeDraggable(dom, this.graph, dragHandler, createDragPreview(), 0, 0, false, true)
      })
    },
    instanceGraph (graph, shapeItem, x, y, width, height) {
      const parent = graph.getDefaultParent()

      graph.getModel().beginUpdate()
      try {
        let vertex = graph.insertVertex(parent, null, null, x, y, width, height, `shape=${shapeItem['name']};`)

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
      this.initToolBar()
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
