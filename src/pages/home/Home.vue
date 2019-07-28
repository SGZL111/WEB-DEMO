<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="SwiperList"></home-swiper>
    <home-icons :list="iconsList"></home-icons>
    <home-recommend :list="recommend"></home-recommend>
    <home-weekend :list="weekend"></home-weekend>
  </div>
</template>

<!--以下  export default不需要前面空两格，会发生警告-->
<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data () {
    return {
      SwiperList: [],
      iconsList: [],
      recommend: [],
      weekend: [],
      lastCity: ''
    }
  },
  computed: {
    ...mapState(['city'])
  },
  mounted () {
    // 页面初次被加载时，一定会发送一个Ajax请求
    console.log('mounted')
    this.lastCity = this.city
    this.getHomeInfo()
  },
  activated () {
    // 当页面被重新显示时，activated一定会被重新执行
    // 判断当前城市和上一次城市是否一致，若不一致，则重新发送Ajax请求获取新的城市相关数据
    console.log('activated')
    // this.lastCity是一个临时缓冲变量，用于判断当前城市和上一次城市是否一致
    if (this.lastCity !== this.city) {
      this.lastCity = this.city
      this.getHomeInfo()
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        this.SwiperList = res.data.swiperList
        this.iconsList = res.data.iconsList
        this.recommend = res.data.recommendList
        this.weekend = res.data.WeekendList
      }
    }
  }
}
</script>

<style scoped>

</style>
