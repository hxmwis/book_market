<template>
  <div class="admin-page">
    <nav-menu></nav-menu>
  </div>
</template>

<script>
import NavMenu from "views/admin/NavMenu";
export default {
  name: "adminPage",
  data() {
    return {};
  },
  components: {
    NavMenu
  }
};
</script>

<style scoped>
.admin-page .grid-content {
  min-height: 10px;
}
</style>
