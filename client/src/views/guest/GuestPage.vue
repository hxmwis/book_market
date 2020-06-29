<template>
  <div>
    <guest-nav-bar></guest-nav-bar>
    <show-book :userId="userId"></show-book>
  </div>
</template>

<script>
import GuestNavBar from 'views/guest/GuestNavBar'
import ShowBook from 'views/guest/ShowBook'
export default {
  name: 'GuestPage',
  data(){
    return {
      userId: ""
    }
  },
  created() {
    this.userId = this.$route.query.user
  },
  components: {
    GuestNavBar,
    ShowBook
  }
}
</script>

<style scoped>
</style>
