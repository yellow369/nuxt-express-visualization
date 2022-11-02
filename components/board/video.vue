<template>
  <div class="video">
    <div class="banner">
      <div class="title">
        <!-- <div class="text">安全生产视频</div> -->
      </div>
    </div>
    <div class="content">
      <video src="/api/video" autoplay loop muted controls></video>
    </div>
  </div>
</template>

<script>

export default {
  props: {

  },
  data(context) {
    // const data = await $http.$get('/api/users')

    return {

      src: ''
    }
  },
  head() {
    return {

    }
  },
  methods: {
    get() {
      this.$axios.post('video').then((res) => {
        this.src = res.data
        console.log(res);
      }).catch((err) => {
        console.log('请求失败' + err.message);
      })

    }
  },
  mounted() {

    // this.get()
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.video {
  width: px2vw(892px);
  height: px2vh(555px);
  background: url(../../assets/index/video/bg.png);
  background-size: px2vw(892px) px2vh(555px);

  .banner {
    width: px2vw(320px);
    height: px2vh(96px);


    .title {
      height: px2vh(66px);
      width: px2vw(366px);
      font-size: px2vw(56px);
      line-height: px2vh(140px);
      font-weight: 600;
      color: rgba(255, 255, 255, 0.751);
      text-shadow: 0px 2px 25px #0083F0;
      margin-left: px2vw(40px);
    }
  }

  // .title {
  //   width: px2vw(500px);
  //   height: px2vh(40px);
  //   color: #fff;
  //   line-height: px2vh(40px);
  //   font-size: px2vw(24px);
  //   font-weight: 700;
  //   letter-spacing: 2px;
  //   margin: 0 auto;
  //   margin-top: px2vh(-80px);
  // }

  .content {
    width: px2vw(850px);
    height: px2vh(400px);
    overflow: hidden;
    margin: 0 auto;
    margin-top: px2vh(30px);
    // background-color: #fff;
    border-radius: 10px;

    video {
      width: px2vw(850px);
      height: px2vh(400px);
    }

  }
}
</style>
