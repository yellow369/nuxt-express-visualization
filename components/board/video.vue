<template>
  <div class="video">
    <div class="banner">
      <div class="title">
        <div class="text">安全生产视频</div>
      </div>
    </div>
    <dv-border-box-12 class="content">
      <img src="@/assets/video.jpg" alt="">
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


    }
  },
  head() {
    return {

    }
  },

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
    padding: px2vh(12px);
    overflow: hidden;

    img {
      height: px2vh(476px);
      width: px2vw(776px);
      border-radius: 8px;
    }
  }
}
</style>
