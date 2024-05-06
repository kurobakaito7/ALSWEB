import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Analysis from '@/views/layout/analysis'
import Community from '@/views/layout/community'
import User from '@/views/layout/user'
import Talk from '@/views/talk'
import About from '@/views/about'
import Screen from '@/views/screen'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/analysis', component: Analysis },
        { path: '/community', component: Community },
        { path: '/user', component: User }
      ]
    },
    { path: '/talk', component: Talk },
    { path: '/about', component: About },
    { path: '/screen', component: Screen }
  ]
})

const authUrl = ['/user']
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
