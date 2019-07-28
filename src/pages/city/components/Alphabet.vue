<template>
  <div class="list">
    <ul>
      <!--在touchstart事件添加prevent事件修饰符，阻止touchStart的默认行为，就不会发生手机端 城市列表页面随 字母表一起上下滚动的效果了-->
      <li class="item" v-for="item of letters" :key="item" @click="handleLetterClick"  @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" :ref="item">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  // 当页面的数据被更新的同时页面完成渲染后，updated钩子函数执行
  updated () {
    // startY是字母"A"至list顶部的距离
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick (e) {
      // 由$emit()事件向外传递数据给父组件
      this.$emit('change', e.target.innerHTML)
    },
    // TouchStart z之后才可以触发TouchMove，在data中定义一个标志位touchStatus
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        // 函数节流 来限制函数执行的频率
        // 如果已经存在，把this.timer去除掉，否则创建一个新的this.timer
        // 延迟16ms之后再执行，假设在这16ms之内又进行了手指的滚动，那么它会把上一次要做的动作清除掉并重新执行这一次要做的事情！！！
        // 通过这种方式大大节约函数的执行频率，提高性能，而且在肉眼上是看不出来很大的变化
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          // e.touches[0]表示一些手指的信息，clientY是手指到页面最顶部的距离
          // 当前手指到list顶部的距离 = 手指到页面最顶部的距离 - 页面顶部蓝色区域的高度
          const touchY = e.touches[0].clientY - 79
          // index从0计数: 当前手指所在的位置是第index个字母 = （当前手指到list顶部的距离 - 字母"A"至list顶部的距离）/ 每个字母的高度
          const index = Math.floor((touchY - this.startY) / 20)
          // 这里要判断index的值，不要让它超出范围，不然后面数据都不存在，会出错
          if (index >= 0 && index <= this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style  lang="stylus" scoped>
  @import "~styles/variable.styl"
  .list
    display :flex
    flex-direction :column
    justify-content :center
    position :absolute
    right:0
    top:1.58rem
    bottom :0
    width:.4rem
    .item
      text-align :center
      line-height :.4rem
      color :$bgColor
</style>
