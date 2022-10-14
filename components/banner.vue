<template>
  <div>
    <div class="header"></div>
    <div class="content">
      <p>嘉兴玛氏数据看板</p>
      <client-only>
        <dv-decoration-5 :dur="2" :color="['#1E4280']" />
      </client-only>
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


  p {
    width: px2vw(400px);
    margin: 0 auto;
    font-size: px2vw(50px);
    color: #fff;
    text-align: center;
  }
  .dv-decoration-5 {
    width: px2vw(1400px);
    height: px2vh(180px);
    margin: 0 auto;
    margin-top: px2vh(-100px);
  }
}
</style>
