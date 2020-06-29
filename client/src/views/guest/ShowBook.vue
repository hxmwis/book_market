<template>
  <div class="show-book">
    <el-row>
      <el-col :span="4">
        <div class="grid-content left"></div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content center">
          <input v-model="search" placeholder="输入图书关键字搜索" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content right"></div>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData.filter(data => !search || data.bookname.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
            <el-table-column label="" prop="" width="180"></el-table-column>
            <el-table-column label="图书编号" prop="booknob" width="180"></el-table-column>
            <el-table-column label="图书号" prop="bookno" width="180"></el-table-column>
            <el-table-column label="图书名" prop="bookname" width="180"></el-table-column>
            <el-table-column label="单价" prop="sellprice" width="180"></el-table-column>
            <el-table-column label="备注" prop="remark" width="360"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleBuy(scope.row,scope.$index)">购买</el-button>
                <!-- 购物窗口 -->
                <el-dialog title="购入数量" :visible.sync="dialogFormVisible" :append-to-body="true">
                  <el-input-number v-model="tableData[scope.$index].buynum" :min="1" :max="99"></el-input-number>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible=false">取 消</el-button>
                    <el-button type="primary" @click="sureBuy(scope.row)">确 定</el-button>
                  </div>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowBook",
  props: {
    userId: {
      type: String
    }
  },
  data() {
    return {
      tableData: [
        {
          buynum: "1"
        }
      ],
      orderAdd: {
        guestname: this.userId
      },
      dialogFormVisible: false,
      search: '',
      randomId: "",
      currData: {}
    };
  },
  // 展示所有书籍
  created(page) {
    // console.log("被创建");
    var _this = this;
    this.$reqs
      .post("/users/showSbook", {
        page: page
      })
      .then(function(result) {
        //成功
        console.log(result);
        _this.tableData = result.data.data
      })
      .catch(function(error) {
        //失败
        console.log("失败");
        console.log(error);
      });
  },
  methods: {
    // 生成一个随机id
    getRandomId() {
      this.randomId = Math.random()*999;
    },
    // 点击购买
    handleBuy(item,index) {
      this.dialogFormVisible = true;
      this.currData = item;
      // console.log(index);
    },
    // 确认购买
    sureBuy(item) {
      this.getRandomId();
      this.dialogFormVisible = false
      // console.log(item);
      this.orderAdd = this.currData;
      this.orderAdd.name = this.userId;
      this.orderAdd._id = this.randomId;
      this.orderAdd.buynum = item.buynum;
      // this.orderAdd = item;
           // 注册成功
         this.$reqs.post('/users/orderAdd',this.orderAdd)
			 	.then((result)=>{
			 		//成功
           // console.log(result);
          this.$message.success("购买成功，可在-我的订单-中查看")
			 	}).catch(function (error) {
			 		//失败
			     console.log(error)
			 	});
      // console.log(this.num);
    }
  }
};
</script>

<style scoped>
.show-book {
  padding-top: 80px;
}
.show-book .grid-content {
  min-height: 100px;
}
.show-book .table {
  margin-top: 120px;
}
.center input {
  margin-top: 60px;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  text-align: center;
  font-size: 16px;
  transition: box-shadow 1.5s;
}
.center input:focus {
  box-shadow: 10px 10px 5px #888888;
}
</style>
