<template>
  <div>
    <el-table
      :data="storeData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="序号" prop="" width="60">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="密码" prop="repwd"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入用户关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delGuest(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "guestManage",
  data() {
    return {
      storeData:[],
      search: ''
    };
  },
  // 展示所有销售商
  created(page) {
    // console.log("被创建");
    var _this = this;
    this.$reqs
      .post("/users/showStore", {
        page: page
      })
      .then(function(result) {
        //成功
        console.log(result);
        _this.storeData = result.data.data
      })
      .catch(function(error) {
        //失败
        console.log("失败");
        console.log(error);
      });
  },
  methods: {
    // 删除一个销售商
    delGuest(index,item) {
      this.$reqs
        .post("/users/deleteStore", item)
        .then(result => {
          //成功
          console.log(result);
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
      this.storeData.splice(index, 1);
      // 弹出成功提示
      this.$message({
        message: "删除成功",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
</style>
