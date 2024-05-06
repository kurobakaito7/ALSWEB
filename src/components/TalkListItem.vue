<template>
  <div class="talk-list-item">
    <div v-if="item.length!=0">
      <div class="head">
        <img src="@/assets/avatar.jpg" alt="">
        <div class="name">
          <p style="font-size: 20px;">花开富贵</p>
          <p class="now-time">2024-1-17</p>
        </div>
      </div>
      <div class="body" @click="$router.push('/talk')">
        <p>{{ item }}</p>
      </div>
      <div class="footer">
        <el-badge :value="12" class="item">
          <span @click="$router.push('/talk')">评论</span>
        </el-badge>
        <el-badge :value="likeCount" class="item">
          <span @click="addLike">点赞</span>
        </el-badge>
      </div>
    </div>
    <div v-else class="empty">
      <el-empty description="暂无内容"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      likeCount: JSON.parse(localStorage.getItem('likeCount')) || 0
    }
  },
  // computed: {
  //   commentCount () {
  //     const comments = localStorage.getItem('comments')
  //     return comments.length
  //   }
  // },
  methods: {
    addLike () {
      this.likeCount++
      localStorage.setItem('likeCount', JSON.stringify(this.likeCount))
    },
    handleDelete () {
      this.$emit()
    }
  }
}
</script>

<style lang="less" scoped>
.talk-list-item {
    width: 800px;
    // height: 500px;
    background-color: #fff;
    cursor: pointer;
    .head {
        width: 100%;
        height: 70px;
        padding: 12px;
        img {
          float: left;
          width: 40px;
          height: 40px;
          margin-right: 7px;
          border-radius: 50%;
        }
        .now-time {
          color: rgb(178,180,178);
          font-size: 12px;
        }
    }
    .body {
      width: 100%;
      padding: 5px 12px;
    }
    .body:hover {
      color: rgb(185,118,63);
    }
    .footer {
      position: relative;
      padding: 12px;
      .item {
        margin-top: 10px;
        margin-right: 40px;
      }
    }
    .empty {
      width: 100%;
      height: 400px;
    }
}
</style>
