<template>
  <div class="stock">
    <div class="banner">
      <div class="title">
        <div class="text">原材料库存信息 <br /><span>Raw Materials Inventory</span></div>
      </div>
      <div class="num">
        <span>拍位利用率：</span>
        <span style="color: rgba(116, 232, 62, 1)">● 0-80%</span>
        <span style="color: rgba(215, 204, 47, 1)">● 80-90%</span>
        <span style="color: rgba(255, 131, 20, 1)">● 90-100%</span>
      </div>
    </div>
    <div class="content">
      <div class="content-item itemAll">
        <div>
          <div id="pieChartMap"></div>
          <div class="item-title">拍位使用情况总览</div>
        </div>
        <div class="txt txtAll">
          <div class="txt-item txt-title">
            <span>拍位总数</span>
            <span>{{ numtotal }}</span>
          </div>
          <div class="txt-item">
            <div style="display: inline-block">
              <div class="dot dot-ori"></div><span>&nbsp;已使用</span>
            </div>
            <span>
              {{ optionData[0].value }}，
              {{ pertotal }}%</span>
          </div>
          <div class="txt-item">
            <div style="display: inline-block">
              <div class="dot dot-gre"></div><span>&nbsp;未使用</span>
            </div>
            <span>
              {{ optionData[1].value }}，
              {{ (100 - pertotal).toFixed(1) }}%</span>
          </div>
        </div>

      </div>
      <div class="content-item" v-for="(item, index) in sku" :key="index">

        <div>
          <div class="charts"></div>
          <div class="item-title">{{ sku[index][0] }}</div>
        </div>
        <div class="txt">
          <div class="txt-item txt-title">
            <span>可用拍位</span>
            <span>{{ total[index][2] }}</span>
          </div>
          <div class="txt-item txt-title">
            <span>拍位利用率</span>
            <span :class="colors(Number(sku[index][3]) + Number(sku[index][1]))">{{ (Number(sku[index][3]) +
                Number(sku[index][1])).toFixed(1)
            }}%</span>
          </div>
          <div class="txt-item">
            <div style="display: inline-block">
              <div class="dot dot-blue"></div><span>&nbsp;CHO</span>
            </div>
            <span>
              {{ sku[index][4] }}
              <!-- {{ sku[index][3] }}% -->
            </span>
          </div>
          <div class="txt-item">
            <div style="display: inline-block">
              <div class="dot dot-pink"></div><span>&nbsp;Kind</span>
            </div>
            <span>
              {{ sku[index][2] }}
              <!-- {{ sku[index][1] }}% -->
            </span>
          </div>
          <div class="txt-item">
            <div style="display: inline-block">
              <div class="dot dot-gre"></div><span>&nbsp;未使用</span>
            </div>
            <span>
              {{ total[index][2] - sku[index][4] - sku[index][2] }}
              <!-- {{ (100 - sku[index][3] - sku[index][1]).toFixed(1)}}% -->
            </span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getPie3D, getParametricEquation } from '../../plugins/chart.js' //工具类js，页面路径自己修改

import * as echarts from 'echarts'
if (process.client) {
  require('echarts-gl')  // 3d图表库
}

const color = ['#FF9B67', '#38C780', '#0F0D38', '#74DAFC', '#BC00E4']

