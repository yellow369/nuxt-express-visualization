<template>
  <div class="volume">
    <div class="banner">
      <div class="title">
        <div class="text">原料包材出入库体积(m³) <br /><span>Raw Materials Package Materials Receiving Data</span></div>
      </div>
      <div class="legend">
        <div style="display: inline-block;margin-right: 10px;">
          <div class="dot-in"></div><span style="color: rgba(251, 27, 190, 1)">&nbsp;入库</span>
        </div>
        <div style="display: inline-block">
          <div class="dot-out"></div><span style="color: rgba(139, 255, 193, 1)">&nbsp;出库</span>
        </div>
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
        // legend: {
        //   // Try 'horizontal'
        //   orient: 'horizontal',
        //   top: 0,
        //   right: 0,
        //   textStyle: {
        //     color: '#fff'
        //     // ...
        //   }
        // },
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
                    color: 'rgba(251, 27, 190, 1)'
                  },
                  {
                    offset: 1,
                    color: ' rgba(255, 81, 128, 0.4)'
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
                    color: 'rgba(139, 255, 193, 1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(133, 230, 255, 0.4)'
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
  background: url(../../assets/data/volume/bg1.png) no-repeat;
  background-size: px2vw(1938px) px2vh(680px);
  width: px2vw(1938px);
  height: px2vh(680px);

  .banner {
    width: px2vw(1938px);
    height: px2vw(150px);
    display: flex;
    justify-content: space-between;

    .title {
      width: px2vw(1200px);
      height: px2vh(100px);
      // background: url(../../assets/img/order.png) no-repeat;
      // background-position: -10px;
      // background-size: 80%;
      font-size: px2vh(45px);
      line-height: px2vh(40px);
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: flex-start;
      flex-direction: column-reverse;
      justify-content: space-around;
      margin-left: px2vw(40px);

      .text {
        width: px2vw(1000px);
        height: px2vh(60px);
        font-size: px2vh(44px);
        // font-family: HYZhuZiChaoRanTiW;
        color: rgba(255, 255, 255, 0.9);
        line-height: px2vh(44px);

        text-shadow: 0px 2px 8px #0037BD;
        // background: linear-gradient(360deg, #AAE7FF 0%, #FFFFFF 100%);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        margin-left: px2vw(50px);

        span {
          font-size: px2vw(30px);
        }
      }
    }

    .legend {
      margin-top: px2vh(40px);
      margin-right: px2vw(50px);
      .dot-in {
        width: px2vw(40px);
        height: px2vh(20px);
        display: inline-block;
        background-image: linear-gradient(to right, rgba(251, 27, 190, 1), rgba(255, 81, 128, 0.2));
        
      }
      .dot-out {
        width: px2vw(40px);
        height: px2vh(20px);
        display: inline-block;
        background-image: linear-gradient(to right, rgba(139, 255, 193, 1), rgba(133, 230, 255, 0.2));
      }
    }

  }

  .content {
    width: px2vw(1900px);
    height: px2vh(523px);
  }
}
</style>
