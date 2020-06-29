<template>
  <div class="store-book">
    <el-row>
      <el-col :span="3">
        <div class="grid-content left"></div>
      </el-col>

      <el-col :span="18">
        <div class="grid-content center">
          <div class="addBook">
            <el-form :inline="true" :model="formAdd">
              <el-form-item>
                <el-input v-model="formAdd.booknob" placeholder="图书编号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formAdd.bookno" placeholder="图书号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formAdd.bookname" placeholder="图书名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formAdd.sellprice" placeholder="销售单价"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formAdd.remark" placeholder="备注"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-button type="primary" class="add" @click="add">点击添加</el-button>
          <br />
          <br />
        </div>
      </el-col>

      <el-col :span="3">
        <div class="grid-content right"></div>
      </el-col>
    </el-row>
    <!-- 商家书籍 -->
    <div class="table">
      <el-table
        :data="tableData.filter(data => !search || data.bookname.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="" prop="" width="180"></el-table-column>
        <el-table-column label="序号" width="120">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="图书编号" prop="booknob" width="120"></el-table-column>
        <el-table-column label="图书号" prop="bookno" width="120"></el-table-column>
        <el-table-column label="图书名称" prop="bookname" width="180"></el-table-column>
        <el-table-column label="单价" prop="sellprice" width="120"></el-table-column>
        <el-table-column label="备注" prop="remark" width="320"></el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              @click="edit(scope.row, scope.$index)"
              size="small"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>

            <!-- 删除 -->
            <el-button
              @click="remove(scope.row,scope.$index)"
              size="small"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
            <!-- 编辑框 -->
            <el-dialog
              top="3vh"
              title="修改图书信息"
              :visible.sync="dialogFormVisible"
              :append-to-body="true"
            >
              <el-form :model="editInfo">
                <el-form-item label="图书编号">
                  <el-input v-model="editInfo.booknob" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图书号">
                  <el-input v-model="editInfo.bookno" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图书名称">
                  <el-input v-model="editInfo.bookname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单价">
                  <el-input v-model="editInfo.sellprice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="editInfo.remark" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAdd(scope.row,scope.$index)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column label="" prop="" width="120"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "StoreBook",
  props: {
    userId: {
      type: String
    }
  },
  data() {
    return {
      tableData: [],
      formAdd: {
        name: this.userId,
        booknob: "",
        bookno: "",
        bookname: "",
        sellprice: "",
        remark: ""
      },
      editInfo: {
        booknob: "",
        bookno: "",
        bookname: "",
        sellprice: "",
        remark: ""
      },
      saveInfo: {
        booknob: "",
        bookno: "",
        bookname: "",
        sellprice: "",
        remark: ""
      },
      dialogFormVisible: false,
      search: ""
    };
  },
  // 获取要展示的book
  created(page) {
    // 获取当前用户的id
    // console.log("被创建");
    var _this = this;
    this.$reqs
      .post("/users/showSbook", {
        page: page
      })
      .then(function(result) {
        //成功
        console.log(result);
        // _this.tableData = result.data.data;
        // console.log(result.data.data[0]);
        // console.log(result.data.total);
        // _this.name = result.data.data.map(item =>{return {'name':item.name}})
        _this.tableData = result.data.data.filter(
          item => item.name == _this.userId
        );
      })
      .catch(function(error) {
        //失败
        console.log("失败");
        console.log(error);
      });
  },
  methods: {
    // 添加一行数据
    add() {
      if (
        this.formAdd.booknob == "" ||
        this.formAdd.bookno == "" ||
        this.formAdd.bookname == "" ||
        this.formAdd.sellprice == "" ||
        this.formAdd.remark == ""
      ) {
        this.$message.error("不能有空值！");
      } else {
        this.tableData.push(this.formAdd);
        var _this = this;
        // 注册成功
        this.$reqs
          .post("/users/bookAdd", this.formAdd)
          .then(result => {
            //成功
            console.log(result);
          })
          .catch(function(error) {
            //失败
            console.log(error);
          });
        // 清空表单数据
        this.formAdd = {
          booknob: "",
          bookno: "",
          bookname: "",
          sellprice: "",
          remark: ""
        };
        // 弹出成功提示
        this.$message({
          message: "添加成功",
          type: "success"
        });
      }
    },
    // 编辑图书信息
    edit(item, index) {
      (this.dialogFormVisible = true), (this.editInfo = item);
    },
    // 确认编辑
    sureAdd(item, index) {
      this.dialogFormVisible = false;
      this.$reqs
        .post("/users/update", item)
        .then(result => {
          //成功
          console.log(result);
          this.$message.success("修改成功！");
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
    },
    // 删除一组数据
    remove(item, index) {
      this.$reqs
        .post("/users/deleteBook", item)
        .then(result => {
          //成功
          console.log(result);
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
      this.tableData.splice(index, 1);
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
.store-book {
  padding-top: 80px;
}
.store-book .grid-content {
  min-height: 60px;
}
.center .add {
  width: 93%;
  margin-left: 38px;
}
.center .addBook {
  width: 94%;
  margin-left: 37px;
  margin-top: 60px;
}
.store-book .table {
  margin-top: 60px;
}
</style>
