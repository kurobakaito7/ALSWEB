<template>
    <div class="content-it">
        <img src="@/assets/logo.png" alt="">
        <div class="it-say">
          {{ content }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'LeftChat',
  props: ['id', 'content']
}
</script>

<style lang="less" scoped>
.content-it {
  display: flex;
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
</style>
