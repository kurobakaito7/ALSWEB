<template>
  <div v-if="isSubmit" class="content-me">
    {{ myValue }}
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.content-me {
    float: right;
    display: inline-flex;
    margin-top: 15px;
    padding: 10px;
    color: rgb(79, 82, 92);
    background-color: orange;
    border-radius: 15px 15px 0 15px;
}
</style>
