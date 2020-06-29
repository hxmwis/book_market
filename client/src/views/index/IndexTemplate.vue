<template>
  <div class="index-template">
    <el-row>
      <el-col :span="4">
        <div class="grid-content">
        </div>
      </el-col>
      <el-col :span="16" class="center">
        <div class="grid-content">
          <!-- 用户登陆注册 -->
          <div class="guest">
            <div v-if="isShow">
              <login></login>
              <el-link class="link" type="info" @click="showRegister">没有账号？去注册->></el-link>
            </div>
            <div v-else>
              <register></register>
              <el-link class="link" type="info"  @click="showLogin">已有账号？去登录->></el-link>
            </div>
          </div>
          <!-- 销售商登陆注册 -->
          <div class="store">
            <div v-if="isShowS">
              <store-login></store-login>
              <el-link class="link" type="info" @click="showRegisterS">没有账号？去注册->></el-link>
            </div>
            <div v-else>
              <store-register></store-register>
              <el-link class="link" type="info" @click="showLoginS">已有账号？去登录->></el-link>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import Login from 'components/content/Login'
import StoreLogin from 'components/content/StoreLogin'
import Register from 'components/content/Register'
import StoreRegister from 'components/content/StoreRegister'
export default {
  name: 'IndexTemplate',
  data(){
    return {
      isShow: true,
      isShowS: true
    }
  },
  components: {
    Login,
    StoreLogin,
    Register,
    StoreRegister
  },
  methods: {
    showRegister() {
      this.isShow = false
    },
    showLogin() {
      this.isShow = true
    },
    showRegisterS() {
      this.isShowS = false
    },
    showLoginS() {
      this.isShowS = true
    }
  }
}
</script>

<style scoped>
.index-template {
  width: 100%;
  height: 400px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 8;
  user-select: none;
}
.grid-content {
  min-height: 36px;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.center {
  background-color: #fff;
  opacity: 0.9;
  border-radius: 25px;
}
.link {
  position: relative;
  bottom: 30px;
}
</style>
