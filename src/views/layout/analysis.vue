<template>
  <div class="analysis-box">
    <div class="alert">提示信息</div>
    <!-- 健康信息 -->
    <div class="healthy-info">
      <h2 style="color: rgb(185,118,63);">健康信息</h2>
      <div class="info">
        <img src="@/assets/avatar.jpg" alt="">
        <div v-if="isLogin">
          <div class="my-info">
            <span>姓名：佚名</span>
            <span>年龄：30</span>
          </div>
          <div class="idenfiy">
            <span>患者</span>
          </div>
        </div>
        <span v-else @click="$router.push('/login')">去登录</span>
      </div>
      <ul v-if="isLogin">
        <li>
          <h4>肌肉活动</h4>
          <p>无力</p>
        </li>
        <li>
          <h4>关节活动</h4>
          <p>迟缓</p>
        </li>
        <li>
          <h4>呼吸状况</h4>
          <p>正常</p>
        </li>
        <li>
          <h4>皮肤健康</h4>
          <p>正常</p>
        </li>
      </ul>
    </div>
    <!-- 步态分析 -->
    <div class="upload-box" v-show="!isLogin">
      <input type="file" id="upload" class="upload" accept="video/*" @change="handleUpload">
      <label v-show="!filePreview" for="upload" class="upload-label">点击上传视频</label>
      <video v-show="filePreview" controls class="preview-image">
        <source :src="filePreview" type="video/mp4">
      </video>
      <div v-show="isMask" class="mask">
        <div class="line"></div>
      </div>
      <div v-if="isAfter" class="after-img">
        <img src="@/assets/body.jpg" alt="" @click="hanldeImgClick">
        <div class="after-line1">
          <span class="line-item"></span>
          <span>手腕无力</span>
        </div>
        <div class="after-line2">
          <span>脚踝虚弱</span>
          <span class="line-item"></span>
        </div>
      </div>
    </div>
