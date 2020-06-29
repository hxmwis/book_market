<template>
  <div class="nav-menu">
    <el-tabs activeName="first" tab-position="left" style="height: auto;">
      <el-tab-pane label="用户管理" name="first">
        <guest-manage></guest-manage>
      </el-tab-pane>
      <el-tab-pane label="销售商管理" name="second">
        <store-manage></store-manage>
      </el-tab-pane>
      <el-tab-pane label="留言管理" name="third">
        <message-manage></message-manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GuestManage from 'views/admin/GuestManage'
import StoreManage from 'views/admin/StoreManage'
import MessageManage from 'views/admin/MessageManage'
export default {
  name: 'NavMenu',
  data(){
    return {
    }
  },
  components: {
    GuestManage,
    StoreManage,
    MessageManage
  }
}
</script>

<style scoped>
</style>
