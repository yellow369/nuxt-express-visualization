<template>
  <div>
    <div class="num">
      <div class="num-item">
        3
      </div>
      <div class="num-item">
        3
      </div>
      <div class="num-item">
        3
      </div>
    </div>
    <div class="content">
      <p>2022年已连续安全生产</p>
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

.num {
  display: flex;
  width: px2vw(200px);
  height: px2vh(80px);
  margin: 0 auto;
  margin-bottom: 10px;
  color: #fff;
  text-align: center;
  justify-content: space-evenly;

  &-item {
    width: px2vw(50px);
    height: px2vh(80px);
    background-color: #1D91FF;
    border-radius: 8px;
    font-size: px2vh(60px);
    line-height: px2vh(80px);
    font-weight: 600;
  }
}

.content {
  width: px2vw(300px);
  height: px2vh(40px);
  background-color: rgba(255, 255, 255, 0.29);
  text-align: center;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.644);
  font-size: px2vw(24px);
  font-weight: 500;
}
</style>
