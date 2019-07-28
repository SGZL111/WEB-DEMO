<template>
  <div>
    <div class="search">
      <input type="text" class="searchInput" placeholder="输入城市名或拼音" v-model="keyword">
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li class="search-item border-bottom" v-for="item of list" :key="item.id" @click="handleCityClick(item.name)">{{item.name}}</li>
        <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        // 遍历cities对象中的内容
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(this.keyword) > -1 ||
            value.name.indexOf(this.keyword) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  mounted () {
    // 创建一个scroll
    this.scroll = new BScroll(this.$refs.search)
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  methods: {
    handleCityClick (city) {
      // this.$store.commit('changeCityMutation', city)
      this.changeCityMutation(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCityMutation'])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  .search-content
    position :absolute
    overflow :hidden
    top:1.58rem
    left:0
    right:0
    bottom:0
    z-index :1    // 设置堆叠顺序，在原始页面之上
    background :#eee
    .search-item
      line-height:.62rem
      padding-left :.2rem
      color: #666
      background :#fff
  .search
    height :.72rem
    padding :0 .1rem
    background :$bgColor
    .searchInput
      width :100%
      height :.62rem
      line-height :.62rem
      text-align :center
      border-radius :.06rem
      color :#666
      box-sizing :border-box // 如果不加这句话，添加padding会使input框超出页面范围，这说明，设置box-sizing :border-box 后，width包含了padding在内，非W3C盒模型标准
      padding : 0 .1rem

</style>
