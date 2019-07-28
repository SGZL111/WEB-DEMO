<template>
  <div class="">
    <div class="title">周末去哪儿</div>
    <ul>
      <!--border-bottom类：1像素边框，在项目最开始已经引入了border.css文件-->
      <li class="item border-bottom" v-for="item of list" :key="item.id">
        <div class="item-img-wrapper">
        <img  class="item-img" :src="item.imgUrl" alt="">
        </div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeWeekend',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    line-height :.8rem
    background :#eee
    text-indent :.2rem
  .item
    .item-img-wrapper
      overflow :hidden
      width :100%
      height :0
      padding-bottom :34%
      .item-img
        width :100%
    .item-info
      padding : 0.1rem
      .item-title
        line-height :0.54rem
        font-size :0.32rem
        ellipse()
      .item-desc
        line-height :.4rem
        color :#ccc
        ellipse()
</style>
