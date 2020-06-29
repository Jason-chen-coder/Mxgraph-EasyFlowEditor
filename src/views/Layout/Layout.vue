<template>
  <div ref="graph_container" class="graph_container"></div>
</template>

<script>
import { mxHierarchicalLayout, mxGraph, mxUtils } from 'mxgraph-js'

export default {
  name: 'HelloWorld',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 创建一个mxGraph 实例
      var graph = new mxGraph(this.$refs.graph_container);
      var model = graph.getModel();
      var parent = graph.getDefaultParent();

      var doc = mxUtils.createXmlDocument();
      // 创建userObject
      var uo1 = doc.createElement('person');
      uo1.setAttribute("firstName", 'Sponge');
      uo1.setAttribute("lastName", 'Bob')

      var uo2 = doc.createElement('person');
      uo2.setAttribute("firstName", "Super");
      uo2.setAttribute("lastName", 'Man');

      var uo3 = doc.createElement('person');
      uo3.setAttribute("firstName", "Good");
      uo3.setAttribute("lastName", 'Boy');

      var uo4 = doc.createElement('person');
      uo4.setAttribute("firstName", "Bad");
      uo4.setAttribute("lastName", 'Girl');
      // 定义convertValueSTotring方法
      graph.convertValueToString = function (cell) {
        if (mxUtils.isNode(cell.value)) {
          // 判断节点类型是否为'person'
          if (cell.value.nodeName == "person") {
            var firstName = cell.getAttribute("firstName", '');
            var lastName = cell.getAttribute("lastName", '');
            if (lastName != null && lastName.length > 0) {
              return lastName + '---' + firstName;
            }
            return firstName
          }
        }
        return '';
      };

      // 创建一个布局实例
      var layout = new mxHierarchicalLayout(graph)
      // var layout = new mxCircleLayout(graph,20)
      model.beginUpdate();
      try {
        // 绘制节点
        var child1 = graph.insertVertex(parent, null, uo1, 300, 100, 80, 30, 'fillColor=#3CAEA3;strokeColor = white;rounded=1;fontStyle=1');
        var child2 = graph.insertVertex(parent, null, uo2, 20, 20, 80, 30, 'fillColor=#3CAEA3;strokeColor = white;rounded=1;fontStyle=1');
        var child3 = graph.insertVertex(parent, null, uo3, 200, 150, 80, 30, 'fillColor=#3CAEA3;strokeColor = white;rounded=1;fontStyle=1');
        var child4 = graph.insertVertex(parent, null, uo4, 300, 150, 80, 30, 'fillColor=#3CAEA3;strokeColor = white;rounded=1;fontStyle=1');

        // 绘制连线
        graph.insertEdge(parent, null, '', child1, child2, 'strokeColor=#F6D55C');
        graph.insertEdge(parent, null, '', child1, child3, 'strokeColor=#F6D55C');
        graph.insertEdge(parent, null, '', child1, child4, 'strokeColor=#F6D55C');
        graph.insertEdge(parent, null, '', child2, child4, 'strokeColor=#F6D55C');

        layout.execute(parent)
      }
      finally {
        model.endUpdate()
      }
    }
  }
};
</script>

<style scoped>
</style>

