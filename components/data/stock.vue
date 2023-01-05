<template>
  <div class="stock">
    <div class="banner">
      <div class="title">
        <div class="text">原材料库存信息</div>
      </div>
      <div class="num" style="margin-left: 400px">
        <span>拍位总数：{{ numtotal }}</span>
        <span>已使用：{{ usenum }} ( <a :class="colors(pertotal)">{{ pertotal }}%</a> )</span>
        <span>剩余：{{ numtotal - usenum }}</span>
      </div>
      <div class="num">
        <span>拍位利用率：</span>
        <span style="color: rgba(116, 232, 62, 1)">● 0-80%</span>
        <span style="color: rgba(215, 204, 47, 1)">● 80-90%</span>
        <span style="color: rgba(255, 131, 20, 1)">● 90-100%</span>
      </div>
    </div>

    <div class="content">
      <div class="content-item" v-for="(item, index) in sku" :key="index">
        <div class="item-title">
          <div class="title-text">
            {{ item[0] }} 
          </div>
          <span>可用拍位：{{ total[index][2] }}</span>
          <span>拍位利用率：<a :class="colors(Number(sku[index][3]) + Number(sku[index][1]))">{{ (Number(sku[index][3]) +
          Number(sku[index][1])).toFixed(1)
          }}%</a></span>
        </div>
        <div class="charts">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { colWidth } from '@/utils/width.js'

