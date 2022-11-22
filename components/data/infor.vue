<template>
  <div class="infor">
    <div class="in">
      <div class="banner">
        <div class="title">
          <div class="text">原材料入库信息 <br /><span>Raw Materials Receiving Data</span></div>

        </div>
        <div class="num">
          <span>入库订单总数 &nbsp; <span style="color: rgba(27, 248, 247, 1)">{{ inData.length }}</span></span>
          <span>未完成 &nbsp; <span style="color: #FF8314">{{ unclose }}</span></span>
          <span>已完成 &nbsp; <span style="color: #1BF82A">{{ close }}</span></span>
        </div>
      </div>
      <div class="content">
        <dv-scroll-board class="form" :config="config1" />
      </div>
    </div>
    <div class="out">
      <div class="banner">
        <div class="title">
          <div class="text">原材料出库信息 <br /><span>Raw Materials Shipment Data</span></div>
        </div>
        <div class="num">
          <span>出库订单总数 &nbsp; <span style="color: rgba(27, 248, 247, 1)">{{ outData.length }}</span></span>
          <span>拣货中 &nbsp; <span style="color: #FF8314">{{ padding }}</span></span>
          <span>全部发运 &nbsp; <span style="color: #1BF82A">{{ deliver }}</span></span>
        </div>
      </div>
      <div class="content">
        <dv-scroll-board :config="config" class="form" />
      </div>
    </div>
  </div>
</template>

<script>
import { colWidth } from '@/utils/width.js'

