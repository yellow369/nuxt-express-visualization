<template>
  <div class="banner">
    <div class="header">
      <img src="../assets/title.png" alt="">
    </div>
    <div class="i-logo"></div>
  </div>
</template>

<script>

export default {
  async asyncData(context) {
    // const data = await $http.$get('/api/users')

  },
  head() {
    return {

    }
  },

}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.banner {
  position: relative;

  .header {
    width: 100%;
    height: px2vh(217px);

    img {
      width: 100%;
      margin-top: px2vh(-30px);
    }
  }

  .i-logo {
    width: px2vw(241px);
    height: px2vh(52px);
    background: url(../assets/中外运logo.png) no-repeat;
    background-size: px2vw(241px) px2vh(52px);
    position: absolute;
    right: 1%;
    bottom: 18%;
  }
}

// .content {


//   p {
//     width: px2vw(400px);
//     margin: 0 auto;
//     font-size: px2vw(50px);
//     color: #fff;
//     text-align: center;
//   }
//   .dv-decoration-5 {
//     width: px2vw(1400px);
//     height: px2vh(180px);
//     margin: 0 auto;
//     margin-top: px2vh(-101px);
//   }
// }
</style>
