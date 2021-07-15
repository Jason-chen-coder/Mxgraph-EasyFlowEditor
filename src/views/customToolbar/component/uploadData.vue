<template>
  <el-dialog
    :title="isOutputXml ? '数据导出' : '数据导入'"
    :visible.sync="centerDialogVisible"
    width="70%;"
    center
    @close="close"
  >
    <el-upload
      class="upload-box"
      drag
      accept=".xml"
      action
      :file-list="uploadFiles"
      :on-change="fileChange"
      :auto-upload="false"
      :limit="1"
      :on-exceed="exceedFile"
      v-if="!isOutputXml"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
        <div slot="tip" class="el-upload__tip">
          只能上传
          <em>xml</em> 文件，且最大文件数量不超过 <em>1</em> 个
        </div>
      </div>
    </el-upload>
    <!--codemirror插件-->
    <div style="display: flex">
      <codemirror
        :value="currentNodeData"
        v-model="currentNodeData"
        :options="options"
        :style="{ width: isOutputXml ? '50%' : '100%' }"
        class="codemirror"
      ></codemirror>
      <!-- xml转json -->
      <json-viewer
        v-if="isOutputXml"
        class="xmlToJson"
        :value="xml2json"
        :expand-depth="5"
        copyable
        sort
      ></json-viewer>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelUpload">取 消</el-button>
      <el-button type="primary" @click="confirmUpload" v-if="!isOutputXml"
        >导入</el-button
      >
      <el-button type="primary" @click="saveXmlFile" v-if="isOutputXml"
        >另存为XML文件</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import 'codemirror/lib/codemirror.css'
import { codemirror } from 'vue-codemirror'
// 导入主题 样式
// import 'codemirror/theme/mdn-like.css'
import 'codemirror/theme/lesser-dark.css'
import 'codemirror/mode/markdown/markdown.js'
// 导入数据类型识别文件
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/properties/properties.js"
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/selection/active-line' //光标行背景高亮，配置里面也需要styleActiveLine设置为true

import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import X2JS from 'x2js'

export default {
  props: ['graphXml', 'isOutputXml'],
  data () {
    return {
      xml2json: '',
      uploadFiles: [],
      centerDialogVisible: false,
      currentNodeData: "",
      // codemirror配置项
      options: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        mode: 'text/x-markdown',
        theme: 'lesser-dark',
        foldGutter: true,
        lineWrapping: true,
        styleActiveLine: true,
        autoRefresh: true,
        lint: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      }
    }
  },
  components: {
    codemirror
  },
  watch: {
    currentNodeData: {
      handler (newvalue) {
        // let xmljson = x2js.xml2js(newvalue) //xml2js方法，传入xml格式的数据，返回json对象
        //创建一个x2js对象进行转换
        var x2js = new X2JS();
        this.xml2json = x2js.xml2js(newvalue);
        // this.currentNodeData = newvalue
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    this.centerDialogVisible = true
    this.currentNodeData = this.graphXml
  },
  methods: {

    close () {
      this.centerDialogVisible = false
      this.$parent.uploadDataVisible = false;
    },
    saveXmlFile () {
      var datastr = "data:text/json;charset=utf-8," + encodeURIComponent(this.currentNodeData);
      var downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute("href", datastr);
      downloadAnchorNode.setAttribute("download", 'data.xml')
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      this.$message.success("正在下载中,请稍后...")
    },
    confirmUpload () {
      // 触发父组件重绘函数
      this.$emit("uploadPaintFlow", this.currentNodeData)
      this.centerDialogVisible = false
      this.$parent.uploadDataVisible = false;
    },
    cancelUpload () {
      console.log(this.currentNodeData)
      this.centerDialogVisible = false
      this.$parent.uploadDataVisible = false;
      this.currentNodeData = ""
    },

    tirggerFile () {

    },
    fileChange (file) {
      // 获取文件类型
      var fileType = file.name.split(".").pop()
      if (fileType !== 'xml') {
        this.$message.error("上传文件类型错误,请重新上传XML类型的文件")
        this.uploadFiles = []
        return
      }
      if (file) {
        let reader = new FileReader()
        reader.readAsText(file.raw) //注意读取中文的是用这个编码，不是utf-8
        reader.onload = () => {
          this.$message.success("文件上传成功")
          var result = reader.result;
          this.currentNodeData = result
        }
      }
    },
    exceedFile () {
      this.$message.error("超出文件可上传数量,请先清除文件")
    }
  },
}
</script>
<style lang="less">
.upload-box {
  .el-upload {
    display: block;
    width: 360px;
    margin: 0 auto;
  }
}
.codemirror {
  margin-top: 40px;
  border-style: solid;
  border-color: #578dbf;
  border-width: 2px 2px 2px 0;
  position: relative;
  height: 500px;
}
.CodeMirror {
  height: 100%;
}
.codemirror::before {
  position: absolute;
  font-size: 17px;
  top: -30px;
  left: 10px;
  content: "数据预览 :";
}
.xmlToJson {
  width: 50%;
  height: 100%;
}
.xmlToJson::before {
  position: absolute;
  font-size: 17px;
  top: 0px;
  left: 10px;
  content: "XML转JSON :";
}
</style>