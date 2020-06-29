<template>
  <div class="login">
    <h2>用户登录</h2>
    <el-form :model="form" action="123" :rules="rules" ref="form">
      <el-form-item prop="name">
        <el-input v-model="form.name" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="form.pwd" show-password prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      <!-- <input type="submit" value="1111"> -->
    </el-form>
    <!-- <el-link type="info" @click="showRegister">没有账号？去注册->></el-link> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 登录成功跳转到一般用户页面
          var _this = this;
          //this.$reqs就访问到了main.js中绑定的axios
          this.$reqs
            .post("/users/login", {
              username: this.form.name,
              password: this.form.pwd
            })
            .then(function(result) {
              //成功
              console.log(result);
              // console.log(result.config.data);
              if (result.data.err) {
                _this.$notify.error({
                  title: "错误",
                  message: result.data.err,
                  position: 'bottom-left',
                  offset: 320
                });
              } else {
                _this.$router
                .push({ path: "/guestpage", query: { user: _this.form.name } })
                .catch(err => {
                  err;
                });
              }
            })
            .catch(function(error) {
              //失败
              console.log("失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 350px;
  /* border: 1px solid black; */
  border-radius: 25px;
  text-align: center;
}
</style>
