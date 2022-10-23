<template>
  <div class="board">
    <Banner></Banner>
    <Security></Security>
    <div class="content">
      <Check ></Check>
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
import Security from '@/components/board/security.vue'
import Check from '@/components/board/check.vue'
import Report from '@/components/board/report.vue'
import Video from '@/components/board/video.vue'
import Time from '@/components/time.vue'

export default {
  async asyncData(context) {
    // let security = await context.$axios.post('xlsx/security')
    // let check = await context.$axios.post('xlsx/check')
    // console.log(check.data[0].data);


    return {

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
  background-color: #000;
}

.content {
  margin-top: px2vh(50px);
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
  margin-top: px2vh(130px);
  img {
    width: 100%;
  }
}

</style>