export default {
  props: {

  },
  data() {
    // console.log(this.data.map((items) => items.ORDERDATE));
    return {
      config: null,
      config1: null,
      inData: [],
      outData: [],
      padding: 0,
      deliver: 0,
      times: null,
      close: 0,
      unclose: 0
    }
  },
  head() {
    return {
    }
  },
  mounted() {
    console.log(document.body.clientWidth);
    this.get()
    this.getin()
    this.times = setInterval(() => {
      this.get()
      this.getin()
    }, 170000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      this.times = null;

    })
    // let test = '0.22'
    // let rge = /^\./
    // console.log(rge.test(test));
  },
  methods: {
    get() {
      try {
        this.$axios.post('request/out').then((res) => {
          let out = res.data.data
          this.outData = []
          this.deliver = 0
          this.padding = 0

          out.map((items) => {
            let rge = /^\./
            if (rge.test(items.VOLUME)) {
              items.VOLUME = '0' + items.VOLUME
            }
            if (items.ORDERSTATUS == '全部发运') {
              this.deliver += 1
              let arr = [items.SOORDER, items.ORDERTYPE, items.SKUGROUP, items.ORDERSTATUS, items.PALLETQTY, Number(items.VOLUME).toFixed(2), items.TOSTOCKCODE,]
              this.outData.push(arr)
            } else if (items.ORDERSTATUS == '新订单' || items.ORDERSTATUS == '已分配') {
              this.padding += 1
              let arr = [items.SOORDER, items.ORDERTYPE, items.SKUGROUP, items.ORDERSTATUS, items.PALLETQTY, Number(items.VOLUME).toFixed(2), items.TOSTOCKCODE]
              this.outData.push(arr)
            }
          })
          this.change1(this.outData)
          let header = ['订单号', '订单类型', '物料类型', '状态', '托数', '体积(m³)', '目的地']
          this.config = {
            header,
            data: this.outData,
            align: ['center', 'center', 'center', 'center', 'center', 'center', 'center'],
            hoverPause: false,
            headerBGC: '#1A3FE02E',
            oddRowBGC: '#132235',
            evenRowBGC: '#132235',
            // carousel: 'page',
            waitTime: '3000',
            columnWidth: [colWidth(0.10), colWidth(0.06), colWidth(0.05), colWidth(0.08), colWidth(0.06), colWidth(0.06), colWidth(0.08)]
          }

        }).catch((err) => {
          console.log('请求失败' + err.message);
        })
      } catch (err) {
        console.log(err);
      }
    },
    getin() {
      try {
        this.$axios.post('request/in').then((res) => {
          let resin = res.data.data
          this.inData = []
          this.close = 0
          this.unclose = 0

          resin.map((items) => {
            let rge = /^\./
            if (rge.test(items.VOLUME)) {
              items.VOLUME = '0' + items.VOLUME
            }
            if (items.ORDERSTATUS == '已关闭/结算') {
              this.close += 1
              let arr = [items.POORDER, items.ORDERTYPE, items.SKUGROUP, items.ORDERSTATUS, items.PALLETQTY, Number(items.VOLUME).toFixed(2), items.SUPNAME]
              this.inData.push(arr)
            } else {
              this.unclose += 1
              let arr = [items.POORDER, items.ORDERTYPE, items.SKUGROUP, items.ORDERSTATUS, items.PALLETQTY, Number(items.VOLUME).toFixed(2), items.SUPNAME]
              this.inData.push(arr)
            }
          })
          this.change(this.inData)

          let header = ['订单号', '订单类型', '物料类型', '状态', '托数', '体积(m³)', '供应商']
          this.config1 = {
            header,
            data: this.inData,
            align: ['center', 'center', 'center', 'center', 'center', 'center', 'center'],
            hoverPause: false,
            headerBGC: '#1A3FE02E',
            oddRowBGC: '#132235',
            evenRowBGC: '#132235',
            // carousel: 'page',
            waitTime: '3000',
            columnWidth: [colWidth(0.10), colWidth(0.06), colWidth(0.05), colWidth(0.08), colWidth(0.06), colWidth(0.06), colWidth(0.08)]
          }
        }).catch((err) => {
          console.log('请求失败' + err.message);
        })
      } catch (err) {
        console.log(err);
      }
    },
    change(e) {
      e.map((item, index) => {
        if (item[3] == '已关闭/结算') {
          e[index][3] = `<div style="width: 100%;text-align: center""><span style="color: #1BF82A;font-weight: 700;font-size: 2vh;padding-right: 5px">●</span>${e[index][3]}</div>`
        } else {
          e[index][3] = `<div style="width: 100%;text-align: center"><span style="color: #FF8314;font-weight: 700;font-size: 2vh;padding-right: 5px">●</span>${e[index][3]}</div>`
        }
      })
    },
    change1(e) {
      e.map((item, index) => {
        if (item[3] == '全部发运') {
          e[index][3] = `<div style="width: 100%;text-align: center""><span style="color: #1BF82A;font-weight: 700;font-size: 2vh;padding-right: 5px">●</span>${e[index][3]}</div>`
        } else {
          e[index][3] = `<div style="width: 100%;text-align: center"><span style="color: #FF8314;font-weight: 700;font-size: 2vh;padding-right: 5px">●</span>${e[index][3]}</div>`
        }
      })
    },
  },
  destroyed() {

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.infor {
  height: px2vh(1189px);
  // background: url(../../assets/img/volume.png) rgba($color: blue, $alpha: 0.04) no-repeat;
  // background-size: 100%;
}

.banner {
  width: px2vw(1939px);
  height: px2vw(150px);
  // background: url(../../assets/img/stock.png);
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
        font-size: px2vw(30px);
      }
    }
  }

  .num {
    color: #fff;
    display: inline-block;
    line-height: px2vh(150px);
    font-size: px2vw(32px);

    span:nth-child(1) {
      margin-right: px2vw(30px);
      padding-right: px2vw(10px);
      background: url(../../assets/data/infor/text1.png) no-repeat;
      background-size: 100%;
      background-position: 38px;
      font-size: px2vw(40px)
    }

    span:nth-child(2) {
      margin-right: px2vw(30px);
      padding-right: px2vw(10px);
      background: url(../../assets/img/text-yellow.png) no-repeat;
      background-size: 100%;
      background-position: 25px;
      font-size: px2vw(40px)
    }

    span:nth-child(3) {
      margin-right: px2vw(30px);
      padding-right: px2vw(10px);
      background: url(../../assets/data/infor/text_green.png) no-repeat;
      background-size: 100%;
      background-position: 25px;
      font-size: px2vw(40px)
    }
  }

}

.in {
  width: px2vw(1939px);
  height: px2vh(580px);
  background: url(../../assets/data/infor/bg1.png) rgba($color: blue, $alpha: 0.04) no-repeat;
  background-size: px2vw(1939px) px2vh(580px);
  margin-bottom: px2vh(30px);
}

.out {
  width: px2vw(1939px);
  height: px2vh(580px);
  background: url(../../assets/data/infor/bg1.png) rgba($color: blue, $alpha: 0.04) no-repeat;
  background-size: px2vw(1939px) px2vh(580px);
}

.content {

  .form::v-deep {
    width: px2vw(1938px);
    height: px2vh(420px);

    .header {
      // background-color: rgba(26, 63, 224, 0.25) !important;
      background-color: rgba(256, 256, 256, 0) !important;
      font-size: px2vw(28px);
      color: #C7F9FF !important;
      // height: px2vh(75px);
    }

    .rows {
      .row-item {
        // background-color: #1A316A;
        background: rgba(256, 256, 256, 0) !important;
        font-size: px2vw(24px);
        // border: px2vh(4px) solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
