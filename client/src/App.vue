<template>
  <div id="app">
    <!-- <index-page path="/indexPage"></index-page> -->
    <router-view></router-view>
  </div>
</template>

<script>
import IndexPage from 'views/index/IndexPage'
export default {
  name: 'App',
  components: {
    IndexPage
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: rgba(238,237,237);
}
</style>
