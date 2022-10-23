<template>
  <div class="stock">
    <div class="banner">
      <div class="title">
        <div class="text">原材料库存信息</div>
      </div>
      <div class="num">
        <span>拍位总数：{{numtotal}}</span>
        <span>已使用：{{usenum}} ( <a :class="colors(pertotal)">{{pertotal}}%</a> )</span>
        <span>剩余：{{numtotal - usenum}}</span>
      </div>
    </div>

    <div class="content">
      <div class="content-item" v-for="(item, index) in sku" :key="index">
        <div class="item-title">
          <div class="title-text">
            {{item[0]}}
          </div>
          <span>可用拍位：{{total[index][2]}}</span>
          <span>拍位利用率：<a :class="colors(Number(sku[index][3]) + Number(sku[index][1]))">{{(Number(sku[index][3]) +
          Number(sku[index][1])).toFixed(1)}}%</a></span>
        </div>
        <div class="charts">

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'


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
      sku: []
    }
  },
  head() {
    return {

    }
  },
  mounted() {
    this.$axios.post('xlsx/stock').then((res) => {
      this.total = res.data[0].data
      if (this.total[0].indexOf('当前日期') !== -1) {
        this.total.shift()
      }
      this.total.map((items) => this.numtotal += items[2])
    }).catch((err) => {
      console.log('请求失败' + err.message);
    })

    this.$axios.post('request/stock').then((res) => {
      this.data = res.data.p_msg
      this.data.map((items) => {
        this.usenum = Number(items.PALLETQTY) + this.usenum
        this.usenum = Number(items.REZPALLETQTY) + this.usenum
      })
      this.pertotal = (this.usenum / this.numtotal * 100).toFixed(1)

      this.sku.push(this.handle('恒温原料'))
      this.sku.push(this.handle('低温原料'))
      this.sku.push(this.handle('包材'))
      this.sku.push(this.handle('花生'))
      this.sku.push(this.handle('成品'))
      this.$nextTick(() => {
        this.darwCharts()
      })
    }).catch((err) => {
      console.log('请求失败' + err.message);
      // this.darwCharts()
    })



  },
  methods: {
    darwCharts() {
      // let myCharts = echarts.init(document.getElementsByClassName('charts'));
      let charts = document.getElementsByClassName('charts')
      for (let i = 0; i < this.sku.length; i++) {
        let myCharts = echarts.init(charts[i]);
        myCharts.setOption({
          legend: {
            orient: 'horizontal',
            bottom: 26,
            left: 'center',
            textStyle: {
              color: '#ccc'
            },
          },
          grid: {
            left: '1%',
            right: '8%',
            bottom: '8%',
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
                color: '#4C87F5',
                formatter: `${this.sku[i][3]}%`
              },
              barWidth: 30,
            },
            {
              name: `Kind ${this.sku[i][2]}`,
              type: 'bar',
              data: [this.sku[i][1]],
              label: {
                show: true,
                position: 'right',
                color: '#C128E5',
                formatter: `${this.sku[i][1]}%`
              },
              barWidth: 30,
            },
          ],
          color: ['rgba(78, 225, 255, 0.8000)', 'rgba(78, 135, 255, 1)']
        });
      }
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
        skuPackageNum[3] = 0
        skuPackageNum[4] = 0
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
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';


.stock {
  background: url(../../assets/img/volume.png) rgba($color: blue, $alpha: 0.04) no-repeat;
  background-size: 100%;
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
    // margin-left: px2vw(40px);


    .text {
      width: 907px;
      height: px2vh(150px);
      font-size: px2vw(45px);
      color: #4078FF;
      line-height: px2vh(150px);
      letter-spacing: 4px;
      text-shadow: 0px 2px 8px #0037BD;
      background: linear-gradient(360deg, #CFF0FD 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: px2vw(86px);
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
  color: #fff;
  font-size: px2vw(26px);
  font-weight: 600;
  display: flex;
  margin-top: px2vh(20px);
  justify-content: space-between;

  &-item {
    width: px2vw(750px);
    height: px2vh(350px);
    background: url(../../assets/img/stock-title.png) no-repeat;
    background-position: 0 0px;
    background-size: 100%;


    .title-text {
      width: px2vw(300px);
      height: px2vh(80px);
      font-size: px2vh(40px);
      color: #FFFFFF;
      line-height: px2vh(80px);
      letter-spacing: 5px;
      margin-left: px2vw(15px);
    }

    .charts {
      width: px2vw(750px);
      height: px2vh(270px);
    }

    span {
      font-size: px2vw(25px);
      padding-left: px2vw(60px);
    }
  }
}

.per-red {
  color: #FF1600;
}

.per-yellow {
  color: yellow;
}

.per-green {
  color: #00C430;
}
</style>
