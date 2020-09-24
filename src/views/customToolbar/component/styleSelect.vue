<template>
  <div class="styleTool">
    <el-tabs stretch type="border-card">
      <el-tab-pane label="样式">
        <el-form :inline="true" :model="form" class="style-form" size="mini" label-position="left">
          <el-form-item label="线条样式">
            <el-select v-model="form.dashed" @change="$emit('changeDashed', form.dashed)">
              <el-option label="-------" value="1"></el-option>
              <el-option label="———" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-form-item label="线条颜色">
              <el-color-picker
                v-model="form.strokeColor"
                show-alpha
                :predefine="predefineColors"
                @change="$emit('changeStrokeColor', form.strokeColor)"
              ></el-color-picker>
            </el-form-item>
            <el-form-item v-if="isNode" label="填充颜色">
              <el-color-picker
                v-model="form.fillColor"
                show-alpha
                :predefine="predefineColors"
                @change="$emit('changeFillColor', form.fillColor)"
              ></el-color-picker>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="form.shadow" @change="$emit('changeShadow', form.shadow)">阴影</el-checkbox>
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
          <el-form-item label="线条风格" v-if="!isNode">
            <el-select
              class="select-edgetype"
              v-model="form.edgeStyle"
              @change="$emit('edgeChange',form.edgeStyle)"
              placeholder="请选择"
              round
            >
              <el-option
                v-for="item in edgeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isNode" label="配置序号(预留)">
            <el-input-number
              v-model="newConfigOrder"
              @change="$emit('changeConfigOrder', {newConfigOrder})"
              :min="1"
              :max="10"
              label="配置序号"
            ></el-input-number>
          </el-form-item>
          <el-form-item v-if="isNode&&!form.orderPoint" label="节点图片">
            <el-select
              @change="$emit('changeNodeimage', nodeImageUrl)"
              v-model="nodeImageUrl"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in nodeImageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <el-tooltip class="item" effect="dark" :content="item.label" placement="top">
                  <div style="width:100%">
                    <el-image class="select-image" :src="item.value">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                </el-tooltip>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="文本">
        <el-form :inline="true" :model="form" class="style-form" size="mini" label-position="left">
          <el-form-item label="文字内容">
            <el-input v-model="cellTextValue" @change="$emit('textValueChange', cellTextValue)"></el-input>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input-number
              v-model="form.fontSize"
              @change="$emit('changeFontSize', form.fontSize)"
            ></el-input-number>
          </el-form-item>
          <el-row>
            <el-form-item>
              <el-checkbox v-model="fontIsBold">加粗</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="fontIsIncline">倾斜</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="fontIsUnderline">下划线</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="fontIsStrickout">删除线</el-checkbox>
            </el-form-item>
          </el-row>
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
      <span style="width:60px;display:inline-block;">X:{{(graphX)}}</span>
      <span style="width:60px;display:inline-block;">Y:{{(graphY)}}</span>
    </div>
    <!-- 收缩小工具 -->
    <div class="show-map" ref="showMap"></div>
  </div>
