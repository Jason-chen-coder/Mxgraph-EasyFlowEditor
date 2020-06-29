<template>
  <div ref="graph_container" class="graph_container"></div>
</template>

<script>
import { mxGraph } from 'mxgraph-js'


export default {
  name: 'HelloWorld',
  mounted () {
    var graph = new mxGraph(this.$refs.graph_container);

    var parent = graph.getDefaultParent();

    graph.getModel().beginUpdate();
    try {
      let v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
      let v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);

      graph.insertEdge(parent, null, '', v1, v2);
    } finally {
      graph.getModel().endUpdate();
    }
  }
};
</script>

<style scoped>
</style>

