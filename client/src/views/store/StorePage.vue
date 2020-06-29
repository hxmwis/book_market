<template>
  <div>
    <store-nav-bar></store-nav-bar>
    <store-book :userId="userId"></store-book>
  </div>
</template>

<script>
import StoreNavBar from 'views/store/StoreNavBar'
import StoreBook from 'views/store/StoreBook'
export default {
  name: 'StorePage',
  data(){
    return {
      userId: ''
    }
  },
  created() {
    // 获取销售商id
    this.userId = this.$route.query.store;
  },
  components: {
    StoreNavBar,
    StoreBook
  }
}
</script>

<style scoped>
</style>
