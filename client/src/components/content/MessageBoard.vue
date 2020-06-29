<template>
  <div class="message-board">
    <el-row>
      <el-col :span="5">
        <div class="grid-content left">
          <img title="回到主页" @click="back" src="../../assets/img/flag.jpg" alt="">
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content center">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入留言内容"
            v-model="msg.content"
            maxlength="50"
            show-word-limit
          ></el-input>
          <div class="btn">
            <button @click="send"><i class="el-icon-s-promotion"></i></button>
            <button @click="reset"><i class="el-icon-delete"></i></button>
          </div>
          <div v-for="(item,index) in reverseMesArr">
            <message :message="item" :index="index"></message>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Message from "components/content/Message";
export default {
  name: "MessageBoard",
  data() {
    return {
      mesArr: [],
      msg: {
        date: "",
        content: "",
        userid: ""
      }
    };
  },
  created(page) {
    // 获取当前用户的id
    this.msg.userid = this.$route.query.user;
    // 获取要展示的留言
    console.log("被创建");
    var _this = this;
    this.$reqs
      .post("/users/showMessage", {
        page: page
      })
      .then(function(result) {
        //成功
        console.log(result);
        _this.mesArr = result.data.data;
      })
      .catch(function(error) {
        //失败
        console.log("失败");
        console.log(error);
      });
  },
  methods: {
    // 获取当前时间
    getTime() {
      var currentDate = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      // 获取当前时间的年月日时分秒
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth() + 1;
      var strDate = currentDate.getDate();
      var minute = currentDate.getMinutes();
      var hour = currentDate.getHours();
      var second = currentDate.getSeconds();
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
      this.msg.date =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        seperator2 +
        minute +
        seperator2 +
        second;
    },
    // 发送留言
    send() {
      if(this.msg.content == "") {
        this.$message({
          message: "留言不能为空",
          type: 'warning'
        })
      }else {
        this.getTime();
        this.$reqs.post('/users/messageAdd',this.msg)
				.then((result)=>{
					//成功
					console.log(result);
				}).catch(function (error) {
					//失败
			    console.log(error)
        });
        // 刷新页面
        location.reload();
      }
    },
    // 重置留言框内容
    reset() {
      this.msg.content = ''
    },
    // 回到主页
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    // 反转数组
    reverseMesArr() {
      return this.mesArr.reverse();
    }
  },
  components: {
    Message
  }
};
</script>

<style>
.message-board .el-textarea {
  width: 100%;
  margin-top: 50px;
}
.message-board .grid-content {
  min-height: 10px;
}
.message-board .left img {
  width: 55px;
  height: 55px;
  margin-left: 80px;
  margin-top: 7px;
  border-radius: 50%;
}
.message-board .left img:hover {
  cursor: pointer;
}
.center .btn {
  width: 100%;
  margin-top: 10px;
  margin-left: 750px;
}
.btn button {
  width: 40px;
  height: 40px;
   border: 0;   /*去掉按钮自带的阴影 */
  margin-left: 10px;
  border-radius: 50%;
  background-color: #fff;
}
.btn button:hover {
  cursor: pointer;
  background-color: #eee;
  opacity: 0.8;
}
/* 去掉点击出现蓝色边框 */
.btn button:focus {
  outline: none;
} 
</style>
