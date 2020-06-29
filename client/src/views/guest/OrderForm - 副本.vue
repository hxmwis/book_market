<template>
  <div class="order-form">
    <el-link><h2 @click="drawerOrder = true">我的订单</h2></el-link>
        <el-drawer
        :visible.sync="drawerOrder"
        :modal-append-to-body="false"
        :with-header="false"
        >
        <el-divider content-position="left">{{userId}}</el-divider>
        <el-input 
        placeholder="搜索我的订单"
        v-model="Order"
        >
        <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-backtop target=".el-drawer__body"></el-backtop>
        </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'OrderForm',
  props: {
    userId: {
      type: String
    }
  },
  data(){
    return {
      drawerOrder: false,
      Order: '',
      orderData: []
    }
  },
  // 展示当前用户的订单
  created(page) {
    // console.log("被创建");
    var _this = this;
    this.$reqs
      .post("/users/showMyOrder", {
        page: page
      })
      .then(function(result) {
        //成功
        console.log(result);
        _this.orderData = result.data.data
      })
      .catch(function(error) {
        //失败
        console.log("失败");
        console.log(error);
      });
  }
}
</script>

<style>
.order-form .el-drawer__body {
  overflow: auto;
}
</style>
