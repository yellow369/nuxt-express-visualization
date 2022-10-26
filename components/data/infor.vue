<template>
  <div class="infor">
    <div class="in">
      <!-- <div class="title">
        <div class="text">嘉兴玛氏项目入库信息</div>
        <div class="status" style="background-color: #FA7921; ">原料已完成单量：</div>
        <div class="status" style="background-color: #00C9A8; ">原料未完成单量：</div>
        <div class="status" style="background-color: #E99156; ">包材已完成单量：</div>
        <div class="status" style="background-color: #387EA4; ">包材未完成单量：</div>
      </div> -->
      <div class="banner">
        <div class="title">
          <div class="text">嘉兴玛氏项目入库信息</div>
        </div>
        <div class="num">
          <span>已完成 &nbsp; <span style="color: yellow">{{close}}</span></span>
          <span>未完成 &nbsp; <span style="color: rgba(27, 248, 247, 1)">{{unclose}}</span></span>
        </div>
      </div>
      <div class="content">
        <dv-scroll-board class="form" :config="config1" />
      </div>
    </div>
    <div class="out">
      <div class="banner">
        <div class="title">
          <div class="text">嘉兴玛氏项目出库信息</div>
        </div>
        <div class="num">
          <span>已分配 &nbsp; <span style="color: yellow">{{padding}}</span></span>
          <span>全部发运 &nbsp; <span style="color: rgba(27, 248, 247, 1)">{{deliver}}</span></span>
        </div>
      </div>
      <div class="content">
        <dv-scroll-board :config="config" class="form" />
      </div>

    </div>
  </div>
</template>

<script>


export default {
  props: {

  },
  data() {
    // console.log(this.data.map((items) => items.ORDERDATE));
    return {
      config: null,
      config1: null,
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
    this.get()
    this.getin()
    this.times = setInterval(() => {
      this.get()
      this.getin()
    }, 12000)

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
      this.$axios.post('request/out').then((res) => {
        let out = res.data.data
        let outData = []
        this.deliver = 0
        this.padding = 0
        out.map((items) => {
          let rge = /^\./
          if (rge.test(items.VOLUME)) {
            items.VOLUME = '0' + items.VOLUME
          }
          if (items.ORDERSTATUS == '全部发运') {
            this.deliver += 1
            let arr = [items.SOORDER, items.ORDERTYPE, items.SKUGROUP, items.ORDERSTATUS, items.PALLETQTY, items.VOLUME, items.TOSTOCKCODE,]
            outData.push(arr)
          } else if (items.ORDERSTATUS == '新订单' || items.ORDERSTATUS == '已分配') {
            this.padding += 1
            if (items.VOLUME) {

            }
            let arr = [items.SOORDER, items.ORDERTYPE, items.SKUGROUP, items.ORDERSTATUS, items.PALLETQTY, items.VOLUME, items.TOSTOCKCODE]
            outData.push(arr)
          }
        })
        let header = ['订单号', '订单类型', '物料类型', '状态', '托数', '体积(㎡)', '目的地']
        this.config = {
          header,
          data: outData,
          align: ['center', 'center', 'center', 'center', 'center', 'center', 'center'],
          hoverPause: false,
          headerBGC: '#1A3FE02E',
          oddRowBGC: '#132235',
          evenRowBGC: '#132235',
          carousel: 'page',
          waitTime: '5000',
          columnWidth: [120,]
        }

      }).catch((err) => {
        console.log('请求失败' + err.message);
      })
    },
    getin() {
      this.$axios.post('request/in').then((res) => {
        let resin = res.data.data
        let inData = []
        this.close = 0
        this.unclose = 0

        resin.map((items) => {
          let rge = /^\./
          if (rge.test(items.VOLUME)) {
            items.VOLUME = '0' + items.VOLUME
          }
          if (items.ORDERSTATUS == '已关闭/结算') {
            this.close += 1
            let arr = [items.POORDER, items.ORDERTYPE, items.SKUGROUP, items.ORDERSTATUS, items.PALLETQTY, items.VOLUME, items.SUPNAME]
            inData.push(arr)
          } else {
            this.unclose += 1
            let arr = [items.POORDER, items.ORDERTYPE, items.SKUGROUP, items.ORDERSTATUS, items.PALLETQTY, items.VOLUME, items.SUPNAME]
            inData.push(arr)
          }

        })
        let header = ['订单号', '订单类型', '物料类型', '状态', '托数', '体积(㎡)', '供应商']
        this.config1 = {
          header,
          data: inData,
          align: ['center', 'center', 'center', 'center', 'center', 'center', 'center'],
          hoverPause: false,
          headerBGC: '#1A3FE02E',
          oddRowBGC: '#132235',
          evenRowBGC: '#132235',
          carousel: 'page',
          waitTime: '5000',
          columnWidth: [120]
        }

      }).catch((err) => {
        console.log('请求失败' + err.message);
      })
    }
  },
  destroyed() {

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.infor {
  display: flex;
  justify-content: space-between;
  // background: url(../../assets/img/volume.png) rgba($color: blue, $alpha: 0.04) no-repeat;
  // background-size: 100%;
}

.banner {
  width: px2vw(1939px);
  height: px2vw(150px);
  background: url(../../assets/img/stock.png);
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
    line-height: px2vh(150px);
    font-size: px2vw(32px);

    span:nth-child(1) {
      margin-right: px2vw(30px);
      padding-right: px2vw(10px);
      background: url(../../assets/img/text-yellow.png) no-repeat;
      background-size: 100%;
      background-position: 30px;
      font-size: px2vw(40px)
    }

    span:nth-child(2) {
      margin-right: px2vw(30px);
      padding-right: px2vw(10px);
      background: url(../../assets/img/text-yellow.png) no-repeat;
      background-size: 100%;
      background-position: 30px;
      font-size: px2vw(40px)
    }
  }

}

.out {
  width: px2vw(1939px);
  height: px2vh(626px);
  background: url(../../assets/img/volume.png) rgba($color: blue, $alpha: 0.04) no-repeat;
  background-size: 100%;
}

.in {
  width: px2vw(1939px);
  height: px2vh(626px);
  background: url(../../assets/img/volume.png) rgba($color: blue, $alpha: 0.04) no-repeat;
  background-size: 100%;
}

.content {

  .form::v-deep {
    width: px2vw(1938px);
    height: px2vh(476px);

    .header {
      background-color: rgba(26, 63, 224, 0.25) !important;
      font-size: px2vw(30px);
    }

    .rows {
      .row-item {
        background-color: rgba(26, 63, 224, 0.1800) !important;
        font-size: px2vw(27px);
      }
    }
  }

}
</style>
