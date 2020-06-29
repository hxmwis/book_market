<template>
  <div>
    <el-table
      :data="messageData.filter(data => !search || data.userid.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="序号" prop="" width="60">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column label="用户名" prop="userid" width="120"></el-table-column>
      <el-table-column label="留言内容" prop="content" width="660"></el-table-column>
      <el-table-column label="留言时间" prop="date"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入用户关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delMessage(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MessageManage',
  data(){
    return {
      messageData:[],
      search: ''
    }
  },
  // 展示所有留言
  created(page) {
    // console.log("被创建");
    var _this = this;
    this.$reqs
      .post("/users/showMessage", {
        page: page
      })
      .then(function(result) {
        //成功
        console.log(result);
        _this.messageData = result.data.data
      })
      .catch(function(error) {
        //失败
        console.log("失败");
        console.log(error);
      });
  },
  methods: {
    // 删除一条留言
    delMessage(index,item) {
      this.$reqs
        .post("/users/deleteMessage", item)
        .then(result => {
          //成功
          console.log(result);
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
      this.messageData.splice(index, 1);
      // 弹出成功提示
      this.$message({
        message: "删除成功",
        type: "success"
      });
    }
  }
}
</script>

<style scoped>
</style>
