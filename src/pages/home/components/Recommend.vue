<template>
  <div class="">
    <div class="title">热销推荐</div>
    <ul>
      <!--border-bottom类：1像素边框，在项目最开始已经引入了border.css文件-->
      <router-link :to="'/detail/'+item.id" tag="li" class="item border-bottom" v-for="item of list" :key="item.id">
        <img  class="item-img" :src="item.imgUrl" alt="">
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-btn">查看详情</button>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
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
    display :flex // 弹性布局
    height :1.9rem
    .item-img
      width :1.7rem
      height :1.7rem
      padding :0.1rem
    .item-info
      padding : 0.1rem
      /*以下两句话是为了保证内容不超出容器范围*/
      flex :1
      min-width :0
      .item-title
        line-height :0.54rem
        font-size :0.32rem
        ellipse()
      .item-desc
        line-height :.4rem
        color :#ccc
        ellipse()
      .item-btn
        background :#ff9300
        padding 0 .2rem
        border-radius :0.06rem
        color :#fff
        line-height :.44rem
        margin-top :.16rem
</style>
