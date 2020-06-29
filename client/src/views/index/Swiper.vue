<template>
  <div class="swiper">
    <el-carousel :interval="3000" arrow="always" height="400px">
      <el-carousel-item v-for="item in imagesbox" :key="item.id">
        <img :src="item.idView" class="image">
        <h1 class="title">{{item.title}}</h1>
        <h4 class="content">{{item.content}}</h4>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  data() {
    return {
      imagesbox: [
        {
          id:0,
          idView:require('../../assets/img/books.png'),
          title:'书籍是人类进步的阶梯',
          content: '——高尔基'
        },
        {
          id:1,
          idView:require('../../assets/img/green.png'),
          title:'文化传承',
          content: '书籍使得古人的智慧结晶能保存下来并传给我们当代人'
        },
        {
          id:2,
          idView:require('../../assets/img/reading.png'),
          title:'开拓视野',
          content: '课外阅读可以让学生不出门，便知天下事，只有博览群书才能博识'
        },
        {
          id:3,
          idView:require('../../assets/img/e0c1523fe7efe36ddf1a8b60683351f6.png'),
          title:'减轻压力',
          content: '一本好的小说可以带人进入另一个境界,而一篇迷人的文章将会让所有的压力都消失不见'
        },
      ]
    };
  }
};
</script>

<style scoped>
.swiper {
  width: 100%;
  padding-top: 70px;
}
.title {
  position: absolute;
  right: 200px;
  top: 60px;
}
.content {
  position: absolute;
  right: 100px;
  top: 150px;
}
img {
  width: 50%;
  height: 100%;
}
</style>