</template>
<script>
export default {
  props: ['isNode', 'cellStyle', 'graphY', 'graphX', 'currentNormalType', 'textValue'],
  data () {
    return {
      edgeOptions: [
        { label: "直线", value: 'SideToSide' },
        { label: '折线', value: "orthogonalEdgeStyle" }
      ],
      form: {
        edgeStyle: "折线",
        dashed: "0",
        strokeColor: "#6482b9",
        fontColor: "#6482b9",
        strokeWidth: "1",
        labelBackgroundColor: "#FFFFFF",
        fontSize: 12,
        fillColor: "#FFFFFF",
        shadow: 0,
        fontBold: 0,
        fontStyle: 0
      },
      fontIsBold: false,
      fontIsIncline: false,
      fontIsUnderline: false,
      fontIsStrickout: false,
      newConfigOrder: 0,
      newConfigOrderId: '',
      cellTextValue: '',
      fontStyle: 0,
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
      ],
      nodeImageOptions: [{
        value: './icon/boxDomain.png',
        label: '域盒子'
      }, {
        value: './icon/center.png',
        label: '中心'
      }, {
        value: './icon/database.png',
        label: '数据库'
      }, {
        value: './icon/authorizate.png',
        label: '认证'
      }, {
        value: './icon/cluster.png',
        label: '集群'
      }, {
        value: './icon/exchange.png',
        label: '缓冲'
      },
      {
        value: './icon/elasticsearch.png',
        label: 'ElasticSearch'
      },
      {
        value: './icon/kibana.svg',
        label: 'Kibana'
      },
      {
        value: './icon/logstash.png',
        label: 'LogStash'
      },
      {
        value: './icon/KAFKA.png',
        label: 'KAFKA'
      },
      {
        value: './icon/beats.png',
        label: 'Beats'
      },
      {
        value: './icon/redis.png',
        label: 'Redis'
      }
      ],
      nodeImageUrl: ''
    }
  },
  computed: {
    selectfontStyle () {
      return Boolean(this.fontIsBold) * 1 + Boolean(this.fontIsIncline) * 2 + Boolean(this.fontIsUnderline) * 4 + Boolean(this.fontIsStrickout) * 8
    }
  },
  mounted () {

  },
  watch: {
    cellStyle: {
      handler (newvalue) {
        this.form.dashed = newvalue.dashed ? newvalue.dashed : '0';
        this.form.strokeWidth = newvalue.strokeWidth;
        this.form.strokeColor = newvalue.strokeColor;
        this.form.fontColor = newvalue.fontColor ? newvalue.fontColor : "#000000";
        this.form.labelBackgroundColor = newvalue.labelBackgroundColor ? newvalue.labelBackgroundColor : "#FFFFFF";
        this.form.fillColor = newvalue.fillColor ? newvalue.fillColor : "#FFFFFF";
        this.form.fontSize = newvalue.fontSize ? newvalue.fontSize : 12;
        this.form.shadow = newvalue.shadow ? Boolean(newvalue.shadow) : false;
        this.form.fontStyle = newvalue.fontStyle ? newvalue.fontStyle : 0;
        this.form.edgeStyle = newvalue.edgeStyle ? newvalue.edgeStyle : 'orthogonalEdgeStyle';
        this.form.orderPoint = newvalue.orderPoint ? newvalue.orderPoint : false;
        this.nodeImageUrl = newvalue.image ? newvalue.image : '';
        switch (parseInt(newvalue.fontStyle)) {
          case 1: this.fontIsBold = true, this.fontIsIncline = false, this.fontIsUnderline = false, this.fontIsStrickout = false; break
          case 2: this.fontIsBold = false, this.fontIsIncline = true, this.fontIsUnderline = false, this.fontIsStrickout = false; break
          case 3: this.fontIsBold = true, this.fontIsIncline = true, this.fontIsUnderline = false, this.fontIsStrickout = false; break
          case 4: this.fontIsBold = false, this.fontIsIncline = false, this.fontIsUnderline = true, this.fontIsStrickout = false; break
          case 5: this.fontIsBold = true, this.fontIsIncline = false, this.fontIsUnderline = true, this.fontIsStrickout = false; break
          case 6: this.fontIsBold = false, this.fontIsIncline = true, this.fontIsUnderline = true, this.fontIsStrickout = false; break
          case 7: this.fontIsBold = true, this.fontIsIncline = true, this.fontIsUnderline = true, this.fontIsStrickout = false; break
          case 8: this.fontIsBold = false, this.fontIsIncline = false, this.fontIsUnderline = false, this.fontIsStrickout = true; break
          case 9: this.fontIsBold = true, this.fontIsIncline = false, this.fontIsUnderline = false, this.fontIsStrickout = true; break
          case 10: this.fontIsBold = false, this.fontIsIncline = true, this.fontIsUnderline = false, this.fontIsStrickout = true; break
          case 11: this.fontIsBold = true, this.fontIsIncline = true, this.fontIsUnderline = false, this.fontIsStrickout = true; break
          case 12: this.fontIsBold = false, this.fontIsIncline = false, this.fontIsUnderline = true, this.fontIsStrickout = true; break
          case 13: this.fontIsBold = true, this.fontIsIncline = false, this.fontIsUnderline = true, this.fontIsStrickout = true; break
          case 14: this.fontIsBold = false, this.fontIsIncline = true, this.fontIsUnderline = true, this.fontIsStrickout = true; break
          case 15: this.fontIsBold = true, this.fontIsIncline = true, this.fontIsUnderline = true, this.fontIsStrickout = true; break
          default: this.fontIsBold = false, this.fontIsIncline = false, this.fontIsUnderline = false, this.fontIsStrickout = false;
        }
      },
      deep: true,
      immediate: true
    },
    currentNormalType: {
      handler (newvalue) {
        this.newConfigOrder = newvalue.title;
      }
    },
    selectfontStyle: {
      handler (newvalue) {
        this.$emit("changeFontStyle", newvalue)
      }
    },
    textValue (newValue) {
      this.cellTextValue = newValue;
    }
  },
  methods: {
    // changeDash () {
    //   this.$emit("changeDashed", this.form.dashed)
    // },
  }
}
</script>
<style lang="less">
.styleTool {
  width: 100%;
  height: 30%;
  transition: all 1s linear;
  .hide-styleTool {
    right: -340px;
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
.el-select-dropdown {
  .el-select-dropdown__item {
    text-align: center;
    img {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
  }
}
</style>