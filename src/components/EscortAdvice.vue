<template>
  <div class="advice">
    <el-popover
    placement="top-start"
    title="陪护建议"
    width="200"
    trigger="hover">
        <div class="content">
            <h4>饮食</h4>
            <p>注意不要过量食用含谷氨酸类食物，例如不能吃味精。</p>
            <h4>运动</h4>
            <p>坐在桌子边稍微耸肩，用手或肘支撑身体的重量，可以增大呼吸量。</p>
            <h4>其他</h4>
            <p>谨防感冒。如果发现感冒，请及时吃药，避免发烧。</p>
        </div>
        <el-button type="warning" slot="reference" class="el-icon-s-opportunity btn-tip"></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'EscortAdvice'
}
</script>

<style lang="less" scoped>
.advice {
    position: fixed;
    top: 50%;
    right: 50px;
    .btn-tip {
        font-size: 25px;
        // color: rgb(254,193,77);
        cursor: pointer;
    }
}
</style>
