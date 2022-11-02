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
    <div class="three">
      <div class="banner">
        <div class="title">
          <div class="text">阀门:</div>
        </div>
      </div>
      <img src="../../assets/img/three2.png" alt="">
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner.vue'
import Security from '@/components/board/security.vue'
import Check from '@/components/board/check.vue'
import Report from '@/components/board/report.vue'
import Video from '@/components/board/video.vue'
import Time from '@/components/time1.vue'

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
  components: { Banner, Security, Check, Report, Video, Time },
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

.three {
  width: px2vw(3500px);
  height: px2vh(1200px);
  margin: 0 auto;
  margin-top: px2vh(20px);
  text-align: center;

  .banner {
    width: px2vw(300px);
    height: px2vh(70px);
    padding: px2vw(4px);
    margin-top: px2vw(100px);

    .title {
      font-size: px2vh(46px);
      color: #18E8FC;
      line-height: px2vh(52px);
      letter-spacing: px2vw(7px);
      text-shadow: 0px 2px 8px #0037BD;
      background: linear-gradient(360deg, #AAE7FF 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }
  }

  img {
    height: px2vh(1100px);
    margin-top: px2vh(-150px);
    margin-left: px2vw(50px);
    // transition: all 1s;
  }
}

.imgremove {
  transform: translateY(px2vh(-800px));

}
</style>
