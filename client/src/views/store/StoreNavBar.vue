<template>
  <div>
    <nav-bar class="store">
      <div class="left" slot="left">
        <h2 style="color: rgba(96,98,102)">欢迎你，{{storeId}}</h2>
      </div>

      <div class="center" slot="center">
        <h2 style="color: rgba(96,98,102)">销售商管理界面</h2>
      </div>

      <div class="right" slot="right">
        <!-- 留言模块 -->
        <el-link @click="goMessage"><h2>留言</h2></el-link>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
import MessageBoard from 'components/content/MessageBoard'
export default {
  name: 'StoreNavBar',
  data(){
    return {
      storeId: ''
    }
  },
  created() {
    // 获取销售商id
    this.storeId = this.$route.query.store;
  },
  components: {
    NavBar,
    MessageBoard
  },
  methods: {
    goMessage() {
      this.$router.push({ path: "/messageboard", query: { user: this.storeId}})
    }
  }
}
</script>

<style scoped>
.store .center {
  text-align: center;
}
.store .right {
  text-align: center;
}
</style>
