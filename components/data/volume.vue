<template>
  <div class="volume">
    <div class="title">
      <div class="text">原料包材出入库体积(m³)</div>
    </div>
    <div class="content" id="main">

    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    data: ''
  },
  data() {
    // console.log(this.data.map((items) => items.ORDERDATE));

    return {}
  },
  head() {
    return {

    }
  },
  mounted() {
    this.drawCharts()
    window.onresize = () => {
      this.drawCharts()
    }
  },
  methods: {
    drawCharts() {
      let out = this.data.filter((items) => {
        if (items.TYPE == '出库') {
          return items.VOLUME
        }
      })
      let volume = out.map((items) => items.VOLUME)
      let outTime = out.map((items) => items.ORDERDATE)

      let into = this.data.filter((items) => {
        if (items.TYPE == '入库') {
          return items.VOLUME
        }
      })
      let volume1 = into.map((items) => items.VOLUME)
      let outTime1 = into.map((items) => items.ORDERDATE)

      let myCharts = echarts.init(document.getElementById('main'));
      myCharts.setOption({
        tooltip: {},
        legend: {
          // Try 'horizontal'
          orient: 'horizontal',
          bottom: 20,
          left: 'center',
          textStyle: {
            color: '#ccc'
            // ...
          }
        },
        xAxis: {
          type: 'category',
          data: outTime
        },
        yAxis: {},
        series: [
          {
            name: '入库',
            type: 'bar',
            data: volume1
          },
          {
            name: '出库',
            type: 'bar',
            data: volume
          },

        ],
        color: [
          '#1778FF',
          '#7BB7FF'
        ]
      });
      myCharts.resize()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.title {
  width: px2vw(300px);
  color: #fff;
  border: 2px solid #1A4273;
  padding: 4px;
  margin-left: px2vw(100px);

  .text {
    background-color: #1A4273;
    font-weight: 700;
    font-size: px2vw(24px);
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}

.content {
  width: px2vw(1500px);
  height: px2vh(500px);
}
</style>
