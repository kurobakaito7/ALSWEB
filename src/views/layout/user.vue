<template>
  <div class="user-box">
    <div class="alert">提示信息</div>
    <!-- 提醒 -->
    <div class="remind">
      <h4 style="color: rgb(185,118,63)">提醒</h4>
      <div v-if="isCard" class="card-box">
        <ul>
          <li v-for="(itemContent,index) in remindContent" :key="index">
            <h4>{{ itemContent }}</h4>
            <p>{{ remindDate2[index] }}</p>
            <a href="javascript:void(0)" @click="handleDelete(itemContent, remindDate2[index])"  class="el-icon-delete"></a>
          </li>
        </ul>
      </div>
      <el-popover
      placement="right"
      width="400"
      trigger="click"
      v-model="isAddRemind"
      v-if="remindContent.length<=2 && remindDate2.length<=2">
        <div class="remind-setting">
          <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="提醒内容">
              <el-radio-group v-model="sizeForm.resource" size="medium">
                <el-radio border label="锻炼"></el-radio>
                <el-radio border label="理疗"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="提醒时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button @click="isAddRemind=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-button slot="reference" type="primary" icon="el-icon-plus" circle style="float: right;"></el-button>
      </el-popover>
    </div>
    <!-- 个人信息 -->
    <div class="info">
      <img src="@/assets/avatar.jpg" alt="">
      <div v-if="!isSetting">
        <div class="my-info">
          <span>账号名：{{ nickname }}</span>
          <span>姓名：{{ trueName }}</span>
          <span>年龄：{{ yearOld }}</span>
          <span class="colle" @click="dialogVisible = true"><a href="javascript:void(0)">关联账号：{{ form.resName }}</a></span>
        </div>
        <div class="idenfiy">
          <span>家属</span>
        </div>
        <div class="btn-setting">
          <i @click="isSetting = true" class="el-icon-setting"></i>
        </div>
        <div class="logout-box">
          <a href="javascript:void(0)" @click="logout">退出登录</a>
        </div>
      </div>
      <div v-else class="ipt-setting-box">
        <div class="ipt-setting">
          <div class="set-item">
            <label for="">账号名：</label>
            <input v-model="nickname" type="text">
          </div>
          <div class="set-item">
            <label for="">姓名：</label>
            <input v-model="trueName" type="text">
          </div>
          <div class="set-item">
            <label for="">年龄：</label>
            <input v-model="yearOld" type="text">
          </div>
        </div>
        <div>
          <el-button @click="isSetting = false">取消</el-button>
          <el-button @click="handleSetting" type="primary">确认</el-button>
        </div>
      </div>
    </div>
    <!-- 关联账号 弹窗 -->
    <el-dialog title="关联账号" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="搜索账号名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:300px"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <div class="form-account">
            <ul>
              <li @click="handleFormAccount" :class="{'gray' : isClick }">
                <img src="@/assets/avatar.jpg" alt="">
                <span>{{ form.resName }}</span>
              </li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 日记 -->
    <div class="diary">
      <div class="diary-list">
        <ul v-if="diaryList.length!=0">
          <li v-for="(item,index) in diaryList" :key="index">
            <p style="color: rgb(185,118,63);">{{ diaryDate }}</p>
            <div class="diary-content">
              <p>{{ item }}</p>
            </div>
            <a href="javascript:void(0)" @click="handleDiaryDelete(item)" class="el-icon-delete"></a>
          </li>
        </ul>
        <el-empty v-else description="暂无内容"></el-empty>
      </div>
      <div v-if="!isAddDiary" class="calendar-box">
        <el-calendar v-model="value">
        </el-calendar>
        <el-button @click="onDiarySubmit" type="primary" icon="el-icon-edit" circle style="float: right;"></el-button>
      </div>
      <div v-else class="add-diary-box">
        <textarea ref="textarea" v-model="textareaValue" class="add-diary" cols="30" rows="10" placeholder="写下来心情或许会变好哦..."></textarea>
        <el-button @click="handleAddDiary" type="primary" icon="el-icon-check" circle class="btn-check"></el-button>
        <el-button @click="isAddDiary=false" type="danger" icon="el-icon-close" circle class="btn-close"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import msToDate from '@/utils/msToDate'
