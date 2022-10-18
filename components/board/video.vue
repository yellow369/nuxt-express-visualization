<template>
  <div class="video">
    <client-only>
      <dv-decoration-7 class="title">&nbsp;&nbsp;FM消防检查&nbsp;&nbsp;</dv-decoration-7>
    </client-only>
    <client-only>
      <dv-border-box-12 class="content">
        <img src="@/assets/video.jpg" alt="">
      </dv-border-box-12>
    </client-only>

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
  width: px2vw(500px);
  height: px2vh(300px);

  .title {
    width: px2vw(500px);
    height: px2vh(40px);
    color: #fff;
    line-height: px2vh(40px);
    font-size: px2vw(24px);
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0 auto;
    margin-top: px2vh(-80px);
  }

  .content {
    width: px2vw(500px);
    height: px2vh(300px);
    margin-top: px2vh(20px);

    img {
      width: 100%;

    }
  }
}
</style>
