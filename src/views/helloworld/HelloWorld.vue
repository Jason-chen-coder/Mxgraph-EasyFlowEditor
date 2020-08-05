<template>
  <div ref="graph_container" class="graph_container"></div>
</template>

<script>
import { mxGraph, mxRubberband, mxConstants, mxEvent, mxGraphHandler, mxEdgeStyle } from 'mxgraph-js'


export default {
  name: 'HelloWorld',
  mounted () {
    var graph = new mxGraph(this.$refs.graph_container); //创建视图
    graph.setHtmlLabels(true); // Label 将显示 Html 格式的 Value
    graph.setTolerance(20);
    graph.setEnabled(true); //设置启用,就是允不允许你改变CELL的形状内容。
    graph.setVertexLabelsMovable(true); // 允许移动 Vertex 的 Label

    graph.setConnectable(true); // 是否允许Cells通过其中部的连接点新建连接,false则通过连接线连接    
    graph.setDropEnabled(true); // 从工具栏拖动到目标细胞时细胞边界是否产生光圈    
    graph.setTooltips(true); // 是否显示提示,默认显示Cell的名称 
    graph.setResizeContainer(true); // 容器大小自适应
    graph.setMultigraph(false); // 重复连接
    graph.setAllowLoops(true); // 允许连线的目标和源是同一元素

    new mxRubberband(graph); // 左键框选(编辑状态下生效)
    // 节点样式
    var style = graph.getStylesheet().getDefaultVertexStyle();
    // style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;//文字对齐方式
    // style[mxConstants.STYLE_FILLCOLOR] = 'rgb(251, 148, 79)'; //填充色
    style[mxConstants.STYLE_FONTSIZE] = 14; //文字大小
    style[mxConstants.STYLE_FONTCOLOR] = "#fff"; //文字颜色
    style[mxConstants.STYLE_WHITE_SPACE] = "wrap"; //自动换行
    delete style[mxConstants.STYLE_STROKECOLOR]; //去掉边框
    graph.getView().updateStyle = true; // 动态改变样式

    graph.setAutoSizeCells(true); // 鼠标拖动
    graph.setPanning(true); // 移动镜头(移动容器坐标轴)
    graph.panningHandler.useLeftButtonForPanning = true; // 设置左键可移动容器坐标轴

    graph.setCellsResizable(false); // 禁止改变元素大小
    mxEvent.disableContextMenu(this.$refs.graph_container); // 禁用浏览器默认的右键菜单栏
    graph.connectionHandler.setCreateTarget(true); // 是否创建目标
    mxGraphHandler.prototype.setMoveEnabled(false);//是否可以移动  
    mxGraphHandler.prototype.guidesEnabled = true;//显示细胞位置标尺  /*禁用节点双击，防止改变数据 */  
    graph.dblClick = function (evt, cell) { var model = graph.getModel(); if (model.isVertex(cell)) { return false; } };  //重写方法不允许那条线(edge)可以编辑    
    graph.isCellEditable = function (cell) { return !this.getModel().isEdge(cell) && !this.getModel().isVertex(cell); };

    // 滚轮缩放
    mxEvent.addMouseWheelListener(function (evt, up) {
      if (up) {
        graph.zoomIn();
      } else {
        graph.zoomOut();
      }
      mxEvent.consume(evt);
    });

    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
    style[mxConstants.STYLE_STROKECOLOR] = "rgb(115, 121, 133)"; //连接线颜色
    delete graph.getStylesheet().getDefaultEdgeStyle()["endArrow"]; //去掉箭头

    graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {
      var cell = evt.getProperty("cell");
      console.log(cell)
    }); //双击事件

    var parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try {
      var v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30); //生成模块
      var v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30); //生成模块
      graph.insertEdge(parent, null, " ", v2, v1); //连接两个模块
      graph.insertEdge(parent, null, " ", v2, v2);
    } finally {
      graph.getModel().endUpdate();
    }
  }
};
</script>

<style scoped>
</style>

