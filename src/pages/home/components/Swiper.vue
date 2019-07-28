<template>
  <!--template 中的代码 来源于： https://github.com/surmon-china/vue-awesome-swiper -->
  <div class="wrapper">
  <swiper :options="swiperOption" v-if="showSwiper">
    <!-- slides -->
    <swiper-slide v-for="item of list" :key="item.id">
      <img class="swipe-img" :src="item.imgUrl" >
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <!--滚动 左右按钮-->
    <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
    <!--<div class="swiper-button-next" slot="button-next"></div>-->
    <!--滚动条-->
    <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
  </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data: function () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination', // 轮播点
        loop: true,
        autoplay: 3000 // autoplay: true虽然自动轮播了但是速度很快，直接在后面跟时间设置就好
      }
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  }
}
</script>
<!-- 在wrapper设置宽高比的写法 -->
<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff
  .wrapper
    overflow :hidden
    width: 100%
    height:0
    padding-bottom :25%
    .swipe-img
      width: 100%
</style>
