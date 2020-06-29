<template>
  <div class="message-board">
    <el-link>
      <h2 @click="drawerMessage = true">留言板</h2>
    </el-link>
    <el-drawer :visible.sync="drawerMessage" :modal-append-to-body="false" :with-header="false">
      <el-divider>
        <i class="el-icon-edit">
          <span class="title">欢迎留言</span>
        </i>
      </el-divider>
      <el-input type="textarea" :rows="4" 
      placeholder="请输入评论" 
      v-model="textarea"
      maxlength="50"
      show-word-limit
      >
      </el-input>
      <!-- 发送留言 -->
      <el-button type="success" icon="el-icon-s-promotion" circle @click="send"></el-button>
      <!-- 清空留言 -->
      <el-button type="danger" icon="el-icon-delete" circle @click="reset"></el-button>
      <div v-for="(item,index) in mesArr">
        <message :message="item"></message>
      </div>
      <el-backtop target=".el-drawer__body"></el-backtop>
    </el-drawer>
  </div>
</template>

<script>
import Message from "components/content/Message";
export default {
  name: "MessageBoard",
  // props: {
  //   userId: {
  //     type: String
  //   }
  // },
  data() {
    return {
      drawerMessage: false,
      // 留言框中的内容
      textarea: "",
      // 留言内容
      message: [],
      mesArr: [],
      userId: "",
      currentdate: ""
    };
  },
  created(page) {
    console.log("被创建");
				var _this = this;
			
				this.$reqs.post('/users/showMessage',{
					page:page
				}).then(function(result){ 
          //成功
          console.log(result);
          _this.mesArr = result.data.data
				}).catch(function (error) {
          //失败
          console.log("失败");
			    console.log(error)
				});
  },
  methods: {
    // 发送留言
    send() {
      if(this.textarea == '') {
        this.$notify({
          title: '留言不能为空！',
          type: 'danger',
          duration: 2000
        });
      }else {
        this.$notify({
          title: '留言成功',
          type: 'success',
          duration: 2000
        });
        this.getTime();
        this.message.unshift(this.textarea);
        this.textarea = ''
      }
    },
    // 清空留言框
    reset() {
      this.textarea = '';
    },
    // 获取时间
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      // 获取当前时间的年月日时分秒
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var minute = date.getMinutes();
      var hour = date.getHours();
      var second = date.getSeconds();
      // 固定时间格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
          second = "0" + second;
      }
      this.currentdate =  year + seperator1 + month + seperator1 + strDate 
      					+ " " + hour + seperator2 + minute + seperator2 + second;
      return this.currentdate;
    }
  },
  components: {
    Message
  }
};
</script>

<style>
.message-board .el-drawer__body {
  overflow: auto;
}
</style>
