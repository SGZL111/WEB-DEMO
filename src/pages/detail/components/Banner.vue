<template>
  <div>
    <div class="banner" @click="handleClick" >
      <img class="banner-img" :src="bannerImg" alt="">
      <div class="banner-info">
        <div class="banner-tittle">{{this.sightName}}</div>
        <div class="banner-number"><span class="iconfont banner-icon">&#xe606; </span>11</div>
      </div>
    </div>
    <common-fade>
      <!--slot 代表的就是 common-gallary-->
      <common-gallary :imgs="gallaryImgs" v-if="showGallary" @close="handleGallaryClose"></common-gallary>
    </common-fade>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
import CommonFade from 'common/fade/Fade'
export default {
  name: 'Banner',
  components: {
    CommonGallary,
    CommonFade
  },
  props: {
    sightName: String,
    bannerImg: String,
    gallaryImgs: Array
  },
  data () {
    return {
      showGallary: false,
      imgs: ['http://img1.qunarzz.com/sight/p0/1907/aa/aa4500ed427eee05a3.img.jpg_r_800x800_262436e7.jpg',
        'http://img1.qunarzz.com/sight/p0/1611/7f/7fe6e4391a5171b2a3.img.jpg_r_800x800_10136e2a.jpg']
    }
  },
  methods: {
    handleClick () {
      this.showGallary = true
    },
    handleGallaryClose () {
      this.showGallary = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  /*@import '~styles/variables.styl'*/
  .banner
    position :relative
    overflow :hidden
    height:0
    padding-bottom:55%
    .banner-img
      width: 100%
    .banner-info
      display :flex
      position :absolute
      left:0
      right:0
      bottom:0
      /*top:0*/
      line-height :.4rem
      color :#fff
      padding :0 .1rem
      background-image :linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.8))
      .banner-tittle
        flex :1
        font-size :.32rem
      .banner-number
        padding  0 .2rem
        line-height :.4rem
        border-radius :.2rem
        background :rgba(0,0,0,0.5)
        font-size :.24rem
        .banner-icon
          font-size :.24rem

</style>
