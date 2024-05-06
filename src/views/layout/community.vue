<template>
  <div class="community-box">
    <div class="alert">提示信息</div>
    <!-- 社区 -->
    <div v-if="!isMyPub" class="flex-container">
      <!-- 主要部分 -->
      <div class="bg">
        <div class="title">
          <h2>我们一直都在</h2>
        </div>
        <TalkListItem v-for="(item,index) in publish" :key="index" :item="item"></TalkListItem>
      </div>
      <!-- 自己发布 -->
      <div class="my-avatar">
        <div v-if="isSay" class="say-state">
          <textarea v-model="textValue" ref="textarea" placeholder="有话说......" cols="30" rows="10"></textarea>
          <div class="btn-box">
            <el-button @click="submit" type="primary">发布</el-button>
            <el-button @click="isSay=false" type="primary" plain>取消</el-button>
          </div>
        </div>
        <div v-else class="look-state">
          <div class="img-box">
            <img src="@/assets/avatar.jpg" alt="">
          </div>
          <el-button @click="say" type="primary" class="btn-say">有话说</el-button>
          <el-button @click="handleMyPublish" type="primary" plain>我的</el-button>
        </div>
        <div class="consulate">
          <ul>
            <li v-for="(item,index) in 5" :key="index">
              <img src="@/assets/about2.png" alt="">
              <div class="des">
                <p>如何与渐冻症患者相处</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 我的 -->
    <div v-else class="my-pub">
      <el-page-header @back="isMyPub=false" content="我的"></el-page-header>
      <div v-if="myPublish.length!=0">
        <TalkListItem v-for="(item,index) in myPublish" :key="index" :item="item"></TalkListItem>
      </div>
      <div v-else>
        <el-empty description="暂无内容"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import TalkListItem from '@/components/TalkListItem.vue'
import myAlert from '@/utils/alert'
export default {
  name: 'CommunityPage',
  components: {
    TalkListItem
  },
  data () {
    return {
      isSay: false,
      textValue: '',
      publish: JSON.parse(localStorage.getItem('publish')) || [], // 整个社区的数组
      isMyPub: false,
      myPublish: JSON.parse(localStorage.getItem('myPublish')) || [] // 自己发布的数组
    }
  },
  methods: {
    say () {
      this.isSay = true
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
    submit () {
      if (this.textValue === '') {
        myAlert(false, '内容不能为空')
      } else {
        this.isSay = false
        this.publish.unshift(this.textValue)
        this.myPublish.unshift(this.textValue)
        myAlert(true, '发布成功')
        this.textValue = ''
        localStorage.setItem('publish', JSON.stringify(this.publish))
        localStorage.setItem('myPublish', JSON.stringify(this.myPublish))
      }
    },
    handleMyPublish () {
      if (this.$store.getters.token) {
        this.isMyPub = true
      } else {
        MessageBox.confirm('请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {

        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.community-box {
  width: 100%;
  height: 100vh;
  height: 3000px;
  padding-top: 100px;
  padding-left: 50px;
  /*加载背景图：图片地址 不平铺 */
  background: url('../../assets/R-C.jpg') no-repeat;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  background-attachment: fixed;

  .flex-container {
    display: flex; /* 使用弹性布局 */
    // align-items: center; /* 垂直居中对齐 */
  }

  .bg {
    width: 800px;
    border-radius: 10px;
    background-color: #fff;
    .title {
      width: 600px;
      height: 70px;
      padding: 10px;
      background-color: #fff;
    }
  }
  .my-avatar {
    // position: fixed;
    // top: 100px;
    // left: 855px;
    margin-left: 10px;
    .look-state {
      width: 350px;
      height: 300px;
      text-align: center;
      border-radius: 10px;
      background-color: #fff;
      .img-box {
        margin-bottom: 50px;
        img {
          margin-top: 20px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
      }
    }
    .say-state {
      padding: 10px;
      width: 350px;
      height: 300px;
      border-radius: 10px;
      background-color: #fff;
      textarea {
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
        font-size: 16px;
      }
      .btn-box {
        display: flex;
        justify-content: end;
      }
    }
    .consulate {
      margin-top: 10px;
      background-color: #fff;
      width: 350px;
      border-radius: 10px;
      ul li {
        display:flex;
        flex-direction:row;
        align-items:center;
        height: 70px;
        list-style: none;
        cursor: pointer;
        padding: 0 15px;
        img {
          float: left;
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
      }
    }
  }
  .my-pub {
    width: 900px;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
  }
}
</style>
