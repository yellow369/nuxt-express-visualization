<template>
  <div>
    <div class="header"></div>
    <div class="content">
      <p>嘉兴玛氏数据看板</p>
      <dv-decoration-5 :dur="2" :color="['#1E4280']" />
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
  width: px2vw(2560px);
  height: px2vh(40px);
  background-color: #1E4280; 
}

.content {
  position: relative;

  p {
    width: px2vw(400px);
    position: absolute;
    top: 0;
    left: calc(50% - px2vw(200px));
    font-size: px2vw(50px);
    color: #fff;
    text-align: center;
  }
  .dv-decoration-5 {
    width: px2vw(1400px);
    height: px2vh(180px);
    margin: 0 auto;
  }
}
</style>
