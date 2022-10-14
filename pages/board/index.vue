<template>
  <div class="board">
    <Banner></Banner>
    <Security :data="data1"></Security>
    <div class="content">
      <Check :data="data2"></Check>
      <Report :data="data3" :title="title"></Report>
      <Video></Video>
    </div>
    <Time></Time>
    <div class="three">
      <img src="../../assets/3d.jpg" alt="">
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner.vue'
import Security from '@/components/security.vue'
import Check from '@/components/check.vue'
import Report from '@/components/report.vue'
import Video from '@/components/video.vue'
import Time from '@/components/time.vue'

export default {
  async asyncData(context) {
    let security = await context.$axios.post('xlsx/security')

    let check = await context.$axios.post('xlsx/check')
    // console.log(check.data[0].data);

    let reportTitle = await context.$axios.post('txt/report/title')
    let reportContent = await context.$axios.post('txt/report/content')

    return {
      data1: security.data[0].data,
      data2: check.data[0].data,
      data3: reportContent.data,
      title: reportTitle.data
    }
  },
  head() {
    return {
      title: "数据看板"
    };
  },
  components: { Banner, Security, Check, Report, Video, Time },
  methods: {


  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import '../../assets/function.scss';

.board {
  min-height: 100vh;
  min-width: 100vh;
  background-color: #132235;
}

.content {
  margin-top: px2vh(20px);
  display: flex;
}

.check {
  margin-top: px2vh(30px);
  margin-left: px2vw(100px);
}
.report {
  margin-left: px2vw(300px);
}
.video {
  margin-left: px2vw(80px);
}
.time {
  position: fixed;
  right: px2vw(80px);
  top: px2vh(50px);
}

.three {
  width: px2vw(2000px);
  height: px2vh(600px);
  margin: 0 auto;
  margin-top: px2vh(120px);
  img {
    width: 100%;
  }
}

</style>
