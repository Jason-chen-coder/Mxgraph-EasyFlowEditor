<template>
  <div class="styleTool">
    <h1 v-if="isNode" class="title">节点属性</h1>
    <h1 v-else class="title">连线属性</h1>
    <!-- 连线样式 -->
    <el-form :inline="true" :model="form" class="style-form">
      <el-form-item label="连线样式">
        <el-select v-model="form.dashed">
          <el-option label="虚线" value="1"></el-option>
          <el-option label="实线" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线条颜色">
        <el-color-picker v-model="form.strokeColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker v-model="form.fontColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="标签背景颜色">
        <el-color-picker v-model="form.labelBackgroundColor"></el-color-picker>
      </el-form-item>

      <el-form-item label="线条宽度">
        <el-select v-model="form.strokeWidth">
          <el-option label="1" value="1"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    {{form}}
  </div>
</template>
<script>
export default {
  props: ['isNode', 'cellStyle'],
  data () {
    return {
      form: {
        dashed: "0",
        strokeColor: "#6482b9",
        fontColor: "#6482b9",
        strokeWidth: "1",
        labelBackgroundColor: ""
      }
    }
  },
  mounted () {
    console.log(this.form)
  },
  watch: {
    cellStyle: {
      handler (newvalue) {
        this.form = newvalue
        // var arr = newvalue.split(";")
        // arr.pop()
        // console.log(arr)
        // var styleObject = {}
        // arr.forEach((item => {
        //   styleObject[item.split("=")[0]] = item.split("=")[1]
        // }))
        // console.log(styleObject)
        // this.form = { ...styleObject }
        // console.log(this.form)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less">
.styleTool {
  width: 100%;
  height: 100%;
  .title {
    background-color: #eff3f5;
    border-bottom: 1px solid #ededed;
    text-align: center;
    line-height: 30px;
  }
  .style-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px 0 0 40px;
  }
}
</style>