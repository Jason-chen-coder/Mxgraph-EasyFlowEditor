<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-header style="text-align: center; font-size: 16px;" class="left_header">
        <b>转换管理</b>
      </el-header>

      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>输入
          </template>
          <el-menu-item-group>
            <el-menu-item>
              <span id="in1" class="itemstyle"></span>
              <span
                unselectable="on"
                qtip="从一个微软的Excel文件里读取数据. 兼容Excel 95, 97 and 2000."
                id="extdd-81"
              >Excel输入</span>
            </el-menu-item>
            <el-menu-item>
              <span id="in2" class="itemstyle"></span>
              <span
                unselectable="on"
                qtip="从一个文本文件（几种格式）里读取数据{0}这些数据可以被传递到下一个步骤里..."
                id="extdd-84"
              >文本文件输入</span>
            </el-menu-item>
            <el-menu-item>
              <span id="in3" class="itemstyle"></span>
              <span unselectable="on" qtip="产生一些空记录或相等的行." id="extdd-87">生成记录</span>
            </el-menu-item>
            <el-menu-item>
              <span id="in4" class="itemstyle"></span>
              <span unselectable="on" qtip="Generate random value" id="extdd-90">生成随机数</span>
            </el-menu-item>
            <el-menu-item>
              <span id="in5" class="itemstyle"></span>
              <span
                unselectable="on"
                qtip="Enter rows of static data in a grid, usually for testing, reference or demo purpose"
                id="extdd-93"
              >自定义常量数据</span>
            </el-menu-item>
            <el-menu-item>
              <span id="in6" class="itemstyle"></span>
              <span unselectable="on" qtip="获取系统信息，例如时间、日期." id="extdd-96">获取系统信息</span>
            </el-menu-item>
            <el-menu-item>
              <span id="in7" class="itemstyle"></span>
              <span unselectable="on" qtip="从数据库表里读取信息." id="extdd-99">表输入</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>输出
          </template>
          <el-menu-item-group>
            <el-menu-item>
              <span id="out1"></span>
              <span
                unselectable="on"
                qtip="Stores records into an Excel (XLS) document with formatting information."
                id="extdd-102"
              >Excel输出</span>
            </el-menu-item>
            <el-menu-item>
              <span id="out2"></span>
              <span
                unselectable="on"
                qtip="Output SQL INSERT statements to file"
                id="extdd-105"
              >SQL 文件输出</span>
            </el-menu-item>
            <el-menu-item>
              <span id="out3"></span>
              <span unselectable="on" qtip="基于关键字删除记录" id="extdd-108">删除</span>
            </el-menu-item>
            <el-menu-item>
              <span id="out4"></span>
              <span unselectable="on" qtip="基于关键字更新或插入记录到数据库." id="extdd-90">插入 / 更新</span>
            </el-menu-item>
            <el-menu-item>
              <span id="out5"></span>
              <span
                unselectable="on"
                qtip="This step perform insert/update/delete in one go based on the value of a field. "
                id="extdd-93"
              >数据同步</span>
            </el-menu-item>
            <el-menu-item>
              <span id="out6"></span>
              <span unselectable="on" qtip="写记录到一个文本文件." id="extdd-96">文本文件输出</span>
            </el-menu-item>
            <el-menu-item>
              <span id="out7"></span>
              <span unselectable="on" qtip="基于关键字更新记录到数据库" id="extdd-99">更新</span>
            </el-menu-item>
            <el-menu-item>
              <span id="out8"></span>
              <span unselectable="on" qtip="写信息到一个数据库表" id="extdd-102">表输出</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>转换
          </template>
          <el-menu-item-group>
            <el-menu-item>
              <span id="trans1"></span>
              <span
                unselectable="on"
                qtip="Maps values of a certain field from one value to another"
                id="extdd-105"
              >值映射</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans2"></span>
              <span
                unselectable="on"
                qtip="Denormalises rows by looking up key-value pairs and by assigning them to new fields in the输出 rows.{0}This method aggregates and needs the输入 rows to be sorted on the grouping fields"
                id="extdd-108"
              >列转行</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans3"></span>
              <span unselectable="on" qtip="Strings cut (substring)." id="extdd-111">剪切字符串</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans4"></span>
              <span
                unselectable="on"
                qtip="去除重复的记录行，保持记录唯一{0}这个仅仅基于一个已经排好序的输入.{1}如果输入没有排序, 仅仅两个连续的记录行被正确处理."
                id="extdd-114"
              >去除重复记录</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans5"></span>
              <span unselectable="on" qtip="给记录增加一到多个常量" id="extdd-117">增加常量</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans6"></span>
              <span unselectable="on" qtip="从序列获取下一个值" id="extdd-120">增加序列</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans7"></span>
              <span
                unselectable="on"
                qtip="Add a checksum column for each input row"
                id="extdd-123"
              >增加校验列</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans8"></span>
              <span
                unselectable="on"
                qtip="选择或移除记录里的字。{0}此外，可以设置字段的元数据: 类型, 长度和精度."
                id="extdd-126"
              >字段选择</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans9"></span>
              <span
                unselectable="on"
                qtip="Replace all occurences a word in a string with another word."
                id="extdd-129"
              >字符串替换</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans10"></span>
              <span unselectable="on" qtip="基于字段值把记录排序(升序或降序)" id="extdd-132">排序记录</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans11"></span>
              <span
                unselectable="on"
                qtip="Flattens consequetive rows based on the order in which they appear in the输入 stream"
                id="extdd-135"
              >行扁平化</span>
            </el-menu-item>
            <el-menu-item>
              <span id="trans12"></span>
              <span
                unselectable="on"
                qtip="De-normalised information can be normalised using this step type."
                id="extdd-138"
              >行转列</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>脚本
          </template>
          <el-menu-item-group>
            <el-menu-item>
              <span id="scp1"></span>
              <span
                unselectable="on"
                qtip="This is a modified plugin for the Scripting Values with improved interface and performance.
