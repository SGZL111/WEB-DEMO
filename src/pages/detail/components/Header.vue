<template>
  <div>
    <router-link to="/" tag="div" class="header-abs" v-show="showAbs">
      <div class="header-abs-back"><span class="iconfont">&#xe624;</span></div>
    </router-link>
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
      景点详情
      <router-link to="/">
        <div class="header-fixed-back">
          <span class="iconfont">&#xe624;</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  activated () {
    // 对window全局对象的事件绑定 会很容易出bug
    // 测试，在 handleScroll()中   console.log('scrolling') ，当滚动页面时会一直输出scrolling，换成首页测试，滚动页面也会输出scrolling！！！
    window.addEventListener('scroll', this.handleScroll)
  },
  // 页面即将被隐藏或是页面即将被替换成新的页面时，组件的deactivated生命钩子被执行！！！
  deactivated () {
    // 对window全局对象的事件进行解绑，这样滚动首页就不会输出scrolling了！！！
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      console.log('scrolling')
      const top = document.documentElement.scrollTop // 滚动距离
      if (top > 60) {
        let opacity = top / 140 // 当滚动距离大于140，蓝条标题应当完全显示
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = {
          opacity // 键值相等时写一个就可以了
        }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variable.styl'
  .header-abs
    position :absolute
    left: .2rem
    top: .2rem
    width: .8rem
    height: .8rem
    border-radius :.4rem
    background :rgba(0,0,0,0.5)
    text-align :center
    line-height :.8rem
    .header-abs-back
      color :#fff
      font-size :.44rem
  .header-fixed
    z-index:2
    position :fixed
    top:0
    left:0
    right :0
    overflow :hidden
    height :$headerHeight
    line-height :$headerHeight
    text-align :center
    color :#fff
    background :$bgColor
    font-size :.32rem
    .header-fixed-back
      position :absolute
      top:0
      left :0
      padding-left :.2rem
      text-align :center
      color :#fff

</style>
