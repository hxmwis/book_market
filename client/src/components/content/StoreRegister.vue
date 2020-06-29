<template>
  <div class="register">
    <h2>销售商注册</h2>
    <el-form :model="form" action="123333" :rules="rules" ref="form" status-icon>
      <el-form-item prop="name">
        <el-input v-model="form.name" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" show-password prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="repwd">
        <el-input v-model="form.repwd" show-password prefix-icon="el-icon-lock" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      <!-- <input type="submit" value="1111"> -->
    </el-form>
    <!-- <el-link type="info" href="#">已有账号？去登录->></el-link> -->
  </div>
</template>

<script>
export default {
  name: "StoreRegister",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.repwd !== "") {
          this.$refs.form.validateField("repwd");
        }
        if (this.form.password.length > 16) {
        callback(new Error("密码不能大于16个字符！"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        password: "",
        repwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        repwd: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 表单数据提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var _this = this;
          // 注册成功
          this.$reqs.post('/users/storeAdd',this.form)
				.then((result)=>{
					//成功
					console.log(result);
          this.$notify({
            title: "注册成功",
            position: 'bottom-right',
            type: 'success',
            offset: 320
          });
          _this.form = {
            name: "",
            password: "",
            repwd: ""
          }
				}).catch(function (error) {
					//失败
			    console.log(error)
				});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.register {
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