<!--    登录后生成数据-->
    <div class="data-box" v-if="isLogin"
         v-loading="loading"
         element-loading-text="视频正在分析中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-card class="box-card" v-show="listData === 'echarts'">
        <div id="box1" style="width: 500px;height:300px;"></div>
        <div class="container">
          <div id="box2" style="width: 300px;height:300px;"></div>
          <div id="box3" style="width: 300px;height:300px;"></div>
        </div>
        <el-button type="warning" @click="toTable" class="checkBtn">切换表格</el-button>
      </el-card>
      <el-card class="box-card" v-show="listData === 'table'">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top: 20px">
          <el-table-column
            prop="year"
            label="年份">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="体重">
          </el-table-column>
          <el-table-column
            prop="blood"
            label="血糖">
          </el-table-column>
          <el-table-column
            prop="BMI"
            label="BMI">
          </el-table-column>
        </el-table>
        <el-button class="infoSearch" @click="searchQuestion" icon="el-icon-document">调查问卷</el-button>
        <el-button type="primary" class="addBtn" @click="addData" icon="el-icon-plus">数据录入</el-button>
        <el-button type="warning" class="checkBtn" @click="toEcharts">切换可视化</el-button>
      </el-card>
      <el-card class="box-card" v-show="listData === 'tableNew'">
        <el-table
          :data="tableData1"
          border
          style="width: 100%;margin-top: 20px">
          <el-table-column
            prop="year"
            label="年份">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="体重">
          </el-table-column>
          <el-table-column
            prop="blood"
            label="血糖">
          </el-table-column>
          <el-table-column
            prop="BMI"
            label="BMI">
          </el-table-column>
        </el-table>
        <el-button type="primary" class="addBtn" @click="addData" icon="el-icon-plus">数据录入</el-button>
        <el-button type="warning" class="checkBtn" @click="toEcharts">切换可视化</el-button>
      </el-card>
      <el-card class="box-card" v-show="listData === 'anasly'">
        <el-table
          :data="videoData"
          style="width: 100%">
          <el-table-column
            label="日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handlerLook">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="handleDelete(scope.$index, videoData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" icon="el-icon-plus" class="addAnaly" @click="addVideo">新建分析</el-button>
      </el-card>
      <el-card class="box-card" v-show="listData === 'anaslyVideo'">
        <el-table
          :data="videoData1"
          style="width: 100%">
          <el-table-column
            label="日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handlerLook">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="handleDelete(scope.$index, videoData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" icon="el-icon-plus" class="addAnaly" @click="addVideo">新建分析</el-button>
      </el-card>
    </div>
    <el-button class="videoAisBtn" icon="el-icon-data-analysis" @click="backToData" v-if="listData === 'anasly'">数据展示</el-button>
    <el-button type="success" class="videoAisBtn" icon="el-icon-video-camera" @click="videoAnasly" v-else>视频分析</el-button>
    <el-dialog title="数据录入" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form">
        <el-form-item label="年份" label-width="80px">
          <el-input v-model="form.year" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="体重" label-width="80px">
          <el-input v-model="form.weight" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="血糖" label-width="80px">
          <el-input v-model="form.blood" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="BMI" label-width="80px">
          <el-input v-model="form.BMI" style="width: 180px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handlerCancel">取 消</el-button>
        <el-button type="primary" @click="handlerConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="分析报告"
      :visible.sync="showReport"
      width="80%"
    >
      <el-card>
        <h2>左右力曲线相似度：</h2>
        <div class="sameN">
          <div class="normalN" style="width: 50%;height: 400px">
            <img src="../../assets/phaseOffset.png" >
            <span style="margin-left: 50px">正常人左右力传感器曲线</span>
          </div>
          <div class="alsN" style="width: 50%;height: 400px">
            <img src="../../assets/alsPatient.png">
            <span style="margin-left: 50px">模拟患者左右力传感器曲线</span>
          </div>
        </div>
      </el-card>
      <el-card style="margin: 10px 0;">
        <div class="statisticContainer">
          <h3>腿部轨迹曲率：</h3>
          <div class="chongheRate" style="height: 50%;width: 50%">
            <img src="../../assets/chongheRate.png">
          </div>
          <div class="statistic">
            <h3>步态对称性：</h3>
            <h1>ASI</h1>
            <div style="font-size: 100px">0.312</div>
          </div>
        </div>
      </el-card>
      <el-card>
        <h2>步态稳定性：</h2>
        <div class="butaiContainer">
          <div class="static">
            <h3 style="margin-left: 100px">标准</h3>
            <div>步幅：0.5~1m&nbsp;步频：100~120</div>
            <div>支撑时间：0.5~0.7秒</div>
          </div>
          <div class="patient">
            <h3 style="margin-left: 100px">患者</h3>
            <div style="margin-left: 40px">步幅：0.5&nbsp;&nbsp;&nbsp;&nbsp;步频：<span style="color: red">87</span></div>
            <div style="margin-left: 40px">支撑时间：<span style="color: red">0.47s</span></div>
          </div>
        </div>
        <div class="imgContainer">
          <div style="font-size: 18px">步态周期（1~1.2s）：</div>
          <img src="../../assets/zhouqi.png">
          <div style="font-size: 18px">步态变化（5~10%）：</div>
          <img src="../../assets/bianhua2.png">
          <div style="font-size: 18px">步态相位（0.6~0.72）：</div>
          <img src="../../assets/xiangwei.png">
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showReport = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="上传视频"
      :visible.sync="videoVisible"
      width="30%">
      <input type="file" id="upload" class="upload" accept="video/*" @change="handleUpload">
      <label v-show="!filePreview" for="upload" class="upload-label">点击上传视频</label>
      <video v-show="filePreview" controls class="preview-image">
        <source :src="filePreview" type="video/mp4">
      </video>
      <span slot="footer" class="dialog-footer">
    <el-button @click="videoVisible = false">取 消</el-button>
    <el-button type="primary" @click="uploadVideo">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="SF-36健康调查表"
      :visible.sync="sqDialog"
      width="60%"
      center>
      <el-form ref="sqForm" :model="sqForm" :inline="true" label-width="80px" size="mini">
        <el-form-item label="编号" label-width="40px">
          <el-input v-model="sqForm.id" style="width: 30px"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="40px">
          <el-input v-model="sqForm.name" style="width: 60px"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="40px">
          <el-select v-model="sqForm.sex.value" placeholder="请选择性别">
            <el-option
              v-for="item in sqForm.sex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" label-width="40px">
          <el-input v-model="sqForm.year" style="width: 50px"></el-input>
        </el-form-item>
        <el-form-item label="管理类别" label-width="auto">
          <el-input v-model="sqForm.type"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="sqForm" :model="sqForm" label-width="80px" size="mini">
        <ol>
          <li>总体来讲，您的健康状况是：</li>
          <label><input type="radio" name="education" value="1" required />&nbsp;&nbsp;非常好&nbsp;&nbsp; </label>
          <label><input type="radio" name="education" value="2" />&nbsp;&nbsp;很好&nbsp;&nbsp; </label>
          <label><input type="radio" name="education" value="3" />&nbsp;&nbsp;好&nbsp;&nbsp; </label>
          <label><input type="radio" name="education" value="4" />&nbsp;&nbsp;一般&nbsp;&nbsp; </label>
          <label><input type="radio" name="education" value="5" />&nbsp;&nbsp;差 </label>
          <li>跟一年以前比您觉得自己的健康情况是：</li>
          <label><input type="radio" name="age" value="1" required />&nbsp;&nbsp;比一年前好多了&nbsp;&nbsp; </label>
          <label><input type="radio" name="age" value="2" />&nbsp;&nbsp;比一年前好一些&nbsp;&nbsp; </label>
          <label><input type="radio" name="age" value="3" />&nbsp;&nbsp;跟一年前差不多&nbsp;&nbsp; </label>
          <label><input type="radio" name="age" value="4" />&nbsp;&nbsp;比一年前差一些&nbsp;&nbsp; </label>
          <label><input type="radio" name="age" value="5" />&nbsp;&nbsp;比一年前差多了&nbsp;&nbsp;（权重或得分依次为5、4、3、2、1）</label>
          <h4>健康与日常活动</h4>
          <li>以下这些问题都和日常活动有关，请您想一想，您的健康状况是否限制了这些活动？如果有限制，程度如何？</li>
          <div>（1）重体力活动，如跑步、举重、参加剧烈运动等</div>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; （权重和得分依次为1,2,3;下同）</label>
          <div>（2）适度的活动，如移动一张桌子、扫地、打太极拳、做简单体操等</div>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <div>（3）手提日用品，如买菜、购物等</div>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <br/>
          <span>（4）上几层楼梯：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <br/>
          <span>（5）上一层楼梯：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <br/>
          <span>（6）弯腰、屈膝、下蹲：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <br/>
          <span>（7）步行1500米以上的路程：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <br/>
          <span>（8）步行1000米以上的路程：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <br/>
          <span>（9）步行100米以上的路程：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <br/>
          <span>（10）自己洗澡、穿衣：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;限制很大&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;有些限制&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="3" />&nbsp;&nbsp;毫无限制&nbsp;&nbsp; </label>
          <li>在过去4个星期里，您的工作和日常活动有无因为身体健康的原因而出现以下问题：</li>
          <span>（1）减少了工作或者其他活动的时间：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;是&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;不是&nbsp;&nbsp; （权重或得分依次为1,2;下同）</label>
          <br/>
          <span>（2）本来要做的事情只能完成一部分：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;是&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;不是&nbsp;&nbsp; </label>
          <br/>
          <span>（3）想要干的工作或者活动种类受到限制：</span>
          <label><input type="radio" name="use" value="1" required />&nbsp;&nbsp;是&nbsp;&nbsp; </label>
          <label><input type="radio" name="use" value="2" />&nbsp;&nbsp;不是&nbsp;&nbsp; </label>
        </ol>
        <br />
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="sqDialog = false">取 消</el-button>
    <el-button type="primary" @click="sqConfirm">提交</el-button>
  </span>
    </el-dialog>
    <EscortAdvice></EscortAdvice>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import EscortAdvice from '@/components/EscortAdvice.vue'
