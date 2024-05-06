<template>
    <div class="home">
      <div class="home-first-page">
        <div class="greeting">
          <h1>与您并肩，守护温暖</h1>
          <h2>Standing by your side, safeguarding warmth</h2>
        </div>
        <div @click="$router.push('/about')" class="learn-more">
          关于 <span class="el-icon-right right-arrow"></span>
        </div>
        <!-- 意见箱 -->
        <div v-if="!isOpn">
          <div @click="isOpn=true" class="opinion-box">
            <h1>ALS</h1>
            <h4>ASSOCIATION</h4>
          </div>
          <div class="prompt">
            点击这里进行反馈
            <span @click="close">×</span>
          </div>
        </div>
        <Chat v-else :isOpn="isOpn" @closeOpinion="closeOpinion"></Chat>
        <!-- <div v-else class="opinion">
          <div class="title">
            <h2>欢迎！</h2>
            <span @click="isOpn=false" class="el-icon-arrow-down cancel"></span>
          </div>
          <div class="content">
            <div class="content-it">
              <img src="@/assets/logo.png" alt="">
              <div class="it-say">
                您好！有什么想对我们说的或者对网站有什么建议，都可以写在这里，我们会及时查看。
              </div>
            </div>
            <div v-if="isSubmit" class="content-me">
              {{ myValue }}
            </div>
          </div>
          <div class="footer">
            <input v-model="iptValue" type="text" placeholder="在这里输入...">
            <span @click="submit" v-show="iptValue" class="el-icon-position"></span>
          </div>
        </div> -->
      </div>
      <!-- 去步态分析页 -->
      <div class="to-ana">
        <img src="@/assets/homepage_01.jpg" alt="">
        <div class="ana-help">
          <p>您期望了解自己近期的健康状况吗，我们可以帮您</p>
          <div @click="$router.push('/analysis')" class="to-ana-click">
            进入 <span class="el-icon-right right-arrow"></span>
          </div>
        </div>
        <div class="el-icon-bottom down-arrow">
        </div>
      </div>
      <!-- 去其他页 -->
      <div class="to-other">
        <div class="other-help">
          <h1>我的渐冻症之旅</h1>
          <div class="to-com">
            <h2>帮助、倾听</h2>
            <p>渐冻症没有规律，也不遵守任何固定的时间表。提前计划有助于缓解一些变化的混乱。</p>
            <div @click="$router.push('/community')" class="to-click">
              社区交流 <span class="el-icon-right right-arrow"></span>
            </div>
          </div>
          <div class="to-user">
            <h2>提醒、倾诉</h2>
            <p>我们提供提醒支持，避免忘记锻炼。如果心情烦闷，写出来是个好办法。</p>
            <div @click="$router.push('/user')" class="to-click">
              个人中心 <span class="el-icon-right right-arrow"></span>
            </div>
          </div>
        </div>
        <img src="@/assets/homepage_03.jpg" alt="">
      </div>
    </div>
  </template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Chat from '@/components/Chat.vue'
