<template>
  <div class="message" @mouseover="showDel" @mouseleave="hiddenDel">
    <div class="userId">
      <span></span>
      {{message.userid}}
    </div>
    <div class="content">{{message.content}}</div>
    <div v-show="isShow" class="del">
      <el-button @click="delMessage" type="danger" icon="el-icon-delete" circle></el-button>
    </div>
    <div class="time">{{message.date}}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Array
    },
    index: {
      type: Number
    }
  },
  name: 'Message',
  data(){
    return {
      isShow: false,
      userId: ''
    }
  },
  created() {
    // 获取userid
    this.userId = this.$route.query.user
  },
  methods: {
    // 鼠标移入
    showDel() {
      if(this.message.userid == this.userId) {
        this.isShow = true
      }
    },
    // 鼠标移出
    hiddenDel() {
      this.isShow = false
    },
    // 删除自己的留言
    delMessage() {
      this.$reqs
        .post("/users/deleteMessage", this.message)
        .then(result => {
          //成功
          // console.log(result);
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
        // 刷新页面
        location.reload();
    }
  }
}
</script>

<style scoped>
.message {
  margin: auto;
  margin-top: 15px;
  width: 100%;
  min-height: 100px;
  height: auto;
  background-color: #fff;
  text-align: left;
  position: relative;
}
.message .userId {
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-weight: bolder;
  /* margin-left: 10px; */
}
.message .time {
  font-size: 14px;
  position: absolute;
  right: 30px;
  bottom: 10px;
}
.message .content {
  padding: 10px;
  line-height: 20px;
  font-size: 16px;
}
.message .del {
  position: absolute;
  top: 15px;
  right: 45px;
}
.userId span {
  display: inline-block;
  width: 5px;
  height: 20px;
  background-color: #409eff;
  margin-left: 5px;
}
</style>