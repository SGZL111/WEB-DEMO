import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'

Vue.use(Router)

// 导出一组路由的配置项
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/detail/:id', // 动态路由，后面带一个参数，这个参数会放到id的变量里面
      name: 'Detail',
      component: Detail
    }
  ],
  // 让页面切换的时候始终回到最顶部
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
