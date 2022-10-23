<template>
  <div>
    <div class="header">
      <img src="../assets/img/banner.png" alt="">
    </div>
    
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

.header {
  width: 100%;
  height: px2vh(137px);

  img {
    width: 100%;
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
