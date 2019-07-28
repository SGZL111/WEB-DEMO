<template>
  <div class="header">
    城市选择
    <router-link to="/">
      <div class="header-back">
        <span class="iconfont">&#xe624;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CityHeader'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variable.styl'
  .header
    overflow :hidden
    height :$headerHeight
    line-height :$headerHeight
    text-align :center
    color :#fff
    background :$bgColor
    font-size :.32rem
    position :relative
    .header-back
      position :absolute
      top:0
      left :0
      padding-left :.2rem
      text-align :center
      color :#fff
</style>
