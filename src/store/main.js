import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

// 使用Vuex插件
Vue.use(Vuex)

// 导出Vuex创建的一个store仓库
export default new Vuex.Store({
  //  state存放的是全局公用的数据
  state,
  mutations
})
