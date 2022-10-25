<template>
  <div class="board">
    <Banner></Banner>
    <Security></Security>
    <div class="content">
      <Check></Check>
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
      <img src="../../assets/img/three.png" alt="">

      <!-- <img src="../../assets/img/three.png" alt="" class="img3"> -->
      <!-- <img src="../../assets/img/three1.png" alt="" class="img1"> -->
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
  background-color: rgb(19, 34, 53);
}

.content {
  margin-top: px2vh(-50px);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.check {
  margin-top: px2vh(-100px);
  // margin-left: px2vw(100px);
}

.report {
  margin-left: px2vw(300px);
}

.video {
  margin-left: px2vw(80px);
  margin-top: px2vh(-160px);
}

.time {
  position: fixed;
  right: px2vw(150px);
  top: px2vh(120px);
}

.three {
  width: px2vw(3500px);
  height: px2vh(800px);
  margin: 0 auto;
  margin-top: px2vh(100px);
  text-align: center;
  overflow: hidden;

  .banner {
    width: px2vw(180px);
    height: px2vh(70px);
    border: px2vw(3px) solid rgba(81, 139, 195, 0.9);
    padding: px2vw(4px);

    .title {
      background-color: rgba(81, 139, 195, 0.9);
      height: px2vh(57px);
      width: px2vw(166px);
      font-size: px2vw(36px);
      text-align: center;
      line-height: px2vh(57px);
      font-weight: 600;
      color: rgba(255, 255, 255, 0.751);
    }
  }

  img {
    height: 90%;
    // transition: all 1s;
  }
}

.imgremove {
  transform: translateY(px2vh(-800px));

}
</style>
