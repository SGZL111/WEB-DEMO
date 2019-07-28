// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './store/main.js'
import 'babel-polyfill'

// 以下styles为别名，具体设置在build/webpack.base.conf.js 中的resolve下的alias中
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import fastClick from 'fastclick'

Vue.config.productionTip = false
fastClick.attach(document.body)
// 使用轮播插件
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */

// 键和值相同可以省略写
new Vue({
  el: '#app', // 程序的入口组件是App.vue
  router,
  store,
  components: { App },
  template: '<App/>'
})
