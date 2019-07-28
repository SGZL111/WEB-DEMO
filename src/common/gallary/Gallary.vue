<template>
  <div class="container" @click="handleGallaryClick">
    <div class="wrapper">
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in imgs" :key="index">
          <img class="gallary-img" :src="item" >
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonGallary',
  props: {
    imgs: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
      }
    }
  },
  methods: {
    handleGallaryClick () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
  //  在swiper组件上默认有一个.swiper-container类，设置了overflow：hidden，使得下面设置.swiper-pagination样式依然 不可见
  .container >>> .swiper-container
    overflow :inherit
  .container
    z-index : 1
    display :flex
    flex-direction :column
    justify-content :center // 纵向居中
    position :fixed
    left:0
    right:0
    top:0
    bottom :0
    background :#000
    .wrapper
      .gallary-img
        width :100%
      .swiper-pagination
        color :#fff
        bottom: -1rem

</style>
