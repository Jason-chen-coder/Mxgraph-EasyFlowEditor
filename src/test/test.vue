<script>
 // var submenu1 = menu.addItem('修改连接线样式', null, null);

        // // 设置二级菜单
        // menu.addItem('虚线', './images/close.gif', () => {
        //   var cell = this.graph.getSelectionCell();
        //   // var oldStyle = cell.getStyle() ? cell.getStyle() : "";
        //   // cell.setStyle(oldStyle + "dashed=1;dashPattern=3 3")
        //   this.graph.setCellStyles(MxConstants.STYLE_DASHED, "1", [cell]);
        //   cell.setStyle(oldStyle + "dashed=1;")
        //   this.graph.refresh(cell)
        // }, submenu1);

        // menu.addItem('实线', './images/close.gif', () => {
        //   var cell = this.graph.getSelectionCell();
        //   // var oldStyle = cell.getStyle();
        //   // cell.setStyle("dashed=0;")
        //   this.graph.setCellStyles(MxConstants.STYLE_DASHED, "0", [cell]);
        //   this.graph.refresh(cell)
        // }, submenu1);

        // menu.addItem('连线颜色', './images/close.gif', () => {
        //   var cell = this.graph.getSelectionCell();
        //   // var oldStyle = cell.getStyle();
        //   this.graph.setCellStyles(MxConstants.STYLE_STROKECOLOR, "#ED2323", [cell]);
        //   // cell.setStyle("strokeColor=red;")
        //   this.graph.refresh(cell)
        // }, submenu1);

        // menu.addItem('字体颜色', './images/close.gif', () => {
        //   var cell = this.graph.getSelectionCell();
        //   // var oldStyle = cell.getStyle();
        //   // cell.setStyle("fontColor=red;")
        //   this.graph.setCellStyles(MxConstants.STYLE_FONTCOLOR, "#ED2323", [cell]);
        //   this.graph.refresh(cell)
        // }, submenu1);

        // menu.addItem('连线加粗', './images/close.gif', () => {
        //   var cell = this.graph.getSelectionCell();
        //   // var oldStyle = cell.getStyle();
        //   // cell.setStyle("strokeWidth=3;")
        //   this.graph.setCellStyles(MxConstants.STYLE_STROKEWIDTH, "3", [cell]);
        //   this.graph.refresh(cell)
        // }, submenu1);

        // menu.addItem('隐藏标签', './images/close.gif', () => {
        //   var cell = this.graph.getSelectionCell();
        // var oldStyle = cell.getStyle();
        //   cell.setStyle( "noLabel=true;")
        //   this.graph.refresh(cell)
        // }, submenu2);


            // // 监听双击事件
      // this.graph.addListener(MxEvent.DOUBLE_CLICK, (graph, evt) => {
      //   var cell = evt['properties'].cell ? evt['properties'].cell : []
      //   this.$message.success("当前节点信息为:" + (cell.value ? cell.value : cell.title))
      // });
      // // 监听单击事件
      // this.graph.addListener(MxEvent.CLICK, (sender, evt) => {
      //   var cell = evt['properties'].cell ? evt['properties'].cell : []
      //   // var edgeStyle = evt.getStylesheet().getDefaultEdgeStyle()
      //   if (cell.edge == true) {
      //     console.log("点击了线")
      //   }
      //   // var overlays = this.graph.getCellOverlays(cell);
      //   // console.log("单击了节点cell", cell)
      //   // console.log("单击了节点sender", sender)
      // });
</script>