<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-row style="text-align:center;height:100%;line-height:100%">
          <el-col :span="24" style="text-align:center;height:100%;line-height:100%">
            <div
              class="grid-content bg-purple"
              style="text-align:center;height:100%;line-height:200%;color:#409eff;font-weight:600;font-size:30px;"
            >Easy editor</div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px" height="90vh">
          <el-row class="menu-row">
            <el-col>
              <el-menu
                default-active="1"
                style="border-right:none"
                @open="handleOpen"
                @close="handleClose"
                router
              >
                <el-menu-item index="HelloWorld">
                  <i class="el-icon-menu"></i>
                  <span slot="title">HelloWorld</span>
                </el-menu-item>
                <el-menu-item index="Layout">
                  <i class="el-icon-menu"></i>
                  <span slot="title">Layout</span>
                </el-menu-item>
                <el-menu-item index="toolbar">
                  <i class="el-icon-setting"></i>
                  <span slot="title">默认工具栏</span>
                </el-menu-item>
                <el-menu-item index="customToolbar">
                  <i class="el-icon-setting"></i>
                  <span slot="title">自定义工具栏</span>
                </el-menu-item>
                <el-menu-item index="stencilToolbar">
                  <i class="el-icon-document"></i>
                  <span slot="title">模板工具箱</span>
                </el-menu-item>
                <el-menu-item index="01-editor">
                  <i class="el-icon-document"></i>
                  <span slot="title">01-editor</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
require('mxgraph/javascript/src/css/common.css')
export default {
  name: 'App',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.header {
  height: 10vh;
}
.aside {
  height: 90vh;
  border: 1px solid #ededed;
}
.menu-row {
  width: 100%;
}
.main {
  height: 90vh;
  border: 1px solid #ededed;
  background-color: #efefef;
}
.graph_container {
  width: 100%;
  height: 100%;
  background-image: url("./assets/grid.gif");
  background-color: #fff;
}
.mxCellEditor.mxPlainTextEditor {
  position: absolute;
}
</style>
