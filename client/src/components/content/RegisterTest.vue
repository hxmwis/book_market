<template>
  <div>
    <form action="12333">
      <login-register>  
        <h1 slot="title">用 户 注 册</h1>
        <input type="submit" slot="submit" value="注册" />
      </login-register>
    </form>
  </div>
</template>

<script>
import LoginRegister from "components/common/LoginRegister";
export default {
  name: "Login",
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
