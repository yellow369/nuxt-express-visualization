<template>
  <div class="stock">
    <div class="title">
      <div class="text">原料包材出入库体积(m³)</div>
    </div>
    <div class="num">
      <span>排位总数：{{numtotal}}</span>
      <span>已使用：{{usenum}} ( <a :class="colors(pertotal)">{{pertotal}}%</a> )</span>
      <span>剩余：{{numtotal - usenum}}</span>
    </div>
    <div class="content">
      <div class="content-item" v-for="(item, index) in sku" :key="index">
        <div class="item-title">
          {{item[0]}}
          <span>可用拍位：{{total[index][2]}}</span>
          <span>拍位利用率：<a :class="colors(Number(sku[index][3]) + Number(sku[index][1]))">{{Number(sku[index][3]) +
          Number(sku[index][1])}}%</a></span>
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
    data: '',
    total: ''
  },
  data() {
    let num = this.total
    if (num[0].indexOf('当前日期') !== -1) {
      num.shift()
    }
    let numtotal = 0
    num.map((items) => numtotal += items[2])

    let usenum = 0
    this.data.map((items) => {
      usenum = Number(items.PALLETQTY) + usenum
      usenum = Number(items.REZPALLETQTY) + usenum
    })

    let sku = []
    sku.push(this.handle('恒温原料'))
    sku.push(this.handle('低温原料'))
    sku.push(this.handle('包材'))
    sku.push(this.handle('花生'))
    console.log(sku);
    console.log(this.total);
    return {
      numtotal,
      usenum,
      pertotal: (usenum / numtotal).toFixed(3) * 100,
      sku
    }
  },
  head() {
    return {

    }
  },
  mounted() {

    this.darwCharts()
  },
  methods: {
    darwCharts() {
      // let myCharts = echarts.init(document.getElementsByClassName('charts'));
      let charts = document.getElementsByClassName('charts')
      for (let i = 0; i < this.sku.length; i++) {
        let myCharts = echarts.init(charts[i]);
        myCharts.setOption({
          legend: {
            // Try 'horizontal'
            orient: 'horizontal',
            bottom: 0,
            left: 'center',
            textStyle: {
              color: '#ccc'
            },
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '20%',
            top: '8%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {
              //设置条纹显示 柱状图默认yAxis(true)
              show: true,
              //设置lineStyle即可写入样式即可
              lineStyle: {
                //这里输入线条的样式
                color: 'rgba(256,256,256,0.3)',
              }
            },
            axisLabel: {//x轴文字的配置
                show: false,
                textStyle: {
                    color: "#fff",
                }
            },

          },
          yAxis: {
            type: 'category',
            data: [],

          },
          series: [
            {
              name: `CHO ${this.sku[i][2]}`,
              type: 'bar',
              data: [this.sku[i][3]],
              label: {
                show: true,
                position: 'right',
                color: '#4C87F5',
                formatter: `${this.sku[i][3]} %`
              },
              barWidth: 30,
            },
            {
              name: `Kind ${this.sku[i][4]}`,
              type: 'bar',
              data: [this.sku[i][1]],
              label: {
                show: true,
                position: 'right',
                color: '#C128E5',
                formatter: `${this.sku[i][1]} %`
              },
              barWidth: 30,
            },
          ],
          color: ['#4C87F5', '#C128E5']
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

.title {
  width: px2vw(300px);
  color: #fff;
  border: 2px solid #1A4273;
  padding: 4px;

  display: inline-block;


  .text {
    background-color: #1A4273;
    font-weight: 700;
    font-size: px2vw(24px);
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}

.num {
  color: #fff;
  display: inline-block;
  font-weight: 600;

  span {
    padding-left: px2vw(12px);
  }
}

.content {
  color: #fff;
  font-size: px2vw(26px);
  font-weight: 600;
  display: flex;
  margin-top: px2vh(20px);

  span {
    font-size: px2vw(20px);
  }

  &-item {
    .charts {
      width: px2vw(500px);
      height: px2vh(200px);
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
