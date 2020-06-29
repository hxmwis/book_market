<template>
  <div class="box">
    <div><slot name="title"></slot></div>
    <input type="text" placeholder="请输入用户名" v-model="userVal" @blur="userCheck" />
    <i class="el-icon-error" v-show="isShow1">用户名由2-8个字符组成！</i>
    <input type="password" placeholder="请输入密码" v-model="pwdVal" @blur="pwdCheck" />
    <i class="el-icon-error" v-show="isShow2">密码由4-16个字符组成！</i>
    <slot name="repwd">
      <input type="password" placeholder="请确认密码" v-model="repwdVal" @blur="repwdCheck" />
    </slot>
    <i class="el-icon-error" v-show="isShow3">密码前后不一致！</i>
    <slot name="submit">
      <input type="submit" value="登录" />
    </slot>
    <input type="reset" value="重置" />
  </div>
</template>

<script>
export default {
  name: 'LoginRegister',
  data() {
    return {
      userVal: '',
      pwdVal: '',
      repwdVal: '',
      isShow1: false,
      isShow2: false,
      isShow3: false,
      // isDisabled: true
    }
  },
  methods: {
    // 检查用户名是否符合规范
    userCheck() {
      if(this.userVal.length < 2 || this.userVal.length > 8) {
        this.isShow1 = true
      }else {
        this.isShow1 = false
      }
    },
    // 检查密码是否符合规范
    pwdCheck(pwdVal) {
      if(this.pwdVal.length < 4 || this.pwdVal.length > 16) {
        this.isShow2 = true
      }else {
        this.isShow2 = false
      };
      // 检查disabled
      // if(this.isShow1 == true || this.isShow2 == true || this.isShow3 == true) {
      //   this.isDisabled = true
      // }else {
      //   this.isDisabled = false
      // }
    },
    // 检查密码前后是否一致
    repwdCheck() {
      if(this.repwdVal == this.pwdVal) {
        this.isShow3 = false
      }else {
        this.isShow3 = true
      };
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 450px;
  border: 1px solid black;
  border-radius: 25px;
  text-align: center;
}
.box div {
  width: 100%;
  /* margin-top: 20px; */
}
.box input {
  width: 300px;
  height: 50px;
  font-size: 20px;
  border: 0;
  outline: none;
  border-bottom: 2px solid #eee;
}
.box i {
  color: red;
}
</style>
