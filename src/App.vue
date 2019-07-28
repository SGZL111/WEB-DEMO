<!--APP.vue文件是一个单文件组件，放的是vue的一个组件-->
<!--组件内容显示：在终端中进入Travel文件夹，输入 npm run dev 然后打开http://localhost:8080  即可显示出本组件的内容-->
<template>
  <div id="app">
    <!-- <keep-alive>自带标签的作用是：当路由内容被加载过一次后，就把路由内容放到内存之中，下一次再进这个路由时，不需要重新渲染组件，而是直接从内存中读取路由内容显示到页面即可-->
    <keep-alive exclude="Detail">
    <!--router-view显示的是当前路由地址（main.js->router文件夹->index.js->components文件夹->HelloWorld.vue组件）所对应的内容-->
    <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
