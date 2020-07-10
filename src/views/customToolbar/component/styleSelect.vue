<template>
  <div class="styleTool">
    <h1 v-if="isNode" class="title">属性</h1>
    <el-tabs stretch type="border-card">
      <el-tab-pane label="样式">
        <el-form :inline="true" :model="form" class="style-form" size="mini" label-position="left">
          <el-row>
            <el-form-item label="线条样式">
              <el-select v-model="form.dashed" @change="$emit('changeDashed', form.dashed)">
                <el-option label="-------" value="1"></el-option>
                <el-option label="———" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="线条颜色">
              <el-color-picker
                v-model="form.strokeColor"
                show-alpha
                :predefine="predefineColors"
                @change="$emit('changeStrokeColor', form.strokeColor)"
              ></el-color-picker>
            </el-form-item>
          </el-row>
          <el-form-item label="线条宽度">
            <el-input-number
              v-model="form.strokeWidth"
              @change="$emit('changeStrokeWidth', form.strokeWidth)"
              :min="1"
              :max="10"
              label="线条宽度"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="文本">
        <el-form :inline="true" :model="form" class="style-form" size="mini" label-position="left">
          <el-form-item label="字体大小">
            <el-input-number
              v-model="form.fontSize"
              @change="$emit('changeFontSize', form.fontSize)"
              label="字体大小"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker
              v-model="form.fontColor"
              show-alpha
              :predefine="predefineColors"
              @change="$emit('changeFontColor', form.fontColor)"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="文本域背景颜色">
            <el-color-picker
              show-alpha
              :predefine="predefineColors"
              v-model="form.labelBackgroundColor"
              @change="$emit('changeLabelBackgroundColor',form.labelBackgroundColor)"
            ></el-color-picker>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 鼠标坐标展示 -->
    <div class="graphLocation">
      <span style="width:60px;display:inline-block;">X:{{graphX}}</span>
      <span style="width:60px;display:inline-block;">Y:{{graphY}}</span>
    </div>
    <!-- 收缩小工具 -->
    <div class="show-map" ref="showMap"></div>
  </div>
</template>
<script>
export default {
  props: ['isNode', 'cellStyle', 'graphY', 'graphX'],
  data () {
    return {
      form: {
        dashed: "0",
        strokeColor: "#6482b9",
        fontColor: "#6482b9",
        strokeWidth: "1",
        labelBackgroundColor: "",
        fontSize: 12
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
    }
  },
  mounted () {
  },
  watch: {
    cellStyle: {
      handler (newvalue) {
        console.log('newvalue', newvalue)
        this.form.dashed = newvalue.dashed ? newvalue.dashed : '0';
        this.form.strokeWidth = newvalue.strokeWidth;
        this.form.strokeColor = newvalue.strokeColor;
        this.form.fontColor = newvalue.fontColor ? newvalue.fontColor : "#000000";
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
  },
  methods: {
    // changeDash () {
    //   this.$emit("changeDashed", this.form.dashed)
    // },
  }}
</script>
<style lang="less">
.styleTool {
  width: 100%;
  height: 100%;
  transition: all 1s linear;
  .hide-styleTool {
    right: -340px;
  }
  .title {
    padding: 5px;
    box-sizing: border-box;
    background-color: #fcfcfc;
    border-bottom: 1px solid #ededed;
    text-align: center;
    line-height: 30px;
  }
  .style-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px 0 0 10px;
  }
  .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }
  .graphLocation {
    background-color: #fff;
    border: 1px solid #ededed;
    padding: 10px;
    padding-left: 20px;
    box-sizing: border-box;
    box-shadow: 9px 9px 12px -4px #cdc7c7;
    border-radius: 13px;
    position: absolute;
    left: -180px;
    bottom: 150px;
  }

  .show-map {
    position: absolute;
    bottom: 10px;
    left: -180px;
    border: 3px solid #ededed;
    box-shadow: 9px 9px 12px -4px #cdc7c7;
    width: 160px;
    height: 120px;
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>