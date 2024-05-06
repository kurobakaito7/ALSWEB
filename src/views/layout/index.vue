<template>
    <div>
        <NavBox></NavBox>
      <!-- 二级路由出口 -->
      <router-view></router-view>
    </div>
  </template>

<script>
import NavBox from '@/components/NavBox.vue'
export default {
  name: 'LayoutIndex',
  components: {
    NavBox
  }
}
</script>

  <style>
  /* 样式 */
  </style>
