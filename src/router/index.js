/*
 * @Descripttion: 
 * @version: 
 * @Author: Jason chen
 * @Date: 2020-06-26 17:46:26
 * @LastEditors: Jason chen
 * @LastEditTime: 2021-08-30 15:13:17
 */
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
      component: () => import(/*webpackChunkName: "my-customToolbar-chunk"*/ "../views/customToolbar/customToolbar.vue"),
    },
    {
      path: "/customToolbar",
      component: () => import(/*webpackChunkName: "my-customToolbar-chunk"*/ "../views/customToolbar/customToolbar.vue")
    },
    {
      path: "/renderModel",
      component: () => import(/*webpackChunkName: "renderModel-chunk"*/"../views/renderModel/index.vue")
    }
  ]
})
export default router