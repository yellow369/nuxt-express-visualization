<template>
  <div class="board">
    <Banner></Banner>

    <Time></Time>
    <div class="second">
      <Order :data="order" :header="header"></Order>
      <Volume :data="volume"></Volume>
    </div>
    <Stock :data="stock" :total="total"></Stock>
    <In></In>
  </div>
</template>

<script>
import Time from '@/components/time.vue'
import Banner from '@/components/banner.vue'
import Volume from '@/components/data/volume.vue'
import Order from '@/components/data/order.vue'
import Stock from '@/components/data/stock.vue'
import In from '@/components/data/in.vue'


export default {
  async asyncData(context) {
    let volume = await context.$axios.post('request/volume')
    let order = await context.$axios.post('xlsx/order')
    let stock = await context.$axios.post('request/stock')
    let total = await context.$axios.post('xlsx/stock')

    return {
      volume: volume.data.data,
      order: order.data[0].data,
      header: order.data[0].data[0],
      stock: stock.data.p_msg,
      total: total.data[0].data
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
    In
}
}
</script>

<style scoped lang="scss">
@import '../../assets/function.scss';

.board {
  min-height: 100vh;
  min-width: 100vh;
  background-color: #132235;
}

.time {
  position: fixed;
  right: px2vw(80px);
  top: px2vh(50px);
}

.second {
  display: flex;
  justify-content: flex-end;
  .order {
    margin-top: -30px;
  }
}
</style>