export default {
  name: 'chart',
  data() {
    return {
      optionData: [
        {
          name: '已使用',
          value: 0,
          itemStyle: {
            color: color[0]
          }
        },
        {
          name: '未使用',
          value: 0,
          itemStyle: {
            color: color[1]
          }
        }
      ],
      statusChart: null,
      option: {},
      data: [],
      total: [],
      numtotal: null,
      usenum: null,
      pertotal: 0,
      sku: [],
      skuOption: [],
      times: null
    }
  },
  created() {

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
    // 初始化label样式
    // 图表初始化
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
          this.optionData[0].value = 0
          this.data = res.data.p_msg
          this.data.map((items) => {
            this.optionData[0].value = Number(items.PALLETQTY) + this.optionData[0].value
            this.optionData[0].value = Number(items.REZPALLETQTY) + this.optionData[0].value
          })
          this.pertotal = (this.optionData[0].value / this.numtotal * 100).toFixed(1)

          this.sku[0] = this.handle('恒温原料')
          this.sku[1] = this.handle('低温原料')
          this.sku[2] = this.handle('花生')
          this.sku[3] = this.handle('成品')
          this.sku[4] = this.handle('包材')
          this.skuOption[0] = this.handle1('恒温原料')
          this.skuOption[1] = this.handle1('低温原料')
          this.skuOption[2] = this.handle1('花生')
          this.skuOption[3] = this.handle1('成品')
          this.skuOption[4] = this.handle1('包材')
          // this.sku.push(this.handle('低温原料'))
          // this.sku.push(this.handle('包材'))
          // this.sku.push(this.handle('花生'))
          // this.sku.push(this.handle('成品'))
          this.optionData[1].value = this.numtotal - this.optionData[0].value
          this.$nextTick(() => {
            this.initChart()
            window.onresize = function () {
              this.initChart()
            }
            this.darwCharts()
          })
        })
      } catch (res) {
        console.log(res);
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
        let num = skuPackageNum[1]
        let num2 = skuPackageNum[2]
        skuPackageNum[3] = num
        skuPackageNum[4] = num2
        skuPackageNum[1] = 0
        skuPackageNum[2] = 0
      }
      return skuPackageNum
    },
    handle1(text) {
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

      let skui = [
        {
          name: 'cho',
          value: skuPackageNum[4],
          itemStyle: {
            color: color[3]
          }
        },
        {
          name: 'kind',
          value: skuPackageNum[2],
          itemStyle: {
            color: color[4]
          }
        },
        {
          name: '未使用',
          value: tNum - skuPackageNum[4] - skuPackageNum[2],
          itemStyle: {
            color: color[1]
          }
        }
      ]
      return skui
    },
    colors(e) {
      if (e >= 90) {
        return 'per-red'
      } else if (e > 80) {
        return 'per-yellow'
      } else {
        return 'per-green'
      }
    },
    initChart() {
      this.statusChart = echarts.init(
        document.getElementById('pieChartMap')
      )
      // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
      this.option = getPie3D(this.optionData, 0, 240, 40, 25, 1)
      this.statusChart.setOption(this.option)
      // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      // this.option.series.push({
      //   name: 'pie2d', // 自己根据场景修改
      //   backgroundColor: 'transparent',
      //   type: 'pie',
      //   label: {
      //     opacity: 1,
      //     fontSize: 13,
      //     lineHeight: 20,
      //   },
      //   startAngle: -140, // 起始角度，支持范围[0, 360]。
      //   clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      //   radius: ['20%', '50%'],
      //   center: ['50%', '50%'],
      //   data: this.optionData,
      //   itemStyle: {
      //     opacity: 0, // 这里必须是0，不然2d的图会覆盖在表面
      //   },
      // })
      this.statusChart.setOption(this.option)
      // this.bindListen(this.statusChart)
    },
    darwCharts() {
      // let myCharts = echarts.init(document.getElementsByClassName('charts'));
      let charts = document.getElementsByClassName('charts')
      for (let i = 0; i < this.sku.length; i++) {
        let myCharts = echarts.init(charts[i]);
        this.option = getPie3D(this.skuOption[i], 0.8, 160, 35, 15, 1)
        myCharts.setOption(this.option)

        myCharts.setOption(this.option)
        // this.bindListen(myCharts)
      }
    },
    // bindListen(myChart, optionName = 'option') {
    //   let selectedIndex = ''
    //   let hoveredIndex = ''
    //   // 监听点击事件，实现选中效果（单选）
    //   myChart.on('click', (params) => {
    //     // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
    //     const isSelected =
    //       !this[optionName].series[params.seriesIndex].pieStatus
    //         .selected
    //     const isHovered =
    //       this[optionName].series[params.seriesIndex].pieStatus
    //         .hovered
    //     const k =
    //       this[optionName].series[params.seriesIndex].pieStatus.k
    //     const startRatio =
    //       this[optionName].series[params.seriesIndex].pieData
    //         .startRatio
    //     const endRatio =
    //       this[optionName].series[params.seriesIndex].pieData.endRatio
    //     // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
    //     if (
    //       selectedIndex !== '' &&
    //       selectedIndex !== params.seriesIndex
    //     ) {
    //       this[optionName].series[selectedIndex].parametricEquation =
    //         getParametricEquation(
    //           this[optionName].series[selectedIndex].pieData
    //             .startRatio,
    //           this[optionName].series[selectedIndex].pieData
    //             .endRatio,
    //           false,
    //           false,
    //           k,
    //           this[optionName].series[selectedIndex].pieData.value
    //         )
    //       this[optionName].series[
    //         selectedIndex
    //       ].pieStatus.selected = false
    //     }
    //     // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
    //     this[optionName].series[params.seriesIndex].parametricEquation =
    //       getParametricEquation(
    //         startRatio,
    //         endRatio,
    //         isSelected,
    //         isHovered,
    //         k,
    //         this[optionName].series[params.seriesIndex].pieData
    //           .value
    //       )
    //     this[optionName].series[params.seriesIndex].pieStatus.selected =
    //       isSelected
    //     // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
    //     selectedIndex = isSelected ? params.seriesIndex : null
    //     // 使用更新后的 option，渲染图表
    //     myChart.setOption(this[optionName])
    //   })
    //   // 监听 mouseover，近似实现高亮（放大）效果
    //   myChart.on('mouseover', (params) => {
    //     // 准备重新渲染扇形所需的参数
    //     let isSelected
    //     let isHovered
    //     let startRatio
    //     let endRatio
    //     let k
    //     // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    //     if (hoveredIndex === params.seriesIndex) {
    //       // 否则进行高亮及必要的取消高亮操作
    //     } else {
    //       // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
    //       if (hoveredIndex !== '') {
    //         // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
    //         isSelected =
    //           this[optionName].series[hoveredIndex].pieStatus
    //             .selected
    //         isHovered = false
    //         startRatio =
    //           this[optionName].series[hoveredIndex].pieData
    //             .startRatio
    //         endRatio =
    //           this[optionName].series[hoveredIndex].pieData
    //             .endRatio
    //         k = this[optionName].series[hoveredIndex].pieStatus.k
    //         // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    //         this[optionName].series[
    //           hoveredIndex
    //         ].parametricEquation = getParametricEquation(
    //           startRatio,
    //           endRatio,
    //           isSelected,
    //           isHovered,
    //           k,
    //           this[optionName].series[hoveredIndex].pieData.value
    //         )
    //         this[optionName].series[
    //           hoveredIndex
    //         ].pieStatus.hovered = isHovered
    //         // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    //         hoveredIndex = ''
    //       }
    //       // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
    //       if (
    //         params.seriesName !== 'mouseoutSeries' &&
    //         params.seriesName !== 'pie2d'
    //       ) {
    //         // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    //         isSelected =
    //           this[optionName].series[params.seriesIndex]
    //             .pieStatus.selected
    //         isHovered = true
    //         startRatio =
    //           this[optionName].series[params.seriesIndex].pieData
    //             .startRatio
    //         endRatio =
    //           this[optionName].series[params.seriesIndex].pieData
    //             .endRatio
    //         k =
    //           this[optionName].series[params.seriesIndex]
    //             .pieStatus.k
    //         // 对当前点击的扇形，执行高亮操作（对 option 更新）
    //         this[optionName].series[
    //           params.seriesIndex
    //         ].parametricEquation = getParametricEquation(
    //           startRatio,
    //           endRatio,
    //           isSelected,
    //           isHovered,
    //           k,
    //           this[optionName].series[params.seriesIndex].pieData
    //             .value + 60
    //         )
    //         this[optionName].series[
    //           params.seriesIndex
    //         ].pieStatus.hovered = isHovered
    //         // 记录上次高亮的扇形对应的系列号 seriesIndex
    //         hoveredIndex = params.seriesIndex
    //       }
    //       // 使用更新后的 option，渲染图表
    //       myChart.setOption(this[optionName])
    //     }
    //   })
    //   // 修正取消高亮失败的 bug
    //   myChart.on('globalout', (params) => {
    //     // 准备重新渲染扇形所需的参数
    //     let isSelected
    //     let isHovered
    //     let startRatio
    //     let endRatio
    //     let k
    //     if (hoveredIndex !== '') {
    //       // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    //       isSelected =
    //         this[optionName].series[hoveredIndex].pieStatus.selected
    //       isHovered = false
    //       k = this[optionName].series[hoveredIndex].pieStatus.k
    //       startRatio =
    //         this[optionName].series[hoveredIndex].pieData.startRatio
    //       endRatio =
    //         this[optionName].series[hoveredIndex].pieData.endRatio
    //       // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    //       this[optionName].series[hoveredIndex].parametricEquation =
    //         getParametricEquation(
    //           startRatio,
    //           endRatio,
    //           isSelected,
    //           isHovered,
    //           k,
    //           this[optionName].series[hoveredIndex].pieData.value
    //         )
    //       this[optionName].series[hoveredIndex].pieStatus.hovered =
    //         isHovered
    //       // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    //       hoveredIndex = ''
    //     }
    //     // 使用更新后的 option，渲染图表
    //     myChart.setOption(this[optionName])
    //   })
    // },

  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/function.scss';

