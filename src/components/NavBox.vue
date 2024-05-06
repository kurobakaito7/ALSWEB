 <template>
  <div class="nav">
    <div @click="$router.push('/home')" class="logo">
      <h1>ALS</h1>
      <h4>ASSOCIATION</h4>
    </div>
    <ul>
      <li :class="{ active: activeIndex === 0}" data-index="0"  @click="handleNavClick(0)">
        <router-link to="/">首页</router-link>
      </li>
      <li :class="{ active: activeIndex === 1}" data-index="1" @click="handleNavClick(1)">
        <router-link to="/analysis">步态分析</router-link>
      </li>
      <li :class="{ active: activeIndex === 2}" data-index="2" @click="handleNavClick(2)">
        <router-link to="/community">社区交流</router-link>
      </li>
      <li :class="{ active: activeIndex === 3}" data-index="3" @click="handleNavClick(3)">
        <router-link to="/user">个人中心</router-link>
      </li>
    </ul>
    <div v-if="!isLogin" class="login">
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavComponent',
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  mounted () {
    // 获取当前路由路径，然后设置activeIndex的值
    const currentPath = this.$route.path

    if (currentPath === '/') {
      this.activeIndex = 0
    } else if (currentPath === '/analysis') {
      this.activeIndex = 1
    } else if (currentPath === '/community' || currentPath === '/talk') {
      this.activeIndex = 2
    } else if (currentPath === '/contact') {
      this.activeIndex = 3
    }
  },
  methods: {
    handleNavClick (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  // align-items: flex-end;
  align-items: center;
  z-index: 999;
  width: 100%;
  height: 60px;
  background: linear-gradient(to right bottom,rgba(255,212,128, 0.8), rgba(255,212,128, 0.7), rgba(255,212,128, 0.6));
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}
.logo {
  width: 110px;
  height: 80px;
  margin: 0 50px;
  text-align: center;
  padding: 12px 0;
  color: #fff;
  background-color: orange;
  cursor: pointer;
  h1 {
    font-size: 45px;
    font-weight: bolder bolder;
    letter-spacing: -6px;
    line-height: 1.1;
  }
  h4 {
    font-size: 11px;
    line-height: 0;
  }
}
.nav ul {
  width: 1000px;
  list-style-type: none;
  display: flex;
  // flex-grow: 1;
  margin-left: 30px;
  margin-top: 10px;
}

.nav li {
  margin-right: 50px;
}

.nav a {
  text-decoration: none;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

.nav a:hover {
  // color: rgb(185,118,63);
  color: orange;
}

.nav ul li.active a{
    // color: rgb(220, 144, 1);
    color: orange;
  }

.login {
  width: 80px;
  height: 100%;
  line-height: 60px;
  text-align: center;
  a {
    color: rgb(19, 19, 140);
  }
  margin-left: 45px;
  margin-top: 10px;
}
</style>
