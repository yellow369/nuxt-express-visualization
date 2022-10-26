<template>
  <div class="video">
    <div class="banner">
      <div class="title">
        <div class="text">安全生产视频</div>
      </div>
    </div>
    <dv-border-box-12 class="content">
      <div class="border">
        <video src="/api/video" autoplay loop muted></video>
      </div>
    </dv-border-box-12>
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
  width: px2vw(800px);
  height: px2vh(500px);

  .banner {
    width: px2vw(380px);
    height: px2vh(70px);
    border: px2vw(3px) solid rgba(81, 139, 195, 0.9);
    padding: px2vw(4px);
    margin: 0 auto;

    .title {
      background-color: rgba(81, 139, 195, 0.9);
      height: px2vh(57px);
      width: px2vw(366px);
      font-size: px2vw(36px);
      text-align: center;
      line-height: px2vh(57px);
      font-weight: 600;
      color: rgba(255, 255, 255, 0.751);
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
    width: px2vw(800px);
    height: px2vh(500px);
    margin-top: px2vh(20px);
    padding: px2vh(22px);
    overflow: hidden;

    .border {
      height: 98%;
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      // background-color: #fff;

      video {
        height: 100%;
        width: 100%;
      }
    }

  }
}
</style>
