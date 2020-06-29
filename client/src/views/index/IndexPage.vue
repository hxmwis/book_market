<template>
  <div>
    <index-nav-bar></index-nav-bar>
    <swiper></swiper>
    <index-template></index-template>
  </div>
</template>

<script>
import IndexNavBar from 'views/index/IndexNavBar'
import Swiper from 'views/index/Swiper'
import IndexTemplate from 'views/index/IndexTemplate'
export default {
  name: 'IndexPage',
  components: {
    IndexNavBar,
    Swiper,
    IndexTemplate
  }
}
</script>

<style scoped>
</style>