import myAlert from '@/utils/alert.js'
import * as echarts from 'echarts'
import { Message } from 'element-ui'

export default {
  name: 'AnalysisPage',
  components: {
    EscortAdvice
  },
  data () {
    return {
      filePreview: '',
      isMask: false,
      isAfter: false,
      listData: 'echarts',
      dialogFormVisible: false,
      videoVisible: false,
      sqDialog: false,
      loading: false,
      imageUrl: '',
      sTitle: 'ASI',
      sValue: '0.312',
      tableData: [{
        year: '2019',
        weight: 140,
        blood: 5.7,
        BMI: 18
      }, {
        year: '2020',
        weight: 144,
        blood: 6.1,
        BMI: 18.1
      }, {
        year: '2021',
        weight: 144,
        blood: 5.8,
        BMI: 18.1
      }, {
        year: '2022',
        weight: 146,
        blood: 5.9,
        BMI: 18.3
      }, {
        year: '2023',
        weight: 139,
        blood: 6.1,
        BMI: 18.2
      }],
      tableData1: [{
        year: '2019',
        weight: 140,
        blood: 5.7,
        BMI: 18
      }, {
        year: '2020',
        weight: 144,
        blood: 6.1,
        BMI: 18.1
      }, {
        year: '2021',
        weight: 144,
        blood: 5.8,
        BMI: 18.1
      }, {
        year: '2022',
        weight: 146,
        blood: 5.9,
        BMI: 18.3
      }, {
        year: '2023',
        weight: 139,
        blood: 6.0,
        BMI: 18.2
      }, {
        year: '2024',
        weight: 140,
        blood: 6.1,
        BMI: 18.1
      }],
      form: {
        year: '',
        weight: '',
        blood: '',
        BMI: ''
      },
      videoData: [
        {
          date: '2024-4-6'
        },
        {
          date: '2024-4-7'
        },
        {
          date: '2024-4-8'
        }
      ],
      videoData1: [
        {
          date: '2024-4-6'
        },
        {
          date: '2024-4-7'
        },
        {
          date: '2024-4-8'
        },
        {
          date: '2024-4-10'
        }
      ],
      showReport: false,
      sqForm: {
        id: '',
        name: '',
        sex: [
          {
            value: 'man',
            label: '男'
          },
          {
            value: 'woman',
            label: '女'
          }
        ],
        year: '',
        type: ''
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.user.islogin
    }
  },
  methods: {
    handleUpload (event) {
      const file = event.target.files[0]
      // 处理上传逻辑
      // console.log(file)

      // 回显上传内容
      const reader = new FileReader()
      reader.onload = () => {
        this.filePreview = reader.result
        if (this.filePreview) {
          this.isMask = true
          myAlert(true, '上传成功')
        }
      }
      reader.readAsDataURL(file)
      setTimeout(() => {
        this.isMask = false
        this.isAfter = true
      }, 3000)
    },
    hanldeImgClick () {
      document.querySelector('.upload-label').click()
      this.isAfter = false
    },
    toTable () {
      this.listData = 'table'
    },
    toEcharts () {
      this.listData = 'echarts'
    },
    addData () {
      this.dialogFormVisible = true
      this.form = {
        year: '',
        weight: '',
        blood: '',
        BMI: ''
      }
    },
    handlerCancel () {
      this.dialogFormVisible = false
      this.form = {
        year: '',
        weight: '',
        blood: '',
        BMI: ''
      }
    },
    handlerConfirm () {
      this.listData = 'tableNew'
      this.dialogFormVisible = false
      Message({
        type: 'success',
        message: '数据录入成功'
      })
    },
    videoAnasly () {
      this.listData = 'anasly'
    },
    backToData () {
      this.listData = 'echarts'
    },
    handleDelete (index, row) {
      row.splice(index, 1)
      Message({
        type: 'success',
        message: '删除成功'
      })
    },
    handlerLook () {
      // this.showReport = true
      // this.$router.push('/screen')
      window.open('/screen/index.html')
    },
    addVideo () {
      this.videoVisible = true
    },
    uploadVideo () {
      this.videoVisible = false
      this.listData = 'anaslyVideo'
      this.loading = true
      setTimeout(() => {
        this.loading = false
        Message({
          type: 'success',
          message: '视频分析成功'
        })
      }, 2000)
    },
    searchQuestion () {
      this.sqDialog = true
    },
    sqConfirm () {
      this.sqDialog = false
      Message({
        type: 'success',
        message: '问卷提交成功'
      })
    }
  },
  mounted () {
    gsap.to('.line', {
      x: '400px',
      duration: 3, // 动画时长
      repeat: -1, // 重复的次数
      yoyo: true
    })
    // 基于准备好的dom，初始化echarts实例
    const myChart1 = echarts.init(document.getElementById('box1'))
    const option1 = {
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024']
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: 'true'
        },
        name: '体重',
        nameTextStyle: {
          color: 'rgb(185,118,63)',
          fontSize: 15,
          fontWeight: 'bold'
        }
      },
      series: [
        {
          data: [140, 144, 142, 147, 139],
          type: 'line',
          lineStyle: {
            color: 'rgb(185,118,63)'
          }
        }
      ]
    }
    myChart1.setOption(option1)

    const myChart2 = echarts.init(document.getElementById('box2'))
    const option2 = {
      xAxis: {
        type: 'category',
        data: ['2021', '2022', '2023']
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: 'true'
        },
        legend: {
          top: '50%'
        },
        name: '血糖',
        nameTextStyle: {
          color: 'rgb(185,118,63)',
          fontSize: 15,
          fontWeight: 'bold'
        }
      },
      series: [
        {
          data: [5.8, 5.9, 6.1],
          type: 'bar',
          itemStyle: {
            color: 'rgb(185,118,63)'
          }
        }
      ]
    }
    myChart2.setOption(option2)

    const myChart3 = echarts.init(document.getElementById('box3'))
    const option3 = {
      xAxis: {
        type: 'category',
        data: ['2021', '2022', '2023']
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: 'true'
        },
        legend: {
          left: 'right'
        },
        name: 'BMI',
        nameTextStyle: {
          color: 'rgb(185,118,63)',
          fontSize: 15,
          fontWeight: 'bold'
        }
      },
      series: [
        {
          data: [18.1, 18.3, 18.2],
          type: 'bar',
          itemStyle: {
            color: 'rgb(185,118,63)'
          }
        }
      ]
    }
    myChart3.setOption(option3)
  },
  created () {
    // 在组件的 created 或 mounted 钩子中监听提醒消息
    this.$eventRemind.$on('remind', (data) => {
      // 处理收到的提醒消息
      console.log('步态分析里的' + data.content)
    })
  }
}
</script>