export default {
  name: 'HomePage',
  data () {
    return {
      isOpn: false
      // iptValue: '',
      // myValue: '',
      // isSubmit: false
    }
  },
  components: {
    Chat
  },
  mounted () {
    gsap.registerPlugin(ScrollTrigger)
  },
  methods: {
    close () {
      document.querySelector('.prompt').style.display = 'none'
    },
    closeOpinion () {
      this.isOpn = false
    }
    // submit () {
    //   this.isSubmit = true
    //   this.myValue = this.iptValue
    //   this.iptValue = ''
    // }
  }
}
</script>

  <style lang="less" scoped>
  .home-first-page {
    width: 100%;
    height: 650px;
    padding-top: 240px;
    padding-left: 50px;
    // background-color: #ffd19f;
    background: url('../../assets/R-C.jpg') no-repeat;
    background-size: cover;
    // background-color: skyblue;
    .greeting {
      color: #fff;
      h1 {
        font-size: 70px;
      }
      h2 {
        font-size: 25px;
      }
    }
    .learn-more {
      width: 130px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-color: rgb(19, 19, 140);
      color: #fff;
      font-size: 18px;
      margin-top: 50px;
      cursor: pointer;
    }
    .learn-more:hover {
      background-color: rgb(6, 6, 171);
    }
    .learn-more:hover > .right-arrow {
      display: inline-block;
      -webkit-transform: translateX(5px);
      transform: translateX(5px);
      transition: transform 150ms linear;
    }
    .opinion-box {
      position: fixed;
      bottom: 30px;
      right: 50px;
      z-index: 999;
      width: 70px;
      height: 70px;
      padding: 10px;
      border-radius: 50%;
      background-color: orange;
      color: #fff;
      cursor: pointer;
      h1 {
        font-size: 33px;
        letter-spacing: -6px;
        line-height: 1.1;
      }
      h4 {
        font-size: 7px;
        line-height: 0;
      }
    }
    .prompt {
      position: fixed;
      bottom: 80px;
      right: 50px;
      z-index: 998;
      width: 250px;
      height: 70px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      border-radius: 20px;
      padding: 20px;
      cursor: pointer;
      span {
        display: none;
        position: fixed;
        bottom: 135px;
        right: 45px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        color: rgb(79, 82, 92);
        background-color: rgb(237, 238, 239);
        border-radius: 50%;
      }
    }
    .prompt:hover span {
      display: block;
    }
    // .opinion {
    //   position: fixed;
    //   bottom: 30px;
    //   right: 50px;
    //   z-index: 999;
    //   width: 350px;
    //   height: 500px;
    //   border-radius: 30px;
    //   background-color: #fff;
    //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    //   .title {
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     width: 100%;
    //     height: 60px;
    //     line-height: 60px;
    //     background-color: orange;
    //     border-radius: 30px 30px 30px 0;
    //     color: #fff;
    //     padding-left: 30px;
    //     .cancel {
    //       margin-right: 20px;
    //       font-size: 20px;
    //       font-weight: 600;
    //       cursor: pointer;
    //     }
    //   }
    //   .content {
    //     padding: 80px 15px 0;
    //     height: 420px;
    //     overflow: auto;
    //     .content-it {
    //       position: relative;
    //       img {
    //         width: 50px;
    //         height: 50px;
    //         border-radius: 50%;
    //       }
    //       .it-say {
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
    //     }
    //     .content-me {
    //       float: right;
    //       display: inline-flex;
    //       margin-top: 15px;
    //       padding: 10px;
    //       color: rgb(79, 82, 92);
    //       background-color: orange;
    //       border-radius: 15px 15px 0 15px;
    //     }
    //   }
    //   .footer {
    //     position: absolute;
    //     bottom: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 60px;
    //     line-height: 60px;
    //     background-color: rgb(237, 238, 239);;
    //     border-radius: 30px 0 30px 30px;
    //     input {
    //       border: none;
    //       outline: none;
    //       border-radius: 10px;
    //       width: 320px;
    //       height: 42px;
    //       margin-left: 15px;
    //       padding: 10px;
    //       font-size: 15px;
    //     }
    //     .el-icon-position {
    //       position: absolute;
    //       bottom: 10px;
    //       right: 20px;
    //       color: orange;
    //       font-size: 30px;
    //       cursor: pointer;
    //     }
    //   }
    // }
  }
  .to-ana {
    position: relative;
    margin-top: 130px;
    width: 100%;
    height: 300px;
    background-color: rgb(19, 19, 140);
    img {
      float: left;
      width: 300px;
      height: 100%;
      margin-right: 50px;
    }
    .ana-help {
      display: flex;
      flex-direction: column;
      p {
        margin-top: 70px;
        font-size: 40px;
        color: #fff;
      }
      .to-ana-click {
        margin-top: 30px;
        width: 170px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        border: 1px solid #fff;
        color: #fff;
        font-size: 30px;
        cursor: pointer;
      }
      .to-ana-click:hover {
        background-color: rgb(6, 6, 171);
      }
      .to-ana-click:hover > .right-arrow {
        display: inline-block;
        -webkit-transform: translateX(10px);
        transform: translateX(10px);
        transition: transform 150ms linear;
      }
    }
    .down-arrow {
      position: absolute;
      top: -45px;
      left: 10px;
      width: 70px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background-color: orange;
      color: #fff;
      font-size: 50px;
    }
  }
  .to-other {
    display: flex;
    justify-content: space-between;
    width: 1300px;
    height: 800px;
    margin: 150px auto 0;
    img {
      float: right;
      width: 650px;
      height: 500px;
    }
    .other-help {
      width: 500px;
      h1 {
        margin-top: 50px;
        font-size: 65px;
      }
      .to-com,
      .to-user {
        h2 {
          margin: 10px 0;
          font-size: 35px;
        }
        p {
          font-size: 25px;
          font-weight: 300;
        }
        .to-click {
          width: 150px;
          margin: 50px 0;
          color: orange;
          font-size: 20px;
          cursor: pointer;
        }
        .to-click:hover {
          color: rgb(255,100,0);
        }
        .to-click:hover > .right-arrow {
          display: inline-block;
          -webkit-transform: translateX(10px);
          transform: translateX(10px);
          transition: transform 150ms linear;
        }
      }
    }
  }
  </style>
