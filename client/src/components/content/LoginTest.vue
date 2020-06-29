<template>
  <div>
    <form action="123">
      <login-register>
        <h1 slot="title">用 户 登 录</h1>
        <div slot="repwd">
          <el-link type="info" href="#">没有账号？去注册->></el-link>
        </div>
      </login-register>
    </form>
  </div>
</template>

<script>
import LoginRegister from "components/common/LoginRegister";
export default {
  name: "StoreLogin",
  data() {
    return {
    };
  },
  components: {
    LoginRegister
  }
};
</script>

<style scoped>
</style>
