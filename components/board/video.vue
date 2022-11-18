<template>
  <div class="video">
    <div class="banner">
      <div class="title">
        <div class="text">安全生产视频<br /><span>Safe Production Video</span></div>
      </div>
    </div>
    <div class="content">
      <video src="/api/video/test" autoplay loop muted controls></video>
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
  width: px2vw(660px);
  height: px2vh(555px);
  background: url(../../assets/index/video/背景框.png) no-repeat;
  background-size: px2vw(660px) px2vh(555px);

  .banner {
    width: px2vw(640px);
    height: px2vh(96px);

    .title {
      height: px2vh(66px);
      width: px2vw(620px);
      font-size: px2vh(45px);
      line-height: px2vh(40px);
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      // text-shadow: 0px 2px 25px #0083F0;
      padding-top: px2vh(15px);
      text-align: right;

      .text {
        width: 100%;

        span {
          font-size: px2vw(30px);
        }
      }
    }
  }

  .content {
    width: px2vw(630px);
    height: px2vh(400px);
    overflow: hidden;
    margin: 0 auto;
    margin-top: px2vh(30px);
    // background-color: #fff;
    border-radius: 10px;

    video {
      // width: px2vw(730px);
      height: px2vh(400px);
    }

  }
}
</style>
