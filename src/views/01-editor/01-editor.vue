 
<template>
  <div>
    <div class="topbar">
      <div class="topbar-left">
        <el-select
          v-model="requestInfo.provinceId"
          placeholder="请选择省份"
          filterable
          size="small"
          clearable
          style="width: 200px;"
          @change="proChange"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.areaId"
            :value="item.areaId"
            :label="item.name"
          />
        </el-select>
        <el-select
          v-model="requestInfo.cityId"
          placeholder="请选择城市"
          filterable
          size="small"
          clearable
          style="width: 200px;"
          @change="cityChange"
        >
          <el-option
            v-for="item in cityList"
            :key="item.areaId"
            :value="item.areaId"
            :label="item.name"
          />
        </el-select>
        <el-select
          v-model="requestInfo.communityId"
          placeholder="请选择小区"
          filterable
          size="small"
          style="width: 200px;"
          clearable
          @change="communityChange"
        >
          <el-option
            v-for="item in communityList"
            :key="item.id"
            :value="item.id"
            :label="item.cmtName"
          />
        </el-select>
        <el-select
          v-model="requestInfo.garageId"
          placeholder="请选择车库"
          filterable
          style="width: 200px;"
          size="small"
          clearable
          @change="garageChange"
        >
          <el-option v-for="item in garageList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
        <el-button size="small" type="primary" @click.stop="importBgImg">上传车库图</el-button>
        <el-button size="small" type="primary" @click.stop="save">保存</el-button>
      </div>

      <div class="topbar-right">
        <input ref="importInput" class="hide" hidden type="file" @change="readFile" />
        <el-button size="small" type="primary" plain @click.stop="exportFile">导出xml文件</el-button>
        <el-color-picker v-model="color" style="margin: 0 10px;" @change="colorChange" />
        <el-button type="primary" size="small" @click.stop="importFile">导入xml文件</el-button>
      </div>
    </div>

    <el-dialog
      :visible.sync="uploadVisible"
      :close-on-click-modal="false"
      title="提示"
      width="30%"
      style="text-align: center"
    >
      <el-upload
        ref="uploadImg"
        :action="uploadUrl"
        :show-file-list="false"
        :on-error="importError"
        :on-success="uploadImgSuccess"
        :headers="headers"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处,或
          <em>点击上传</em>
        </div>
      </el-upload>
    </el-dialog>
    <div class="m_graph_container" tabindex>
      <div id="container" ref="container" />
    </div>
    <div id="sidebar" class="sidebar">
      <el-collapse>
        <el-collapse-item title="基本" name="基本">
          <div id="toolbar-basic" class="toolbar-basic" />
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item
          v-for="(palette, paletteIndex) in Object.values(palettes)"
          :key="paletteIndex"
          :title="palette['title']"
          :name="palette['name']"
        >
          <a
            v-for="(_, shapeIndex) in palette['shapes']"
            ref="dragItem"
            :key="shapeIndex"
            :shapeIndex="shapeIndex"
            :paletteIndex="paletteIndex"
          />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
 
<script>
import {  mxToolbar,
  mxGraphModel,
  mxGraph,
  mxCell,
  mxGeometry,
  mxEvent,
  mxUtils,
  mxCodec,
  mxUndoManager,
  mxKeyHandler,
  mxClipboard,
  mxImage,
  mxCellTracker,
  mxStencil,
  mxStencilRegistry,
  mxConstants} from 'mxgraph'

// import FileSaver from 'file-saver'
// import { update, info } from '@/api/region/garage'
//我自己的接口
// import { provinceList, cityList, communityList, garageList } from '@/api/public'

const path = require('path')

