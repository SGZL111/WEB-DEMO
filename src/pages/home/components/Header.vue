<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont">&#xe624;</span>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题</div>
    <router-link to="/city">
    <div class="header-right">
      {{this.city}}
      <span class="iconfont icon-right">&#xe6aa;</span>
    </div>
    </router-link>
  </div>
</template>

<!--以下  export default不需要前面空两格，会发生警告-->
<script>
import {mapState} from 'vuex'
export default {
  name: 'HomeHeader',
  // mapState 把vuex中的数据映射到该组件的computed计算属性里，把'city'这个公用数据映射到名字叫做'city'的计算属性之中
  computed: {
    ...mapState(['city'])
  }
}
</script>

<!--scoped 确保只对当前的组件有效-->
<!-- 1rem = html font-size = 50px -->
<!-- 设计图上是86px,在移动端有个两倍的关系，应设置为43px,而 43px = 0.86rem ，使用rem单位的话刚好是86/100 rem -->
<style lang="stylus" scoped>
  /*@import '../../../assets/styles/variable.styl'*/
  /*@import '~@/assets/styles/variable.styl'*/
  @import '~styles/variable.styl'
  .header
    display:flex
    height: $headerHeight
    line-height:$headerHeight
    background-color:$bgColor
    color :#fff
    .header-left
      width:0.64rem
      float:left
      text-align :center
      .iconfont
        font-size :0.4rem
    .header-input
      flex:1   // 让中间部分占据剩余空间
      background :#fff
      border-radius :0.1rem
      margin-top :0.12rem
      margin-left :0.2rem
      padding-left :0.2rem
      height :0.64rem
      line-height :0.64rem
      color :#ccc
    .header-right
      min-width:1.04rem
      padding  0 .1rem
      float: right
      text-align :center
      color : #fff
      .icon-right
        margin-left :-0.1rem

</style>
