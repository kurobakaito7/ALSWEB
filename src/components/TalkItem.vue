<template>
  <div class="item-box">
    <div class="head">
        <img src="@/assets/avatar.jpg" alt="">
        <div class="name">
            <p style="font-size: 20px;">花开富贵</p>
            <p class="now-time">2024-1-17</p>
        </div>
    </div>
    <div class="body">
        <p>睡眠障碍——增加睡眠时间 患者存在严重睡眠障碍，入睡困难且夜间易醒，这样睡眠时间严重不足。 出现这种状况一方面是患者心理压力大，焦虑，此时医护人员和家属要给予患者足够关爱，努力增加患者对生存的渴望和信心，克服恐惧心理。</p>
    </div>
    <div class="comments">
        <div class="title">
            <span>评论</span>
        </div>
        <div class="content">
            <ul class="content-list">
                <li v-for="(comment,index) in comments" :key="index" class="list-item">
                    <div class="content-head">
                        <img src="@/assets/avatar.jpg" alt="">
                        <div class="name">
                            <span style="font-size: 20px;">小明</span>
                            <span class="now-time">{{ currentDate }}</span>
                        </div>
                    </div>
                    <div class="content-body">
                        <p>{{ comment }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="my-comment">
        <div v-if="isInpClick" class="isInp">
            <textarea ref="textarea" v-model="textValue" name="" id="" cols="30" rows="10" placeholder="发表评论"></textarea>
            <el-button @click="submit" type="primary" style="float: right;" size="small">发表</el-button>
        </div>
        <input v-else @click="handleInput" class="inp" type="text" placeholder="发表评论">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isInpClick: false,
      textValue: '',
      currentDate: '', // 当前日期
      comments: JSON.parse(localStorage.getItem('comments')) || []
    }
  },
  created () {
    // 获取当前日期信息
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    this.currentDate = `${year}-${month}-${day}`
  },
  methods: {
    handleInput () {
      this.isInpClick = true
      document.querySelector('.my-comment').style.height = '80px'
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
    submit () {
      if (this.textValue !== '') {
        this.comments.unshift(this.textValue)
        this.textValue = ''

        // 将评论内容存储到 localStorage
        localStorage.setItem('comments', JSON.stringify(this.comments))
      }
    }
  }
}
</script>

<style lang="less" scoped>
li {
    list-style: none;
}
.item-box {
    width: 900px;
    height: 928px;
    // margin: 10px 0 0 100px;
    margin: 10px auto;
    padding: 0 50px;
}
.head {
    width: 600px;
    height: 70px;
    margin-top: 30px;
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
        font-size: 13px;
    }
}
.body {
    padding: 12px;
}
.comments {
    margin-top: 15px;
    .title {
        padding-left: 25px;
        width: 100%;
        height: 40px;
        line-height: 45px;
        // border-bottom: 1px solid rgba(185,118,63,.2);
        border-bottom: 1px solid #f3f1f2;
        span {
            color: rgb(242, 155, 83);
        }
    }
    .content ul li {
        width: 100%;
        height: 80px;
        padding: 12px;
        border-bottom: 1px solid #f3f1f2;
        .content-head {
            margin-bottom: 10px;
            img {
                float: left;
                width: 50px;
                height: 50px;
                margin-right: 7px;
                border-radius: 50%;
            }
            .now-time {
                margin-left: 5px;
                color: rgb(178,180,178);
                font-size: 13px;
            }
        }
    }
}
.my-comment {
    position: fixed;
    bottom: 0;
    // left: 100px;
    left: 260px;
    width: 900px;
    height: 50px;
    border-top: 1px solid #f3f1f2;
    input {
        width: 800px;
        height: 100%;
        border: none;
        outline: none;
    }
    .isInp {
        width: 100%;
        height: 100%;
        textarea {
            display: block;
            padding: 5px;
            width: 100%;
            height: 50px;
            border: none;
            outline: none;
        }
    }
}
</style>
