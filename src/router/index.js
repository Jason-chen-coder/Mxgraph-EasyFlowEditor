// 导入 vue-router
import Vue from 'vue';
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/',
      component: () => import("../views/customToolbar/customToolbar.vue"),
    },
    {
      path: '/helloworld',
      component: () => import("../views/helloworld/HelloWorld.vue")
    },
    {
      path: "/Layout",
      component: () => import("../views/Layout/Layout.vue")
    },
    {
      path: "/01-editor",
      component: () => import("../views/01-editor/01-editor.vue")
    },
    {
      path: "/customToolbar",
      component: () => import("../views/customToolbar/customToolbar.vue")
    },
    {
      path: "/toolbar",
      component: () => import("../views/toolbar/toolbar.vue")
    },
    {
      path: "/stencilToolbar",
      component: () => import("../views/stencilToolbar/stencilToolbar.vue")
    },
    {
      path: "/renderModel",
      component: () => import("../views/renderModel/index.vue")
    }
  ]
})
export default router