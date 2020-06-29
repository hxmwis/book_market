<template>
  <div>
    <nav-bar>
      <div @click="dialogVisible = true" class="admim" slot="lright">
        <img src="~assets/img/管理员.png" alt />
        <el-dialog title="管理员登录" :visible.sync="dialogVisible" :append-to-body="true" width="30%">
          <el-form :model="adminInfo">
            <el-form-item>
              <el-input prefix-icon="el-icon-user-solid" placeholder="admin" v-model="adminInfo.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-lock" placeholder="password" v-model="adminInfo.password"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="adminLogin">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
export default {
  name: "IndexNavBar",
  data() {
    return {
      dialogVisible: false,
      adminInfo: {
        name: "hxmwis",
        password: "13576941722h"
      }
    };
  },
  methods: {
    adminLogin() {
      this.dialogVisible = false;
          var _this = this;
          //this.$reqs就访问到了main.js中绑定的axios
          this.$reqs
            .post("/users/adminLogin", {
              username: this.adminInfo.name,
              password: this.adminInfo.password
            })
            .then(function(result) {
              //成功
              console.log(result);
              // console.log(result.config.data);
              if (result.data.err) {
                alert(result.data.err)
              } else {
                _this.$router.push("/adminpage");
              }
            })
            .catch(function(error) {
              //失败
              console.log(error);
            });
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.admim {
  width: 100%;
  margin-left: 80px;
  transition: margin-left 1s;
}
.admim img {
  margin-top: 14px;
  margin-left: 30px;
  width: 40px;
  height: 40px;
  border-radius: 0;
}
.admim:hover {
  cursor: pointer;
  margin-left: -5px;
}
</style>
