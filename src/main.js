import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "./router"
import "./style/iconfont.css"
import JsonViewer from 'vue-json-viewer'
// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