export default {
  props: {

  },
  data() {

    return {
      data: [],
      total: [],
      numtotal: null,
      usenum: null,
      pertotal: 0,
      sku: [],
      times: null
    }
  },
  head() {
    return {

    }
  },
  mounted() {
    this.get()
    this.getreq()

    this.times = setInterval(() => {
      this.get()
      this.getreq()
    }, 12000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      this.times = null;
    })
  },
  methods: {
    get() {
      this.$axios.post('xlsx/stock').then((res) => {
        this.numtotal = 0
        this.total = res.data[0].data
        if (this.total[0].indexOf('当前日期') !== -1) {
          this.total.shift()
        }
        this.total.map((items) => this.numtotal += items[2])
      })
    },
    getreq() {
      try {
        this.$axios.post('request/stock').then((res) => {
          this.usenum = 0
          this.data = res.data.p_msg
          this.data.map((items) => {
            this.usenum = Number(items.PALLETQTY) + this.usenum
            this.usenum = Number(items.REZPALLETQTY) + this.usenum
          })
          this.pertotal = (this.usenum / this.numtotal * 100).toFixed(1)

          this.sku[0] = this.handle('恒温原料')
          this.sku[1] = this.handle('低温原料')
          this.sku[2] = this.handle('包材')
          this.sku[3] = this.handle('花生')
          this.sku[4] = this.handle('成品')
          // this.sku.push(this.handle('低温原料'))
          // this.sku.push(this.handle('包材'))
          // this.sku.push(this.handle('花生'))
          // this.sku.push(this.handle('成品'))
          // this.$nextTick(() => {

          // })
          this.$nextTick(() => {
            this.darwCharts()
          })
        })
      } catch (res) {
        console.log(res);
      }

    },
    darwCharts() {
      // let myCharts = echarts.init(document.getElementsByClassName('charts'));
      let charts = document.getElementsByClassName('charts')
      for (let i = 0; i < this.sku.length; i++) {
        let myCharts = echarts.init(charts[i]);
        myCharts.setOption({
          legend: {
            orient: 'horizontal',
            bottom: '0%',
            left: 'center',
            textStyle: {
              color: '#fff'
            },
            itemWidth: 10,
            itemHeight: 10, 
          },
          grid: {
            left: '1%',
            right: '13%',
            bottom: '2%',
            top: '0%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(256,256,256,0.3)',
              }
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: "#fff",
              }
            },
          },
          yAxis: {
            type: 'category',
            data: [],
            show: false
          },
          series: [
            {
              name: `CHO ${this.sku[i][4]}`,
              type: 'bar',
              data: [this.sku[i][3]],
              label: {
                show: true,
                position: 'right',
                color: 'rgba(66, 183, 212, 1)',
                formatter: `${this.sku[i][3]}%`
              },
              barWidth: '18%',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 1, x2: 0, y: 1, y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(78, 225, 255, 0.8000)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(133, 228, 255, 0)'
                    }
                  ]
                },
                borderRadius: [0, colWidth(0.5), colWidth(0.5), 0]
              }
            },
            {
              name: `Kind ${this.sku[i][2]}`,
              type: 'bar',
              data: [this.sku[i][1]],
              label: {
                show: true,
                position: 'right',
                color: 'rgba(96, 142, 255, 1)',
                formatter: `${this.sku[i][1]}%`
              },
              barWidth: '18%',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 1, x2: 0, y: 1, y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(78, 135, 255, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(125, 156, 255, 0)'
                    }
                  ]
                },
                borderRadius: [0, colWidth(0.5), colWidth(0.5), 0]
              }
            },
          ],
          color: ['rgba(78, 225, 255, 0.8000)', 'rgba(78, 135, 255, 1)']
        });
      }
    },
    setCharts() {

    },
    handle(text) {
      let tNum
      this.total.map((items) => { if (items[1] == text) { tNum = items[2] } })

      let skuPackage = []
      this.data.map((items) => {
        if (items.SKUAT == text) {
          skuPackage.push(items)
        }
      })
      let skuPackageNum = []
      skuPackageNum.push(text)
      skuPackage.map((items) => {
        if (items.SKUTYPE == 'Kind') {
          let skuKind = ((Number(items.PALLETQTY) + Number(items.REZPALLETQTY)) / tNum).toFixed(3) * 100
          skuPackageNum.push(skuKind.toFixed(1))
          skuPackageNum.push(Number(items.PALLETQTY) + Number(items.REZPALLETQTY))
        }
      })
      skuPackage.map((items) => {
        if (items.SKUTYPE == 'CHO') {
          let skuCho = ((Number(items.PALLETQTY) + Number(items.REZPALLETQTY)) / tNum).toFixed(3) * 100
          skuPackageNum.push(skuCho.toFixed(1))
          skuPackageNum.push(Number(items.PALLETQTY) + Number(items.REZPALLETQTY))
        }
      })
      if (text == '花生') {
        let num = skuPackageNum[1]
        let num2 = skuPackageNum[2]
        skuPackageNum[3] = num
        skuPackageNum[4] = num2
        skuPackageNum[1] = 0
        skuPackageNum[2] = 0
      }
      return skuPackageNum
    },
    colors(e) {
      if (e >= 90) {
        return 'per-red'
      } else if (e > 80) {
        return 'per-yellow'
      } else {
        return 'per-green'
      }
    }
  },
  destroyed() {

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';


.stock {
  background: url(../../assets/data//stock/bg.png) no-repeat;
  background-size: px2vw(3915px) px2vh(542px);
}

.banner {
  width: px2vw(3915px);
  height: px2vw(150px);
  background: url(../../assets/img/stock.png) no-repeat;
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
      font-size: px2vh(44px);
      // font-family: HYZhuZiChaoRanTiW;
      color: #18e9fcc8;
      line-height: px2vh(52px);
      letter-spacing: px2vw(7px);
      text-shadow: 0px 2px 8px #0037BD;
      background: linear-gradient(360deg, #AAE7FF 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: px2vw(100px);
    }



  }

  .num {
    color: #fff;
    display: inline-block;
    font-weight: 600;
    line-height: px2vh(150px);
    font-size: px2vw(32px);
    margin-right: px2vw(100px);

    span {
      padding-left: px2vw(30px);
    }
  }

}



.content {
  width: px2vw(3915px);
  height: px2vh(342px);
  color: #fff;
  font-size: px2vw(26px);
  font-weight: 600;
  display: flex;
  margin-top: px2vh(20px);
  justify-content: space-between;

  &-item {
    width: px2vw(750px);
    height: px2vh(350px);
    background: url(../../assets/data/stock/item.png) no-repeat;
    background-position: 0 0px;
    background-size: 100%;

    .item-title {
      width: px2vw(810px);
      height: px2vh(80px);

      .title-text {
        // display: inline-block;
        font-size: px2vh(45px);
        font-weight: 600;
        color: rgba(185, 250, 250, 1);
        line-height: px2vw(80px);
        letter-spacing: 5px;
        margin-left: px2vw(30px);
      }

    }

    .charts {
      width: px2vw(750px);
      height: px2vh(260px);
    }

    span {
      font-size: px2vh(32px);
      padding-left: px2vw(30px);
    }
  }
}

.per-red {
  color: rgba(255, 131, 20, 1);
}

.per-yellow {
  color: rgba(215, 204, 47, 1);
}

.per-green {
  color: rgba(116, 232, 62, 1);
}
</style>
