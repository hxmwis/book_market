<template>
  <div>
    <nav-bar class="guest">
      <div class="left" slot="left">
        <h2 style="color: rgba(96,98,102)">欢迎你，{{userId}}</h2>
      </div>

      <div class="center" slot="center"> 
      </div>

      <div class="right" slot="right">
        <!-- 留言模块 -->
        <el-link @click="goMessage"><h2>留言</h2></el-link>
      </div>
      
      <div class="l-left" slot="lleft">
        <!-- 订单模块 -->
        <el-link @click="goOrder"><h2>我的订单</h2></el-link>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
export default {
  name: "GuestNavBar",
  data() {
    return {
      userId: ""
    };
  },
  created() {
    // 获取用户名
    this.userId = this.$route.query.user;
  },
  components: {
    NavBar
  },
  methods: {
    goMessage() {
      this.$router.push({ path: "/messageboard", query: { user: this.userId}})
    },
    goOrder() {
      this.$router.push({ path: "/orderform", query: { user: this.userId}})
    }
  }
};
</script>

<style>
.guest .right {
  text-align: center;
}
.right .title {
  font-weight: bolder;
  font-size: 18px;
}
/* .right .el-drawer__body {
  overflow: auto;
} */
/* .l-left .el-drawer__body { 
  overflow: auto;
} */
</style>
