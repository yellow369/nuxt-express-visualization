<template>
  <div class="board">
    <Banner></Banner>
    <div class="content">
      <Check></Check>
      <Security></Security>
      <Report></Report>
      <Video></Video>
    </div>
    <Time></Time>
    <Three></Three>
  </div>
</template>

<script>
import Banner from '@/components/banner.vue'
import Security from '@/components/board/security.vue'
import Check from '@/components/board/check.vue'
import Report from '@/components/board/report.vue'
import Video from '@/components/board/video.vue'
import Time from '@/components/time1.vue'
import Three from '@/components/board/three.vue'

export default {
  async asyncData(context) {
    // let security = await context.$axios.post('xlsx/security')
    // let check = await context.$axios.post('xlsx/check')
    // console.log(check.data[0].data);
    return {
      times: null
    }
  },
  head() {
    return {
      title: "数据看板"
    };
  },
  components: { Banner, Security, Check, Report, Video, Time, Three },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import '../../assets/function.scss';

.board {
  height: px2vh(2160px);
  width: px2vw(4096px);
  background: url(../../assets/3d-bg.png) no-repeat;
  background-size: px2vw(4096px) px2vh(2160px);
  position: relative;
}

.content {
  margin-top: px2vh(-60px);
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-items: flex-end;
}

.time {
  position: fixed;
  right: px2vw(150px);
  top: px2vh(120px);
}


</style>
