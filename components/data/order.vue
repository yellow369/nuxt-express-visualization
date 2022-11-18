<template>
  <div class="order">
    <div class="banner">
      <div class="title">
        <div class="text">原材料预约信息 <br /><span>Raw Materials Booking Data</span> <span>&nbsp;&nbsp;&nbsp;&nbsp; 到货日期：{{
            day
        }}</span></div>

      </div>
      <div class="day">

      </div>
      <div class="num-total">
        <span>未完成 &nbsp; <span style="color: #FF8314">{{ complete }}</span></span>
        <span>已完成 &nbsp; <span style="color: #1BF82A">{{ uncomplete }}</span></span>
      </div>
      <div class="count">
        <div class="line-top"></div>
        <div class="num">
          <!-- <div style="width: 50%;text-align: center;">
            <div class="total">{{ config1 }}</div>
            <p>预约总数量(kg)</p>
          </div>
          <div class="line"></div> -->
          <div style="width: 98%;">
            <div class="total" style="color: #12B8E9">{{ config1 }}</div>
            <p>预约总拍数</p>
          </div>
        </div>
      </div>

    </div>
    <!-- <div class="count">
      <dv-digital-flop :config="config1" class="flop" />
      <div class="text">/预约总数量</div>
    </div>
    <div class="count">
      <dv-digital-flop :config="config2" class="flop" />
      <div class="text">/预约总拍位</div>
    </div> -->
    <div class="content">
      <dv-scroll-board :config="config" class="form" />
    </div>
  </div>
</template>

<script>
import { colWidth } from '@/utils/width.js'


export default {
  props: {

  },
  data() {
    return {
      config: null,
      config1: null,
      config2: null,
      times: null,
      day: '',
      complete: 0,
      uncomplete: 0,

    }
  },
  head() {
    return {

    }
  },
  mounted() {
    this.get()
    this.times = setInterval(() => {
      this.get()
    }, 60000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      this.times = null;
    })
  },
  methods: {
    //修改表格数据
    change(e) {
      e.map((item, index) => {
        if (item[7] == '已完成') {
          this.complete++
          e[index][7] = `<div style="width: 100%;text-align: left;margin-left: 10%""><span style="color: #1BF82A;font-weight: 700;font-size: 2vh;padding-right: 5px">●</span>${e[index][7]}</div>`
        } else {
          this.uncomplete++
          e[index][7] = `<div style="width: 100%;text-align: left;margin-left: 10%"><span style="color: #FF8314;font-weight: 700;font-size: 2vh;padding-right: 5px">●</span>${e[index][7]}</div>`
        }
      })
    },

    get() {
      let date = new Date()
      this.day = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()

      this.$axios.post('xlsx/order').then((res) => {
        // console.log(res.data[0]);
        let data = res.data[0].data
        // console.log(this.data.map((items) => items.ORDERDATE));
        // this.day = data[1][0]
        let form = data
        if (form[0].indexOf('当前日期') !== -1) {
          // header = res.data[0].data[0]
          form.shift()
        }
        this.complete = 0
        this.uncomplete = 0

        let formData = []
        for (let i = 0; i < form.length; i++) {
          if (form[i][0] == this.day) {
            formData.push(form[i])
          }
          form[i].shift()
        }
        // header.shift()
        // console.log(formData);
        this.change(formData)

        let sty = []
        data[0].map((item) => sty.push('center'))

        let num1 = 0
        let num2 = 0
        formData.map((item) => {
          num1 += item[5]
          num2 += item[6]
        })

        this.config = {
          header: ['类型', '供应商', '物料号', '物料名称', '托含量', '预约拍数', '状态'],
          data: formData,
          align: sty,
          hoverPause: false,
          headerBGC: '#1A3FE02E',
          waitTime: '3000',
          columnWidth: [colWidth(0.06), colWidth(0.06), colWidth(0.09), colWidth(0.10), colWidth(0.06), colWidth(0.06), colWidth(0.06)],
        }
        this.config1 = num1
        this.config2 = num2
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

.order {
  background: url(../../assets/data/order/bg1.png) no-repeat;
  background-size: px2vw(1938px) px2vh(680px);
  width: px2vw(1938px);
  height: px2vh(680px);
}

.banner {
  width: px2vw(1938px);
  height: px2vh(150px);
  // background: url(../../assets/img/order-banner.png);
  display: flex;
  justify-content: space-around;

  .title {
    width: 45%;
    height: px2vh(100px);
    // background: url(../../assets/img/order.png) no-repeat;
    // background-position: -10px;
    // background-size: 80%;
    font-size: px2vh(40px);
    line-height: px2vh(30px);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: flex-start;
    flex-direction: column-reverse;
    justify-content: space-around;
    margin-left: px2vw(40px);

    .text {
      width: 100%;
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

  .day {
    color: rgba(255, 255, 255, 0.9);
    line-height: px2vh(52px);
    // text-shadow: 0px 2px 8px #0037BD;
    // background: linear-gradient(360deg, #AAE7FF 0%, #FFFFFF 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    height: px2vh(150px);
    padding-top: px2vh(65px);

    p {
      margin: auto 0;
      font-size: px2vw(32px);
    }
  }

  .num-total {
    color: #fff;
    display: inline-block;
    line-height: px2vh(180px);
    font-size: px2vw(32px);

    span:nth-child(1) {
      margin-right: px2vw(30px);
      padding-right: px2vw(10px);
      background: url(../../assets/img/text-yellow.png) no-repeat;
      background-size: 100%;
      background-position: 38px;
      font-size: px2vw(40px)
    }

    span:nth-child(2) {
      margin-right: px2vw(30px);
      padding-right: px2vw(10px);
      background: url(../../assets/data/infor/text_green.png) no-repeat;
      background-size: 100%;
      background-position: 25px;
      font-size: px2vw(40px)
    }

  }

  .count {
    height: px2vh(120px);
    width: 15%;
    margin-top: 1%;
    margin-right: 1%;
    border-radius: 50px;
    border: 1px solid rgba(256, 256, 256, 0.23);
    color: #fff;
    text-align: center;
    font-weight: 600;

    .line-top {
      margin: 0 auto;
      width: px2vw(200px);
      height: 1px;
      border: 1px solid;
      border-image: linear-gradient(270deg, rgba(57, 183, 213, 0), rgba(63, 204, 234, 1), rgba(63, 204, 234, 0)) 2 2;
      margin-top: -1px;
    }

    .num {
      height: px2vh(110px);
      width: px2vw(300px);
      display: flex;
      align-items: center;
      justify-content: center;

      .line {
        height: 50%;
        width: 0;
        border-left: px2vw(5px) solid rgba(204, 204, 204, 0.5);
      }

      .total {
        width: 100%;
        height: px2vh(35px);
        text-align: center;
        color: #6496f9;
        font-size: px2vh(45px);
        line-height: px2vh(35px);
        margin-bottom: px2vh(5px);
      }

      p {
        font-size: px2vh(30px);
        color: #C7F9FF;
        height: px2vh(35px);
        line-height: px2vh(35px);
      }
    }
  }
}

.count {
  width: px2vw(300px);
  height: px2vh(120px);
  display: inline-block;

  .text {
    color: #fff;
    display: inline-block;
    padding-bottom: 10px;
  }
}


.ddd {
  background-color: #1A3FE02E;
}

.content {

  .form::v-deep {
    width: px2vw(1938px);
    height: px2vh(520px);

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
