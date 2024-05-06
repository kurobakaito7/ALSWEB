<template>
  <div class="talk-box">
    <NavBox></NavBox>
    <el-page-header @back="$router.go(-1)" title="社区" class="back"></el-page-header>
    <TalkItem></TalkItem>
  </div>
</template>

<script>
import NavBox from '@/components/NavBox.vue'
import TalkItem from '@/components/TalkItem.vue'
export default {
  name: 'TalkIndex',
  components: {
    NavBox,
    TalkItem
  }
}
</script>

<style lang="less" scoped>
.talk-box {
  padding-top: 100px;
  .back {

    margin-left: 200px;
  }
}
</style>
