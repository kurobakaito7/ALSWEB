<template>
  <div class="opinion">
    <div class="title">
      <h2>欢迎！</h2>
      <span @click="closeOpinion" class="el-icon-arrow-down cancel"></span>
    </div>
    <div class="content">
      <div class="content-it">
        <img src="@/assets/logo.png" alt="">
        <div class="it-say">
            您好！有什么想对我们说的或者对网站有什么建议，都可以写在这里，我们会及时查看。
        </div>
      </div>
      <div v-for="(item, index) in meList" :key="index" class="content-me">
        <div class="text">
            {{ item.content }}
        </div>
      </div>
      <!-- <div v-for="(item, index) in itList" :key="index" class="content-it-res">
        <img src="@/assets/logo.png" alt="">
        <div class="it-say-res">
            {{ item.content }}
        </div>
      </div> -->
    </div>
    <div class="footer">
      <input v-model="iptValue" @keyup.enter="submit" type="text" placeholder="在这里输入...">
      <span @click="submit" v-show="iptValue" class="el-icon-position"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatPage',
  data () {
    return {
      iptValue: '',
      myValue: '',
      //   isSubmit: false,
      itList: [],
      meList: []
    }
  },
  methods: {
    submit () {
      if (this.iptValue.trim() !== '') {
        this.meList.push({ id: this.meList.length + 1, content: this.iptValue })
        this.itList.push({ id: this.itList.length + 1, content: '好的，谢谢您的建议。我们会尽快修改。' })
        this.myValue = this.iptValue
        // this.isSubmit = true
        this.iptValue = ''
      }
    },
    closeOpinion () {
      this.$emit('closeOpinion')
    }
  }
}
</script>

<style lang="less" scoped>
.opinion {
  position: fixed;
  bottom: 30px;
  right: 50px;
  z-index: 999;
  width: 350px;
  height: 500px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: orange;
    border-radius: 30px 30px 30px 0;
    color: #fff;
    padding-left: 30px;
    .cancel {
      margin-right: 20px;
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .content {
    padding: 80px 15px 0;
    height: 420px;
    overflow: auto;
    .content-it {
          position: relative;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .it-say {
            display: inline-block;
            position: absolute;
            top: -57px;
            left: 30px;
            z-index: -1;
            // width: 270px;
            // height: 80px;
            color: rgb(79, 82, 92);
            background-color: rgb(246, 246, 247);
            border-radius: 15px;
            padding: 8px 16px;
          }
    }
    // .content-it-res {
    //       position: relative;
    //       img {
    //         width: 50px;
    //         height: 50px;
    //         border-radius: 50%;
    //       }
    //       .it-say-res {
    //         display: inline-block;
    //         position: absolute;
    //         top: -57px;
    //         left: 30px;
    //         z-index: -1;
    //         // width: 270px;
    //         // height: 80px;
    //         color: rgb(79, 82, 92);
    //         background-color: rgb(246, 246, 247);
    //         border-radius: 15px;
    //         padding: 8px 16px;
    //       }
    // }
    .content-me {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 15px;
      .text {
        padding: 10px;
        color: rgb(79, 82, 92);
        background-color: orange;
        border-radius: 15px 15px 0 15px;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: rgb(237, 238, 239);;
    border-radius: 30px 0 30px 30px;
    input {
      border: none;
      outline: none;
      border-radius: 10px;
      width: 320px;
      height: 42px;
      margin-left: 15px;
      padding: 10px;
      font-size: 15px;
    }
    .el-icon-position {
      position: absolute;
      bottom: 10px;
      right: 20px;
      color: orange;
      font-size: 30px;
      cursor: pointer;
    }
  }
}
</style>
