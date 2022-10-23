<template>
  <div class="board">
    <Banner></Banner>
    <div class="content">
      <!-- <Time></Time> -->
      <div class="second">
        <Order></Order>
        <Volume :data="volume"></Volume>
      </div>
      <Stock></Stock>
      <Infor></Infor>
    </div>
  </div>
</template>

<script>
import Time from '@/components/time.vue'
import Banner from '@/components/banner.vue'
import Volume from '@/components/data/volume.vue'
import Order from '@/components/data/order.vue'
import Stock from '@/components/data/stock.vue'
import Infor from '@/components/data/infor.vue'


export default {
  async asyncData(context) {
    let volume = await context.$axios.post('request/volume')


    return {
      volume: volume.data.data,

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

.board {
  min-height: 100vh;
  min-width: 100vh;
  background-color: #000;
}

.content {
  padding: px2vh(41px) px2vh(86px);
}

.time {
  position: fixed;
  right: px2vw(80px);
  top: px2vh(50px);
}

.second {
  display: flex;
  justify-content: space-between
}

.stock {
  margin-top: px2vh(50px);
}

.infor {
  margin-top: px2vh(50px);
}
</style>
