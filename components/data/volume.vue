<template>
  <div class="volume">
    <div class="banner">
      <div class="title">
        <div class="text">原料包材出入库体积(m³)</div>
      </div>

    </div>
    <div class="content" id="main">

    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {

  },
  data() {
    // console.log(this.data.map((items) => items.ORDERDATE));

    return { data: null, i: 0, times: null }
  },
  head() {
    return {

    }
  },
  mounted() {

    this.get()
    this.times = setInterval(() => {
      this.get()
    }, 12000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      this.times = null;
    })
  },
  methods: {
    get() {
      try {
        this.$axios.post('request/volume').then((res) => {
          this.data = res.data.data

          this.drawCharts()
          window.onresize = () => {
            this.drawCharts()
          }
        }).catch((err) => {
          console.log('请求失败' + err.message);
        })
      } catch (error) {
        console.log(error);
      }
    },

    drawCharts() {
      let out = this.data.filter((items) => {
        if (items.TYPE == '出库') {
          return items.VOLUME
        }
      })
      let volume = out.map((items) => items.VOLUME)
      let outTime = out.map((items) => items.ORDERDATE.slice(5))

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
          top: 0,
          right: 0,
          textStyle: {
            color: '#fff'
            // ...
          }
        },
        grid: {
          left: '3%',
          right: '2%',
          bottom: '0%',
          top: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: outTime,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              // fontSize: 14
            },
            // interval: 'auto',
            // rotate: 50
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(64, 120, 255, 0.5000)',
              type: 'dashed'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            }
          },
        },
        series: [
          {
            name: '入库',
            type: 'bar',
            data: volume1,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, x2: 1, y: 0, y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3072FF'
                  },
                  {
                    offset: 1,
                    color: ' rgba(81,122,255,0.4)'
                  }
                ]
              },
              borderRadius: [5, 5, 0, 0]
            }
          },
          {
            name: '出库',
            type: 'bar',
            data: volume,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, x2: 1, y: 0, y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(121,231,255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(133,228,255,0.4)'
                  }
                ]
              },
              borderRadius: [5, 5, 0, 0]
            }
          },

        ],
        color: [
          '#1778FF',
          '#7BB7FF'
        ]
      });
      myCharts.resize()
    }
  },
  destroyed() {

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.volume {
  background: url(../../assets/data/volume/bg.png) no-repeat;
  background-size: px2vw(1938px) px2vh(704px);
  width: px2vw(1938px);
  height: px2vh(704px);

  .banner {
    width: px2vw(1938px);
    height: px2vw(150px);
    display: flex;
    justify-content: space-between;

    .title {
      width: px2vw(800px);
      height: px2vh(150px);
      color: #fff;
      background: url(../../assets/img/order.png) no-repeat;
      background-position: -10px;
      background-size: 80%;
      display: flex;
      align-items: flex-start;
      flex-direction: column-reverse;
      justify-content: space-around;
      margin-left: px2vw(40px);

      .text {
        width: px2vw(599px);
        height: px2vh(52px);
        font-size: px2vh(46px);
        // font-family: HYZhuZiChaoRanTiW;
        color: #18E8FC;
        line-height: px2vh(52px);
        letter-spacing: px2vw(7px);
        text-shadow: 0px 2px 8px #0037BD;
        background: linear-gradient(360deg, #AAE7FF 0%, #FFFFFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-left: px2vw(100px);
      }



    }
  }

  .content {
    width: px2vw(1900px);
    height: px2vh(553px);
  }
}
</style>