import myAlert from '@/utils/alert'
export default {
  name: 'UserPage',
  computed: {
    isCard () {
      if (this.remindContent.length > 0 && this.remindDate2.length > 0) {
        return true
      } else {
        return false
      }
    },
    diaryDate () {
      return msToDate(new Date())
    }
  },
  data () {
    return {
      isAddRemind: false,
      remindContent: JSON.parse(localStorage.getItem('remindContent')) || [],
      remindDate2: JSON.parse(localStorage.getItem('remindDate2')) || [],
      sizeForm: {
        date1: '',
        date2: '',
        resource: '锻炼'
      },
      value: new Date(),
      isAddDiary: false,
      diaryList: JSON.parse(localStorage.getItem('diaryList')) || [],
      textareaValue: '',
      nickname: '小明',
      trueName: '无名',
      yearOld: 30,
      isSetting: false,
      dialogVisible: false,
      form: {
        name: '',
        resName: '小红'
      },
      formLabelWidth: '120px',
      isClick: false
    }
  },
  methods: {
    // handleRemind () {
    //   this.isAddRemind = true
    // },
    onSubmit () {
      if (this.sizeForm.date1 === '' || this.sizeForm.date2 === '') {
        myAlert(false, '时间不能为空')
      } else {
        this.isAddRemind = false
        this.remindContent.unshift(this.sizeForm.resource)
        this.remindDate2.unshift(msToDate(this.sizeForm.date2))
        this.sizeForm.date1 = ''
        this.sizeForm.date2 = ''
        localStorage.setItem('remindContent', JSON.stringify(this.remindContent))
        localStorage.setItem('remindDate2', JSON.stringify(this.remindDate2))
        this.remindDate2.forEach(item => {
          if (item === msToDate(new Date())) {
            // 发送提醒消息
            this.$eventRemind.$emit('remind', { content: '提醒内容' })
          }
        })
      }
    },
    handleDelete (itemContent, itemDate) {
      const indexContent = this.remindContent.indexOf(itemContent)
      const indexDate = this.remindContent.indexOf(itemDate)
      if (indexContent !== -1) {
        this.remindContent.splice(indexContent, 1) // 从 remindContent 中删除对应元素
        this.remindDate2.splice(indexDate, 1) // 从 remindDate2 中删除对应元素
        localStorage.setItem('remindContent', JSON.stringify(this.remindContent)) // 更新本地存储
        localStorage.setItem('remindDate2', JSON.stringify(this.remindDate2)) // 更新本地存储
      }
    },
    onDiarySubmit () {
      this.isAddDiary = true
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
    handleAddDiary () {
      if (this.textareaValue === '') {
        myAlert(false, '内容不能为空')
      }
      this.isAddDiary = false
      this.diaryList.unshift(this.textareaValue)
      this.textareaValue = ''

      localStorage.setItem('diaryList', JSON.stringify(this.diaryList))
    },
    handleDiaryDelete (item) {
      const index = this.diaryList.indexOf(item)
      if (index !== -1) {
        this.diaryList.splice(index, 1)
        localStorage.setItem('diaryList', JSON.stringify(this.diaryList))
      }
    },
    handleSetting () {
      this.isSetting = false
      localStorage.setItem('nickname', JSON.stringify(this.nickname))
      localStorage.setItem('trueName', JSON.stringify(this.trueName))
      localStorage.setItem('yearOld', JSON.stringify(this.yearOld))
    },
    handleFormAccount () {
      this.isClick = !this.isClick
    },
    logout () {
      MessageBox.confirm('你确认要退出么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout')
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-box {
  padding-top: 100px;
  .info,
  .remind {
    border:1px solid #fee1b5;
    border-radius: 10px;
  }
  .info {
    position: relative;
    display:flex;
    flex-direction:row;
    align-items:center;
    float: left;
    margin: 50px 0 0 10px;
    // margin: 50px 0 0 200px;
    width: 390px;
    height: 200px;
    padding: 30px;
    img {
      float: left;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      // margin-left: 30px;
    }
    .my-info,
    .ipt-setting-box {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
    }
    .my-info {
      .colle {
        a {
          color: #1989FA;
        }
      }
    }
    .idenfiy {
      width: 50px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: rgb(185,118,63);
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: #fee1b5;
      border-radius: 10px;
    }
    .btn-setting {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;
      color: rgb(185,118,63);
      cursor: pointer;
    }
    .ipt-setting {
      margin-bottom: 5px;
      input {
        width: 120px;
        border: none;
        outline: none;
        border-bottom: 1px solid #f3f1f2;
      }
    }
    .logout-box {
      position: absolute;
      bottom: 5px;
      right: 5px;
      a {
        color: rgb(185,118,63);
        text-decoration: none;
      }
    }
  }
  .form-account {
    ul li {
      height: 60px;
      line-height: 55px;
      padding: 5px;
      list-style: none;
      img {
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .gray {
      background-color: #f3f1f2;
    }
  }
  .remind {
    float: left;
    // margin: 50px 0 0 10px;
    margin: 50px 0 0 150px;
    width: 600px;
    height: 200px;
    padding: 20px;
    background: url('@/assets/time.png') no-repeat;
    background-size: cover;
    .card-box {
      width: 460px;
    }
    .card-box ul li {
      float: left;
      margin: 30px 0 0 5px;
      list-style: none;
      transition: transform 0.2s ease-in-out;
      padding: 20px;
      width: 200px;
      height: 100px;
      border-radius: 10px;
      background-color: #fee1b5;
      opacity: 0.8;
      p {
          margin-top: 10px;
      }
      a {
          float: right;
          display: none;
          text-decoration: none;
          color: rgb(185,118,63);
      }
    }
    .card-box ul li:hover a {
      display: block;
    }
    .card-box ul li:hover {
      transform: scale(1.1);
    }
    .remind-setting {
      padding:10px;
      background-color: #fff;
      border:1px solid #fee1b5;
      border-radius: 10px;
    }
  }
  .diary {
    display: flex;
    justify-content: space-between;
    float: left;
    margin: 10px 0 0 150px;
    width: 1000px;
    height: 450px;
    // padding: 10px;
    .calendar-box {
      margin: auto;
      .el-calendar {
        width: 350px;
      }
      .el-calendar /deep/  .el-calendar-table .el-calendar-day {
        height: 35px;
      }
      .is-selected {
        color: #1989FA;
      }
    }
    .diary-list {
      width: 600px;
      border:1px solid #fee1b5;
      border-radius: 10px;
      padding: 10px;
      ul li {
        float: left;
        margin: 5px 0 0 5px;
        width: 250px;
        // height: 200px;
        padding: 5px;
        border-radius: 10px;
        background-color: #fee1b5;
        list-style: none;
        .diary-content {
          margin-top: 5px;
        }
        a {
          float: right;
          text-decoration: none;
          color: rgb(185,118,63);
        }
      }
    }
    .add-diary-box {
      position: relative;
      width: 390px;
      border: 1px solid #fee1b5;
      border-radius: 10px;
      padding: 10px;
      .add-diary {
        width: 100%;
        outline: none;
        border: none;
      }
      .btn-check {
        position: absolute;
        bottom: 10px;
        right: 55px;
      }
      .btn-close {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
}
</style>