<style lang="less" scoped>
.analysis-box {
  display: flex;
  padding-top: 100px;
}
.healthy-info {
  width: 500px;
  height: 600px;
  padding: 30px;
  margin: 50px 0 0 180px;
  background-color: #fee1b5;
  border-radius: 10px;
  box-shadow: 15px 15px 15px 0 #ccc;
  .info {
    position: relative;
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-top: 40px;
    width: 415px;
    height: 150px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    img {
      float: left;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-left: 25px;
      margin-right: 15px;
    }
    .my-info {
      display: flex;
      flex-direction: column;
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
  }
  ul li {
    float: left;
    list-style: none;
    width: 200px;
    height: 100px;
    text-align: center;
    margin-top: 20px;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 10px;
    h4 {
      margin: 20px 0;
      color: rgb(185,118,63);
    }
  }
}
.upload-box {
  position: relative;
  width: 400px;
  height: 600px;
  margin: 50px 0 0 50px;
  box-shadow: 15px 15px 15px 0 #ccc;
}
.upload-label {
  display: inline-block;
  width: 400px;
  height: 600px;
  line-height: 600px;
  text-align: center;
  padding: 10px 20px;
  color: #000;
  background-color: #fee1b5;
  opacity: 0.4;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 10px;
}
.data-box {
  position: relative;
  width: 600px;
  height: 600px;
  margin: 50px 0 20px 50px;
  box-shadow: 15px 15px 15px 0 #ccc;
}
.box-card{
  .container{
    display: flex;
  }
  .checkBtn{
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
  }
  .addBtn {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .addAnaly {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .infoSearch{
    display: flex;
    position: absolute;
    right: 0;
    bottom: 40px;
  }
}
.videoAisBtn {
  display: flex;
  position: absolute;
  top: 150px;
  right: 70px;
}
.sameN {
  display: flex;
  justify-content: space-between;
  .normalN{
    img{
      width: 100%;
      height: 350px;
    }
  }
  .alsN{
    img{
      width: 100%;
      height: 350px;
    }
  }
}
.statisticContainer{
  display: flex;
  .chongheRate{
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.butaiContainer{
  display: flex;
  justify-content: space-between;
  .static{
    width: 50%;
  }
  .patient{
    width: 50%;
  }
}
.imgContainer{
  width: 100%;
  height: 300px;
}
.upload {
  display: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.preview-image {
  display: block;
  width: 400px;
  height: 100%;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgb(0, 106, 255);
  // opacity: 0.2;
  .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    border: 1px solid blue;
  }
}
.after-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  .after-line1 {
    position: absolute;
    top: 280px;
    right: 25px;
    color: red;
  }
  .after-line2 {
    position: absolute;
    bottom: 70px;
    left: 80px;
    color: red;
  }
  .line-item {
      display: inline-block;
      width: 30px;
      height: 2px;
      border-top: 1px solid red;
    }
}
</style>
