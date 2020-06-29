<template>
  <div class="nav-bar">
    <el-row>
      <el-col :span="4">
        <div class="grid-content">
          <img src="../../assets/img/flag.jpg"></img>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <div class="left"><slot name="left"></slot></div>
          <div class="center"><slot name="center"></slot></div>
          <div class="right"><slot name="right"></slot></div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content lleft">
          <div class="l-lfet"><slot name="lleft"></slot></div>
          <div class="l-right">
            <slot name="lright">
            </slot>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    }
  }
};
</script>

<style scoped>
.nav-bar {
  width: 100%;
  height: 70px;
  background-color: rgba(238,237,237);
  /* background-color: #fff; */
  /* background-color: rgba(23,24,26); */
  box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.grid-content {
  min-height: 36px;
  line-height: 60px;
}
.grid-content img {
  width: 55px;
  height: 55px;
  margin-left: 80px;
  margin-top: 7px;
  border-radius: 50%;
}
.left{
  width: 25%;
  height: 60px;
  float: left;
  user-select:none;
}
.center{
  width: 50%;
  height: 60px;
  float: left;
}
.right{
  width: 25%;
  height: 60px;
  float: left;
}
.l-lfet {
  width: 50%;
  height: 60px;
  float: left;
}
.l-right {
  width: 50%;
  height: 60px;
  float: left;
}

</style>
