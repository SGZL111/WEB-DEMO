<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id" >
          <div class="icon-img" >
            <img class="icon-img-content" :src="item.imgUrl" >
          </div>
          <p class="icon-text">{{item.desc}}</p>
        </div>
      </swiper-slide>
      <!--<div class="swiper-pagination"  slot="pagination"></div>-->
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        autoplay: false // 设置是否自动播放
      }
    }
  },
  computed: {
    pages () {
      const pages = []
      this.list.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<!--.icons中设置宽高比为2：1-->
<!--.icon中设置该div的宽为父元素的25%，高为父元素宽度的25%-->
<style lang="stylus" scoped>
  @import '~styles/variable.styl'
  @import '~styles/mixins.styl'
  .icons >>> .swiper-container
    width :100%
    height :0
    padding-bottom :50%
    margin-bottom :.1rem
  .icon
    position :relative
    float :left
    width :25%
    height :0
    padding-bottom :25%
    .icon-img
      position :absolute
      top :0
      left :0
      right : 0
      bottom : 0.44rem
      padding :.1rem
      .icon-img-content
        height :100%
        display :block
        margin: 0 auto
    .icon-text
      position :absolute
      left :0
      right : 0
      bottom : 0rem
      height :0.44rem
      line-height :0.44rem
      color :$textColor
      text-align :center
      ellipse()

</style>
