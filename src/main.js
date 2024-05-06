import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/common.less'

// 引入 element 插件
import element from '@/components/element'
// element-ui所提供的css样式
import 'element-ui/lib/theme-chalk/index.css'
import { Loading } from 'element-ui'
Vue.use(Loading.directive)
Vue.use(element)

Vue.config.productionTip = false
// 创建一个全局的 Vue 实例作为事件总线
const eventRemind = new Vue()
// 将事件总线挂载到 Vue 原型上，这样可以在所有组件中访问到它
Vue.prototype.$eventRemind = eventRemind

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