export default {
  name: 'Editor',
  data () {
    return {
      model: null,
      graph: null,
      toolbar: null,
      color: '',
      provinceList: [],
      cityList: [],
      communityList: [],
      garageList: [],
      requestInfo: {},
      garageEdit: {},
      uploadUrl: process.env.VUE_APP_BASE_API + 'api-web/ossUpload/uploadFile',
      excelFlag: false,
      uploadVisible: false,
      sidebar: null,
      palettes: {}
    }
  },
  computed: {
    headers () {
      return {
        // 'Authorization': 'Bearer ' + this.$store.getters.token
      }
    }
  },
  watch: {
    uploadVisible (val) {
      !val && setTimeout(() => {
        this.$refs['uploadImg'].clearFiles()
        this.$refs['uploadImg'].abort()
      }, 100)
    }
  },
  mounted () {
    this.init()
    this.getPro()
    this.addStencilPalette('箭头', 'arrows', path.join('./arrows.xml'))
  },
  beforeDestroy () {
    // this.graph.destroy()
  },
  methods: {

    init () {
      // eslint-disable-next-line new-cap
      this.model = new mxGraphModel()
      // eslint-disable-next-line new-cap
      this.graph = new mxGraph(this.$refs.container, this.model)
      this.graph.setConnectable(false)
      this.graph.setMultigraph(false)

      // Highlights the vertices when the mouse enters
      // eslint-disable-next-line new-cap
      new mxCellTracker(this.graph, '#00FF00')

      // Enables tooltips for the overlays
      this.graph.setTooltips(true)

      this.graph.gridSize = 20

      // 禁用鼠标右键
      mxEvent.disableContextMenu(this.$refs.container)
      this.initContentMenu() // 初始化上下文菜单
      this.initUndoManager() // 初始化undo/redo
      this.initKeyHandler() // 初始化键盘事件
      this.$nextTick(() => {
        this.initToolBar()
      })
    },
    addStencilPalette (title, name, file) {
      const req = mxUtils.load(file)
      const root = req.getDocumentElement()
      let shape = root.firstChild

      this.$set(this.palettes, name, { title, name, shapes: [] })

      while (shape != null) {
        if (shape.nodeType === mxConstants.NODETYPE_ELEMENT) {
          const shapeName = shape.getAttribute('name')
          const w = shape.getAttribute('w')
          const h = shape.getAttribute('h')

          // eslint-disable-next-line new-cap
          mxStencilRegistry.addStencil(shapeName, new mxStencil(shape))
          this.palettes[name]['shapes'].push({ name: shape.getAttribute('name'), width: w / 2, height: h / 2 })
        }

        shape = shape.nextSibling
      }
    },
    initToolBar () {
      var containerBasic = document.getElementById('toolbar-basic')
      // eslint-disable-next-line new-cap
      var toolbarBasic = new mxToolbar(containerBasic)
      toolbarBasic.enabled = false

      // toolbar 自带shape
      this.addVertex('./mxgraph/examples/editors/images/rectangle.gif', 40, 100, '', toolbarBasic)
      this.addVertex('./mxgraph/examples/editors/images/rounded.gif', 40, 100, 'shape=rounded', toolbarBasic)
      this.addVertex('./mxgraph/examples/editors/images/ellipse.gif', 40, 100, 'shape=ellipse', toolbarBasic)
      this.addVertex('./mxgraph/examples/editors/images/rhombus.gif', 40, 100, 'shape=rhombus', toolbarBasic)
      this.addVertex('./mxgraph/examples/editors/images/triangle.gif', 40, 100, 'shape=triangle', toolbarBasic)
      this.addVertex('./mxgraph/examples/editors/images/cylinder.gif', 40, 100, 'shape=cylinder', toolbarBasic)
      this.addVertex('./mxgraph/examples/editors/images/actor.gif', 40, 100, 'shape=actor', toolbarBasic)

      // 箭头
      const domArray = this.$refs.dragItem
      if (!(domArray instanceof Array) || domArray.length <= 0) {
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
          const elt = document.createElement('div')
          elt.style.border = '1px solid black'
          elt.style.width = `${width}px`
          elt.style.height = `${height}px`
          return elt
        }
        dom.appendChild(this.createThumb(shapeItem, width, height))

        mxUtils.makeDraggable(dom, this.graph, dragHandler, createDragPreview(), 0, 0, false, true)
      })
    },

    createThumb (item, width, height) {
      // eslint-disable-next-line new-cap
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
    instanceGraph (graph, shapeItem, x, y, width, height) {
      const parent = graph.getDefaultParent()
      graph.getModel().beginUpdate()
      try {
        const vertex = graph.insertVertex(parent, null, null, x, y, width, height, `shape=${shapeItem['name']};`)

        vertex.customer = true
      } finally {
        graph.getModel().endUpdate()
      }
    },
    addVertex (icon, w, h, style, toolbar) {
      // eslint-disable-next-line new-cap
      const vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style)

      vertex.setVertex(true)
      const img = this.addToolbarItem(this.graph, toolbar, vertex, icon)

      img.enabled = true
      this.graph.getSelectionModel().addListener(mxEvent.CHANGE, () => {
        const tmp = this.graph.isSelectionEmpty()
        mxUtils.setOpacity(img, (tmp) ? 100 : 20)
        img.enabled = tmp
      })
    },

    addToolbarItem (graph, toolbar, prototype, image) {
      const funct = function (graph, evt, cell, x, y) {
        graph.stopEditing(false)
        const vertex = graph.getModel().cloneCell(prototype)

        vertex.geometry.x = x
        vertex.geometry.y = y

        graph.addCell(vertex)
        graph.setSelectionCell(vertex)
      }
      const img = toolbar.addMode(null, image, function (evt, cell) {
        const pt = this.graph.getPointForEvent(evt)

        funct(graph, evt, cell, pt.x, pt.y)
      })

      mxEvent.addListener(img, 'mousedown', function (evt) {
        if (img.enabled === false) {
          mxEvent.consume(evt)
        }
      })

      mxEvent.addListener(img, 'mouseenter', function (evt) {
        if (img.enabled === false) {
          mxEvent.consume(evt)
        }
        img.style = 'background: gainsboro'
      })

      mxEvent.addListener(img, 'mouseleave', function (evt) {
        if (img.enabled === false) {
          mxEvent.consume(evt)
        }
        img.style = 'background: white'
      })
      mxUtils.makeDraggable(img, graph, funct)
      return img
    },

    logXML () {
      // eslint-disable-next-line new-cap
      var encoder = new mxCodec()
      var node = encoder.encode(this.graph.getModel())
      return mxUtils.getPrettyXml(node)
    },

    exportFile () {
      // eslint-disable-next-line new-cap
      var encoder = new mxCodec()
      var node = encoder.encode(this.graph.getModel())
      var xml = mxUtils.getXml(node)
      const blob = new Blob([xml], { type: 'text/plain;charset=utf-8' })
      // FileSaver.saveAs(blob, '车位.xml')
    },
    readFile (evt) {
      const file = evt.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        var txt = e.target.result
        this.importModelXML(txt)
      }
      reader.readAsText(file)
    },
    importModelXML (xml) {
      this.graph.getModel().beginUpdate()
      try {
        const doc = mxUtils.parseXml(xml)
        // eslint-disable-next-line new-cap
        const dec = new mxCodec(doc)
        var node = doc.documentElement
        dec.decode(node, this.graph.getModel())
      } finally {
        this.graph.getModel().endUpdate()
      }
    },

    colorChange () {
      this.graph.getModel().beginUpdate()
      try {
        const cells = this.graph.getSelectionCells()
        for (let i = 0; i < cells.length; i++) {
          this.graph
            .getModel()
            .setStyle(cells[i], 'fillColor=' + this.color + ';')
        }
      } finally {
        this.graph.getModel().endUpdate()
      }
    },
    importFile () {
      this.$refs.importInput.click()
    },
    deleteCells ({ cells = [], includeEdges = false, multilevel = true }) {
      if (!cells || !(cells instanceof Array)) {
        throw new Error('cells 必须是一个数组')
      }
      const tmpSet = new Set(cells)

      if (multilevel) {
        cells.forEach(cell => {
          this.findDeleteCell(cell, tmpSet)
        })
      }
      this.graph.removeCells(Array.from(tmpSet), includeEdges)
    },
    findDeleteCell (cell, deleteSet) {
      deleteSet.add(cell)
      if (cell.edges) {
        cell.edges.forEach(tmpEdge => {
          if (tmpEdge.target !== cell) {
            deleteSet.add(tmpEdge.target)
            this.findDeleteCell(tmpEdge.target, deleteSet)
          }
        })
      }
    },
    cut () {
      var cells = []
      cells = this.graph.getSelectionCells()
      mxClipboard.cut(this.graph, cells)
    },
    copy () {
      var cells = []
      cells = this.graph.getSelectionCells()
      mxClipboard.copy(this.graph, cells)
    },
    paste () {
      mxClipboard.paste(this.graph)
    },
    undo () {
      if (!this.undoMng) {
        throw new Error('mxUndoManager 没有初始化')
      }
      this.undoMng.undo()
    },
    redo () {
      if (!this.undoMng) {
        throw new Error('mxUndoManager 没有初始化')
      }
      this.undoMng.redo()
    },
    initContentMenu () {
      this.graph.popupMenuHandler.factoryMethod = (menu /*, cell*/) => {
        menu.addItem('删除', null, () => {
          this.deleteCells({
            cells: this.graph.getSelectionCells(),
            includeEdges: true
          })
        })
        menu.addSeparator()
        menu.addItem('剪切', null, () => {
          this.cut()
        })
        menu.addItem('复制', null, () => {
          this.copy()
        })
        menu.addItem('粘贴', null, () => {
          this.paste()
        })
        menu.addSeparator()
        menu.addItem('前进', null, () => {
          this.redo()
        })
        menu.addItem('后退', null, () => {
          this.undo()
        })
      }
    },
    initUndoManager () {
      // eslint-disable-next-line new-cap
      this.undoMng = new mxUndoManager()

      const listen = (sender, evt) => {
        this.undoMng.undoableEditHappened(evt.getProperty('edit'))
      }

      this.graph.getModel().addListener(mxEvent.UNDO, listen)
      this.graph.getView().addListener(mxEvent.UNDO, listen)
    },
    initKeyHandler () {
      if (!this.graph) {
        throw new Error('graph 没有初始化')
      }
      // eslint-disable-next-line new-cap
      this.keyHandler = new mxKeyHandler(this.graph)

      this.keyHandler.bindControlKey(67, () => {
        this.copy()
      })
      this.keyHandler.bindControlKey(88, () => {
        this.cut()
      })
      this.keyHandler.bindControlKey(86, () => {
        this.paste()
      })
      this.keyHandler.bindControlKey(89, () => {
        this.redo()
      })
      this.keyHandler.bindControlKey(90, () => {
        this.undo()
      })
    },

    uploadImgSuccess (response, file, fileList) {
      this.garageEdit.id = this.requestInfo.garageId
      this.$set(this.garageEdit, 'baseImg', response.data)
      // update(this.garageEdit).then((response) => {
      //   if (response.data) {
      //     this.changeBgImg(this.garageEdit.baseImg)
      //     this.uploadVisible = false
      //     this.$message.success('相应车库图片上传更新成功')
      //   } else {
      //     this.$message.error('上传失败')
      //   }
      // })
    },

    changeBgImg (url) {
      const width = this.$refs.container.offsetWidth
      const height = this.$refs.container.offsetHeight
      // eslint-disable-next-line new-cap
      var img = new mxImage(url, width, height)
      this.graph.setBackgroundImage(img)
      this.graph.view.validate()
    },

    // 非graph
    getPro () {
      //   provinceList().then(response => {
      //     this.provinceList = response.data
      //   })
    },
    proChange () {
      this.getCity()
    },
    getCity () {
      //   cityList({ areaId: this.requestInfo.provinceId }).then(response => {
      //     this.cityList = response.data
      //   })
    },
    cityChange () {
      this.getCommuntiy()
    },
    getCommuntiy () {
      //   communityList({ provinceId: this.requestInfo.provinceId, cityId: this.requestInfo.cityId }).then(response => {
      //     this.communityList = response.data
      //   })
    },
    communityChange () {
      // this.getGarage()
    },
    // getGarage () {
    //   garageList({ communityId: this.requestInfo.communityId }).then(response => {
    //     this.garageList = response.data
    //   })
    // },
    save () {
      this.garageEdit.id = this.requestInfo.garageId
      this.garageEdit.xmlInfo = this.logXML()
      update(this.garageEdit).then((response) => {
        if (response.data) {
          this.$message.success('保存成功')
        } else {
          this.$message.success('保存失败')
        }
      })
    },

    importError (err, file, fileList) {
      this.$message.error('上传出现错误')
      console.log(err)
    },

    garageChange () {
      // info({ id: this.requestInfo.garageId }).then(response => {
      //   this.garageEdit = response.data
      //   this.changeBgImg(response.data.baseImg)
      //   this.importModelXML(response.data.xmlInfo)
      // })
    },
    importBgImg () {
      if (!this.requestInfo.garageId) {
        this.$message.error('请先选择车库')
        return false
      }
      this.uploadVisible = true
    },

    // 文件大小限制提示
    beforeImgUpload (file) {
      if (!this.requestInfo.garageId) {
        this.$message.error('请先选择车库')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.$message.error('上传大小不能超过 100MB!')
      }
      return isLt2M
    }
  }
}
</script>
 
<style  lang="less">
.m_graph_container {
  position: absolute;
  height: 90%;
  width: calc(95% - 200px);
  margin-left: 200px;
  #container {
    position: absolute;
    overflow: hidden;
    left: 24px;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url("../../assets/grid.gif");
  }
}
.sidebar {
  width: 200px;
  padding-left: 10px;
  .el-collapse-item__header {
    padding-left: 10px;
  }
  .el-collapse-item__content {
    padding-left: 10px;
    padding-bottom: 0;
  }
}
.topbar {
  display: flex;
  align-items: center;
  padding: 10px;
  .topbar-left {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .topbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
 