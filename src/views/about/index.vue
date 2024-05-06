<template>
  <div class="about">
    <NavBox></NavBox>
    <div class="article-box">
        <img src="@/assets/homepage_02.jpg" alt="">
        <div class="article">
            <h1>了解渐冻症</h1>
            <p>
                肌萎缩侧索硬化（ALS）也叫运动神经元病（MND），后一名称英国常用，法国又叫夏科（Charcot）病，而美国也称卢伽雷（Lou Gehrig）病。我国通常将肌萎缩侧索硬化和运动神经元病混用。更加被人所熟知的名字叫作“渐冻症”。 它是上运动神经元和下运动神经元损伤之后，导致包括球部（所谓球部，就是指的是延髓支配的这部分肌肉）、四肢、躯干、胸部腹部的肌肉逐渐无力和萎缩。
            </p>
            <p>
                2018年5月11日，国家卫生健康委员会等5部门联合制定了《第一批罕见病目录》，肌萎缩侧索硬化被收录其中。2022年7月，中国学者参与的国际研究团队利用人工智能发现了“渐冻症”的潜在治疗靶点，为该疾病的治疗提供了新思路。
            </p>
            <h2>临床表现</h2>
            <p>早期症状轻微，易与其他疾病混淆。患者可能只是感到有一些无力、肉跳、容易疲劳等一些症状，渐渐进展为全身肌肉萎缩和吞咽困难。最后产生呼吸衰竭。</p>
            <p>依临床症状大致可分为两型：</p>
            <h3>1.肢体起病型</h3>
            <p>症状首先是四肢肌肉进行性萎缩、无力，最后才产生呼吸衰竭。</p>
            <h3>2.延髓起病型</h3>
            <p>先期出现吞咽、讲话困难，很快进展为呼吸衰竭。</p>
            <h2>治疗方法</h2>
            <p>尽早地做出诊断和鉴别诊断，尽早地给予神经保护和支持治疗，如力如太及其他药物，坚持定期随访。</p>
            <h3>1.一般疗法</h3>
            <p>支持疗法：对症治疗，适当锻炼。如注意呼吸道、消化道的功能。若口水多，可给予少量抗阻胺药；若痰多，可给予雾化吸入及化痰药；如出现情绪低落，给予抗抑郁治疗等。此外，还要多翻身以防止压疮发生。如进食障碍，给予鼻饲或经皮胃造瘘（PEG）。</p>
            <h3>2.特殊疗法</h3>
            <p>目前国际承认、且唯一通过美国食品药物监督局（FDA）批准治疗肌萎缩侧索硬化的药物为力如太（Rilutek），并且一定要尽早使用。</p>
            <h3>3.呼吸治疗</h3>
            <p>开始呼吸不顺时，可使用一般氧气或使用双正压呼吸机（BiBAP）帮助呼吸，发生进一步呼吸衰竭时，则需气管切开，使用人工呼吸机。</p>
        </div>
    </div>
  </div>
</template>

<script>
import NavBox from '@/components/NavBox.vue'
export default {
  name: 'AboutPage',
  components: {
    NavBox
  }
}
</script>

<style lang="less" scoped>
.about {
    .article-box {
        width: 1300px;
        margin: 150px auto;
        img {
            float: right;
            width: 500px;
            height: 700px;
            margin-left: 100px;
            margin-top: 50px;
        }
        .article {
            h1 {
                font-size: 60px;
            }
            p {
                margin-top: 50px;
                font-size: 25px;
                line-height: 1.5;
            }
            h2,
            h3 {
                margin-top: 50px;
            }
        }
    }
}
</style>