Written & donated to open source by Martin Lange, Proconis : http://www.proconis.de"
                id="extdd-81"
              >JavaScript代码</span>
            </el-menu-item>
            <el-menu-item>
              <span id="scp2"></span>
              <span unselectable="on" qtip="执行一个SQL脚本, 另外，可以使用输入的记录作为参数" id="extdd-84">执行SQL脚本</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: left; font-size: 12px" class="right_header">
        <el-button type="primary" @click="clearGraph">清空</el-button>
        <el-button type="primary" @click="lookXML">查看xml</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-header>

      <el-main>
        <div ref="graph_container" id="right"></div>
      </el-main>
    </el-container>
  </el-container>
  <!-- <div ref="graph_container"></div> -->
</template>

<script>
import mxgraph from "../../graph/index";


export default {
  data () {
    return {
      graph: null,
      undoMng: null
    };
  },
  name: "HelloWorld",
  props: {
    // msg: String
  },
  created () { },
  methods: {
    save () {
      var xml =
        '<diagram id="" tcn="">' +
        mxUtils.getXml(new mxCodec().encode(this.graph.getModel())) +
        "</diagram>";

      api("appserver/getAppServer", "post", { gid: "01" })
        .then(response => {
          console.log("response");
          consoele.log(response);
          /*  this.temp.name = response.name
          this.temp.details = response.details
          this.temp.iconurl = response.iconurl
          this.temp.operateType = 'U'
          this.temp.flowtype = response.flowtype
          this.imageUrl = response.iconshowurl */
          // this.isLoading = false
        })
        .catch(() => {
          //this.isLoading = false
        });
    },
    clearGraph (graph) {
      alert("clear");
      this.undoMng.undo();
      this.undoMng.redo();
    },
    createDragSource (graph) {
      //创建输入拖动源
      var in1 = this.createDragImage(
        graph,
        "in1",
        "./images/XLI.png",
        "EXCEL输入"
      );
      var in2 = this.createDragImage(
        graph,
        "in2",
        "./images/TFI.png",
        "文本文件输入"
      );
      var in3 = this.createDragImage(
        graph,
        "in3",
        "./images/GEN.png",
        "生成记录"
      );
      var in4 = this.createDragImage(
        graph,
        "in4",
        "./images/RVA.png",
        "生成随机数"
      );
      var in5 = this.createDragImage(
        graph,
        "in5",
        "./images/GNR.png",
        "自定义常量数据"
      );
      var in6 = this.createDragImage(
        graph,
        "in6",
        "./images/SYS.png",
        "获取系统信息"
      );
      var in7 = this.createDragImage(
        graph,
        "in7",
        "./images/TIP.png",
        "表输入"
      );

      //创建输出拖动源
      var out1 = this.createDragImage(
        graph,
        "out1",
        "./images/XLO.png",
        "Excel输出"
      );
      var out2 = this.createDragImage(
        graph,
        "out2",
        "./images/SFO.png",
        "SQL 文件输出"
      );
      var out3 = this.createDragImage(
        graph,
        "out3",
        "./images/Delete.png",
        "删除"
      );
      var out4 = this.createDragImage(
        graph,
        "out4",
        "./images/INU.png",
        "插入 / 更新"
      );
      var out5 = this.createDragImage(
        graph,
        "out5",
        "./images/SAM.png",
        "数据同步"
      );
      var out6 = this.createDragImage(
        graph,
        "out6",
        "./images/TFO.png",
        "文本文件输出"
      );
      var out7 = this.createDragImage(
        graph,
        "out7",
        "./images/UPD.png",
        "更新"
      );
      var out8 = this.createDragImage(
        graph,
        "out8",
        "./images/TOP.png",
        "表输出"
      );

      //创建转换拖动源
      var trans1 = this.createDragImage(
        graph,
        "trans1",
        "./images/VMAP.png",
        "值映射"
      );
      var trans2 = this.createDragImage(
        graph,
        "trans2",
        "./images/UNP.png",
        "列转行"
      );
      var trans3 = this.createDragImage(
        graph,
        "trans3",
        "./images/SRC.png",
        "剪切字符串"
      );
      var trans4 = this.createDragImage(
        graph,
        "trans4",
        "./images/UNQ.png",
        "去除重复记录"
      );
      var trans5 = this.createDragImage(
        graph,
        "trans5",
        "./images/CST.png",
        "增加常量"
      );
      var trans6 = this.createDragImage(
        graph,
        "trans6",
        "./images/SEQ.png",
        "增加序列"
      );
      var trans7 = this.createDragImage(
        graph,
        "trans7",
        "./images/CSM.png",
        "增加校验列"
      );
      var trans8 = this.createDragImage(
        graph,
        "trans8",
        "./images/SEL.png",
        "字段选择"
      );
      var trans9 = this.createDragImage(
        graph,
        "trans9",
        "./images/RST.png",
        "字符串替换"
      );
      var trans10 = this.createDragImage(
        graph,
        "trans10",
        "./images/SRT.png",
        "排序记录"
      );
      var trans11 = this.createDragImage(
        graph,
        "trans11",
        "./images/FLA.png",
        "行扁平化"
      );
      var trans12 = this.createDragImage(
        graph,
        "trans12",
        "./images/NRM.png",
        "行转列"
      );

      //创建脚本拖动源
      var scp1 = this.createDragImage(
        graph,
        "scp1",
        "./images/SCR_mod.png",
        "scp1"
      );
      var scp2 = this.createDragImage(
        graph,
        "scp2",
        "./images/SQL.png",
        "scp2"
      );
    },
    paseXML (graph) {
      var xml =
        '<mxGraphModel> <root> <mxCell id="0"/> <mxCell id="1" parent="0"/> <mxCell id="2" value="EXCEL输入" style="in1" vertex="1" parent="1"> <mxGeometry x="100" y="110" width="50" height="50" as="geometry"/> </mxCell> <mxCell id="3" value="文本文件输入" style="in2" vertex="1" parent="1"> <mxGeometry x="380" y="130" width="50" height="50" as="geometry"/> </mxCell> <mxCell id="4" value="生成随机数" style="in4" vertex="1" parent="1"> <mxGeometry x="210" y="350" width="50" height="50" as="geometry"/> </mxCell> <mxCell id="6" edge="1" parent="1" source="2" target="4"> <mxGeometry relative="1" as="geometry"/> </mxCell> <mxCell id="7" edge="1" parent="1" source="4" target="3"> <mxGeometry relative="1" as="geometry"/> </mxCell> </root> </mxGraphModel>';
      var doc = mxUtils.parseXml(xml);
      var codec = new mxCodec(doc);
      codec.decode(doc.documentElement, graph.getModel());
    },
    RightMenu (graph) {
      var container = document.getElementById("right");
      //禁用浏览器自带的右键事件
      mxEvent.disableContextMenu(container);

      // 使用本地函数安装弹出菜单处理程序
      graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
        return createPopupMenu(graph, menu, cell, evt);
      };

      //创建右键的菜单
      function createPopupMenu (graph, menu, cell, evt) {
        if (cell != null) {
          menu.addItem("复制步骤", "", function () {
            var cells = new Array();
            cells = graph.getSelectionCells();
            console.log("graph");
            console.log(graph);
            console.log("cells");
            console.log(cells);
            console.log("mxClipboard", mxClipboard);
            mxClipboard.copy(graph, cells);
          });
        }
        menu.addSeparator();
        menu.addItem("删除步骤", "", function () {
          var cells = new Array();
          cells = graph.getSelectionCells();
          graph.removeCells(cells);
        });
      }
    },
    lookXML () {
      var encoder = new mxCodec();
      var node = encoder.encode(this.graph.getModel());

      const h = this.$createElement;
      this.$msgbox({
        title: "xml",
        message: h("p", null, [
          h(
            "div",
            {
              style:
                "overflow-y:auto; overflow-x:auto; width:400px; max-height:400px;"
            },
            mxUtils.getPrettyXml(node)
          )
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      });
    },
    getStyle (graph, url, styleName) {
      // 声明一个object
      var style = {};
      // 克隆一个object
      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL; // 不设置这个属性 背景图片不出来
      // 边框颜色
      style[mxConstants.STYLE_STROKECOLOR] = "#15428b";
      //圆角
      style[mxConstants.STYLE_ROUNDED] = "1";
      // 边框大小
      style[mxConstants.STYLE_STROKEWIDTH] = "0.5px";
      // 字体颜色
      style[mxConstants.STYLE_FONTCOLOR] = "#000";
      // 文字水平方式
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_right;
      // 文字垂直对齐
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
      // 字体大小
      style[mxConstants.STYLE_FONTSIZE] = 14;
      style[mxConstants.STYLE_FILLCOLOR] = "transparent";
      // 底图水平对齐
      style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_LEFT;
      // 底图垂直对齐
      style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
      // 图片路径
      //style[mxConstants.STYLE_IMAGE] = 'images/icons48/gear.png';
      style[mxConstants.STYLE_IMAGE] = url; //'./images/i_assignedSlave.png';
      // 背景图片宽
      style[mxConstants.STYLE_IMAGE_WIDTH] = 40;
      // 背景图片高
      style[mxConstants.STYLE_IMAGE_HEIGHT] = 40;

      // 上间距设置
      // 即使下边定义了全局设置，但这里单独设置上边间距仍单独有效
      // style[mxConstants.STYLE_SPACING_TOP] = 'spacingTop';
      // 四边间距设置
      style[mxConstants.STYLE_SPACING] = 1;
      style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] =
        mxConstants.ALIGN_BOTTOM;
      graph.getStylesheet().putCellStyle(styleName, style);
    },
    createDragImage (graph, id, image, text) {
      var img = mxUtils.createImage(image);
      img.style.width = "30px";
      img.style.height = "30px";
      img.style.margin = "0px";
      document.getElementById(id).appendChild(img);

      var style = this.getStyle(graph, image, id);

      // 检查图形中是否包含对应的elt节点
      function containsElt (graph, elt) {
        while (elt != null) {
          if (elt == graph.container) {
            return true;
          }
          elt = elt.parentNode;
        }
        return false;
      }

      // 在给定的位置插入一个元素
      var funct1 = function (graph, evt, target, x, y) {
        /* var prefix = '';
                prefix =     prefix+'verticalLabelPosition=bottom;verticalAlign=top;STYLE_STROKEWIDTH=1px;'; */
        var cell = new mxCell(text, new mxGeometry(0, 0, 50, 50), id);
        cell.vertex = true;
        var cells = graph.importCells([cell], x, y, target); //插入元素、位置、大小
        console.log(cells.getStyle);
      };

      // 禁用IE浏览器中的DnD功能（这是为了跨浏览器平台而设计的，见下文）
      if (mxClient.IS_IE) {
        mxEvent.addListener(img, "dragstart", function (evt) {
          evt.returnValue = false;
        });
      }

      // 创建拖动源的预览
      var dragElt = document.createElement("div");
      dragElt.style.border = "dashed black 1px";
      dragElt.style.width = "120px";
      dragElt.style.height = "40px";

      // 在点击拖动源图标时提供预览。 预览是提供的仅仅是拖动源的图片
      // 只有拖动源到容器内时才会显示元素的坐标预览

      var ds = mxUtils.makeDraggable(
        img,
        graph,
        funct1,
        dragElt,
        null,
        null,
        graph.autoscroll,
        true
      );

      //从拖动源拖动时显示导航线。
      //注意，对图形中已存在的元素拖动时显示导航线不在本方法约束范围。
      ds.isGuidesEnabled = function () {
        return graph.graphHandler.guidesEnabled;
      };

      //从拖动源拖动元素到图形以外的区域时，显示拖动源图片预览
      ds.createDragElement = mxDragSource.prototype.createDragElement;
    }
  },
  // /item1
  mounted () {
    var graph = new mxGraph(this.$refs.graph_container);
    graph.setConnectable(true);
    new mxRubberband(graph);
    var parent = graph.getDefaultParent();
    this.graph = graph;

    //创建拖拽源
    this.createDragSource(graph);

    //页面初始化
    this.paseXML(graph);

    //右键菜单定义
    this.RightMenu(graph);
  }
};
</script>

<style scoped>
.left_header {
  font-weight: 500;
  margin: 0 auto;
  padding: 15px;
}
.right_header {
  margin: auto 0;
  background-color: #e9edf1;
  padding: 10px;
  padding-left: 15px;
}
#right {
  height: 100%;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url("/images/grid.gif");
  cursor: default;
}

.el-menu-item-group__title {
  padding: 0px 0 7px 20px;
  line-height: normal;
  font-size: 12px;
  color: #909399;
}
</style>