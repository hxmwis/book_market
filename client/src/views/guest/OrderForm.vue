<template>
  <div class="order-form">
    <el-row>
      <el-col :span="4">
        <div class="grid-content left">
          <img title="回到主页" @click="back" src="../../assets/img/flag.jpg" alt="">
        </div>
      </el-col>

      <el-col :span="16">
        <div class="grid-content center">
          <el-table
            :data="orderData.filter(data => !search || data.bookname.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
          >
            <el-table-column label="入库编号" prop="booknob" width="120"></el-table-column>
            <el-table-column label="图书号" prop="bookno" width="120"></el-table-column>
            <el-table-column label="图书名称" prop="bookname" width="120"></el-table-column>
            <el-table-column label="单价" prop="sellprice" width="80"></el-table-column>
            <el-table-column label="数量" prop="buynum" width="80"></el-table-column>
            <el-table-column label="总价" prop="totalPrice" width="80"></el-table-column>
            <el-table-column label="备注" prop="remark" width="280"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入图书名搜索" />
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="delOrder(scope.row,scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "OrderForm",
  data() {
    return {
      orderData: [
        {
          totalPrice: ''
        }
      ],
      userId: "",
      search: ""
    };
  },
  // 展示当前用户的订单
  created(page) {
    // 获取当前用户的id
    this.userId = this.$route.query.user;
    // console.log("被创建");
    var _this = this;
    this.$reqs
      .post("/users/showMyOrder", {
        page: page
      })
      .then(function(result) {
        //成功
        console.log(result);
        _this.orderData = result.data.data.filter(
          item => item.name == _this.userId
        );
        // 计算总价
        for(var i=0;i<_this.orderData.length;i++) {
          _this.orderData[i].totalPrice = _this.orderData[i].sellprice *  _this.orderData[i].buynum;
        }
      })
      .catch(function(error) {
        //失败
        console.log("失败");
        console.log(error);
      });
  },
  methods: {
    // 删除订单
    delOrder(item,index) {
      this.$reqs.post('/users/deleteOrder',item)
				.then((result)=>{
					//成功
					console.log(result)
				}).catch(function (error) {
					//失败
			    console.log(error)
				});
      this.orderData.splice(index, 1)
      // 弹出成功提示
      this.$message({
        message: "删除成功",
        type: "success"
      });
    },
    // 回到主页
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.order-form .grid-content {
  min-height: 10px;
}
.order-form .left img {
  width: 55px;
  height: 55px;
  margin-left: 80px;
  margin-top: 7px;
  border-radius: 50%;
}
.order-form .left img:hover {
  cursor: pointer;
}
.order-form .center {
  margin-top: 60px;
}
</style>
