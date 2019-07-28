<template>
  <!--ref 用于获取DOM-->
  <div class="list" ref="wrapper">
    <div>
    <div class="area">
      <div class="title border-topbottom">
        当前城市
      </div>
      <div class="button-list">
        <div class="button-wrapper" >
          <div class="button">{{this.currentCity}}</div>
        </div>
      </div>
    </div>
    <div class="area">
      <div class="title border-topbottom">热门城市</div>
      <div class="button-list">
        <div class="button-wrapper" v-for="item of hot" :key="item.id" @click="handleCityClick(item.name)">
          <div class="button sec">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="area" v-for="(items,key) of cities"  :key="key" :ref="key" >
      <div class="title border-topbottom">{{key}} </div>
      <div class="item-list">
        <div class="item border-bottom"  v-for="innerItem of items" :key="innerItem.id" @click="handleCityClick(innerItem.name)">{{innerItem.name}}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'CityList',
  props: {
    hot: Array,
    cities: Object,
    letter: String
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  mounted () {
    // 获取DOM元素，相当于let list = document.querySelector('.list')；let scroll = new BScroll(list)
    this.scroll = new BScroll(this.$refs.wrapper)
  },
  watch: {
    // 在watch中监听letter的变化
    letter () {
      if (this.letter) {
        // 返回的ele是一个数组，记录了一条 div.area 的数据，但在this.scroll.scrollToElement()中参数必须是一个DOM元素，所以传入数据为ele[0]
        const ele = this.$refs[this.letter]
        // 只需要这一句话就可以实现：点击字母表的字母使页面中显示相应的城市列表
        this.scroll.scrollToElement(ele[0])
      }
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
  @import '~styles/variable.styl'
  .border-bottom
    &:before
      border-color :#ccc
    &:after
      border-color :#ccc
  .border-topbottom
    &:before
      border-color :#ccc
    &:after
      border-color :#ccc
  .list
    overflow :hidden
    position :absolute
    top: 1.58rem
    left:0
    right :0
    bottom :0
    .title
      line-height :.5rem
      background :#eee
      padding-left :.2rem
      color :#666
      font-size :.26rem
    .button-list
      padding :.1rem .6rem .1rem .1rem
      overflow :hidden
      .button-wrapper
        width :33.33%
        float :left
        .button
          color :$bgColor
          padding :.1rem
          text-align :center
          margin :.1rem
          border: .02rem solid $bgColor
          border-radius :0.06rem
        .sec
          border-color: #ccc
          color :black
    .item-list
      line-height :.76rem
      color :#666
      padding-left :.2rem
</style>