.stock {
  width: px2vw(1940px);
  height: px2vh(1189px);
  background: url(../../assets/data//stock/bg1.png) no-repeat;
  background-size: px2vw(1940px) px2vh(1189px);
}

#pieChartMap {
  width: px2vw(430px);
  height: px2vh(300px);
  background: url(../../assets/data/stock/饼图底.png) no-repeat;
  background-size: px2vw(430px) px2vh(250px);
  background-position: 0 px2vh(50px);
}

.charts {
  width: px2vw(430px);
  height: px2vh(300px);
  background: url(../../assets/data/stock/饼图底1.png) no-repeat;
  background-size: px2vw(430px) px2vh(250px);
  background-position: 0 px2vh(50px);

}

.itemAll {
  width: px2vw(900px) !important;

  .txtAll {
    width: px2vw(420px) !important;
  }
}


.banner {
  width: px2vw(1940px);
  height: px2vw(150px);
  display: flex;
  justify-content: space-between;

  .title {
    width: px2vw(800px);
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
      width: px2vw(599px);
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
        font-size: px2vh(34px);
      }
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
  width: px2vw(1940px);
  height: px2vh(1000px);
  color: #fff;
  font-size: px2vw(26px);
  font-weight: 600;
  display: flex;
  margin-top: px2vh(-30px);
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  &-item {
    width: px2vw(840px);
    height: px2vh(350px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .txt {
      width: px2vw(350px);

      .txt-item {
        display: flex;
        justify-content: space-between;
        color: rgba(255, 255, 255, 0.7);
        width: 100%;

        .dot {
          width: px2vw(26px);
          height: px2vw(26px);
          border-radius: px2vw(8px);
          display: inline-block;

        }

        span {
          font-size: px2vw(25px);
          line-height: px2vh(50px);
        }
      }

      .txt-title {
        color: #fff !important;
      }
    }

    .item-title {
      font-size: px2vw(32px);
      font-weight: bold;
      color: #B9FAFA;
      letter-spacing: px2vw(8px);
      text-align: center;
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

.dot-ori {
  background-color: #FF9B67;
}

.dot-gre {
  background-color: #3DDF8A;
}

.dot-blue {
  background-color: #76DCFA;
}

.dot-pink {
  background-color: #B800E2;
}
</style>