<template>
  <div class="data">
    <Time></Time>
    <Banner></Banner>
    <div class="content">
      <div class="content-l">
        <Order></Order>
        <Infor></Infor>
      </div>
      <div class="content-r">
        <Volume></Volume>
        <Stock></Stock>
      </div>
    </div>
  </div>
</template>

<script>
import Time from '@/components/time1.vue'
import Banner from '@/components/banner.vue'
import Volume from '@/components/data/volume.vue'
import Order from '@/components/data/order.vue'
import Stock from '@/components/data/stock_re.vue'
import Infor from '@/components/data/infor.vue'

export default {
  async asyncData(context) {

    return {
    }
  },
  head() {
    return {
      title: 'Users'
    }
  },
  components: {
    Time,
    Banner,
    Volume,
    Order,
    Stock,
    Infor
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import '../../assets/function.scss';

.data {
  min-height: 100vh;
  min-width: 100vh;
  // background-color: #000;
  background: url(../../assets/3d-bg.png) no-repeat;
  background-size: px2vw(4096px) px2vh(2160px);
  position: relative;
}

.content {
  display: flex;
  width: 100%;

  .content-l {
    margin-left: px2vw(87px);
    margin-right: px2vw(36px);

    .infor {
      margin-top: px2vh(32px);

    }
  }

  .content-r {
    .stock {
      margin-top: px2vh(32px);

    }
  }
}
</style>
