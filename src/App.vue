<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// require('mxgraph/javascript/src/css/common.css')
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
/* .header {
  height: 8vh !important;
} */
.aside {
  height: 100vh;
  border: 1px solid #ededed;
}
.menu-row {
  width: 100%;
}
.main {
  height: 100vh;
  border: 1px solid #ededed;
  background-color: #efefef;
  padding: 0;
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
