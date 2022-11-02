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
  components: { Banner, Security, Check, Report, Video, Time,Three },
  methods: {


  },
  mounted() {
    // this.times = setInterval(() => {
    //   let img = document.querySelector('.img3')
    //   let img1 = document.querySelector('.img1')
    //   if (!this.swiper) {
    //     img.classList.add('imgremove')
    //     img1.classList.add('imgremove')
    //     this.swiper = !this.swiper
    //   } else {
    //     img.classList.remove('imgremove')
    //     img1.classList.remove('imgremove')
    //     this.swiper = !this.swiper
    //   }
    // }, 10000)

    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(this.times);
    //   this.times = null;
    // })
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/function.scss';

.board {
  min-height: 100vh;
  min-width: 100vh;
  background: url(../../assets/data/bg.png) no-repeat;
  background-size: px2vw(4096px) px2vh(2160px);
}

.content {
  margin-top: px2vh(10px);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.time {
  position: fixed;
  right: px2vw(150px);
  top: px2vh(120px);
}


</style>
