<template>
    <div class="login">
      <div class="alert">提示信息</div>
      <div class="container">
        <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
        </div>

        <div class="form">
          <div class="form-item">
            <input  v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
          </div>
          <div class="form-item">
            <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
            <img @click="getPicCode" :src="picUrl" alt="">
          </div>
          <div class="form-item">
            <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
            <button @click="getMsgCode">{{ second === totalSecond ? '获取验证码' : second + `秒后重新发送`}}</button>
          </div>
          <div class="form-item">
            <el-radio-group v-model="resource">
              <el-radio label="患者"></el-radio>
              <el-radio label="家属"></el-radio>
            </el-radio-group>
          </div>
        </div>

        <div @click="login" class="login-btn">登录</div>
      </div>
    </div>
  </template>

<script>
// import { codeLogin } from '@/api/login'
import myAlert from '@/utils/alert'
export default {
  name: 'LoginPage',
  created () {
    this.getPicCode()
  },
  data () {
    return {
      picUrls: [require('@/assets/code1.png'), require('@/assets/code2.png'), require('@/assets/code3.png')],
      picIndex: 0,
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '',
      picCode: '',
      msgCode: '',
      resource: ''
    }
  },
  computed: {
    picUrl () {
      return this.picUrls[this.picIndex] // 当前显示的图形验证码路径
    }
  },
  methods: {
    getPicCode () {
      this.picIndex = (this.picIndex + 1) % this.picUrls.length // 切换到下一张图形验证码
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        myAlert(false, '请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        myAlert(false, '请输入正确的图形验证码')
        return false
      }
      return true
    },
    getMsgCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--

          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)

        // 发送请求，获取验证码
        myAlert(true, '发送成功，请注意查收')
      }
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        myAlert(false, '请输入正确的手机验证码')
        return
      }
      /* const res = await codeLogin(this.mobile, this.msgCode)
      console.log(res) */
      this.$store.state.user.islogin = true
      this.$router.push('/')
      myAlert(true, '登录成功')
    }
  }
}
</script>

  <style lang="less" scoped>
  .login {
    width: 100%;
    height: 100vh;
    background: url('../../assets/R-C.jpg') no-repeat;
    background-size: cover;
    padding: 90px 150px;
  }
  .container {
    padding: 49px 29px;
    width: 500px;
    height: 600px;
    background-color: #fff;
    border-radius: 10px;
    .title {
      margin-bottom: 20px;
      h3 {
        font-size: 26px;
        font-weight: normal;
      }
      p {
        line-height: 40px;
        font-size: 14px;
        color: #b8b8b8;
      }
    }

    .form-item {
      border-bottom: 1px solid #f3f1f2;
      padding: 8px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      .inp {
        display: block;
        border: none;
        outline: none;
        height: 32px;
        font-size: 14px;
        flex: 1;
      }
      img {
        width: 94px;
        height: 31px;
      }
      button {
        height: 31px;
        border: none;
        font-size: 13px;
        color: #cea26a;
        background-color: transparent;
        padding-right: 9px;
      }
    }

    .login-btn {
      width: 100%;
      height: 42px;
      margin-top: 39px;
      background: linear-gradient(90deg,#ecb53c,#ff9211);
      color: #fff;
      border-radius: 39px;
      box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
      letter-spacing: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  </style>
