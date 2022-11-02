<template>
  <div class="order">
    <div class="banner">
      <div class="title">
        <div class="text">原材料预约信息</div>

      </div>
      <div class="day">
        <p> 到货日期：{{ day }}</p>
      </div>
      <div class="count">
        <div class="line-top"></div>
        <div style="display: flex;align-items: center;justify-content: center">
          <div style="width: 45%;text-align: center;">
            <div class="flop">{{ config1 }}</div>
            <span>预约总数量(kg)</span>
          </div>
          <div style="height: 30%; width: 1px; color: rgba(256, 256, 256, 0.2);font-size: 30px;">|</div>
          <div style="width: 45%; height: 80%">
            <div class="flop" style="color: #12B8E9">{{ config2 }}</div>
            <span>预约总拍数</span>
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
      day: ''
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
        if (item.indexOf('已完成') !== -1) {
          e[index][e[index].indexOf('已完成')] = '<div ><span style="color: #00C430;font-weight: 600;font-size: 1vh;padding-right: 2px">●</span>已完成</div>'
        } else if (item.indexOf('未完成') !== -1) {
          e[index][e[index].indexOf('未完成')] = '<div ><span style="color: #FF1600;font-weight: 600;font-size: 1vh;padding-right: 2px">●</span>未完成</div>'
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
        this.change(form)

        let formData = []
        for (let i = 0; i < form.length; i++) {
          if (form[i][0] == this.day) {
            formData.push(form[i])
          }
          form[i].shift()
        }
        // header.shift()
        // console.log(formData);

        let sty = []
        data[0].map((item) => sty.push('center'))

        let num1 = 0
        let num2 = 0
        formData.map((item) => {
          num1 += item[5]
          num2 += item[6]
        })

        this.config = {
          header: ['类型', '供应商', '物料号', '物料名称', '托含量', '预约数量(kg)', '预约拍数'],
          data: formData,
          align: sty,
          hoverPause: false,
          headerBGC: '#1A3FE02E',
          waitTime: '4000',
          columnWidth: [colWidth(0.06), colWidth(0.06), colWidth(0.09), colWidth(0.1), colWidth(0.06), colWidth(0.06), colWidth(0.06)],
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
  background: url(../../assets/data/order/bg.png) no-repeat;
  background-size: px2vw(1938px) px2vh(704px);
  width: px2vw(1938px);
  height: px2vh(704px);
}

.banner {
  width: px2vw(1938px);
  height: px2vw(150px);
  // background: url(../../assets/img/order-banner.png);
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

  .day {
    color: #18E8FC;
    line-height: px2vh(52px);
    text-shadow: 0px 2px 8px #0037BD;
    background: linear-gradient(360deg, #AAE7FF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    height: px2vh(150px);
    padding-top: px2vh(80px);
    margin-left: px2vw(-680px);

    p {
      margin: auto 0;
      font-size: px2vw(32px);
    }
  }

  .count {
    height: px2vh(120px);
    width: px2vw(500px);
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

    .flop {
      width: px2vw(220px);
      height: px2vh(35px);
      text-align: center;
      color: #6496f9;
      font-size: px2vw(45px);
      margin-bottom: px2vh(3px);
    }

    span {
      font-size: px2vh(30px);
      color: #C7F9FF;
      // line-height: px2vh(40px);
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
    height: px2vh(554px);

    .header {
      // background-color: rgba(26, 63, 224, 0.25) !important;
      background-color: rgba(256, 256, 256, 0.0) !important;
      font-size: px2vw(28px);
      color: #C7F9FF !important;
      // height: px2vh(75px);
    }

    .rows {
      .row-item {
        background-color: rgba(256, 256, 256, 0.05);
        background: linear-gradient(90deg, rgba(26, 63, 224, 0.18) 0%, rgba(88, 132, 250, 0.1) 100%) !important;
        font-size: px2vw(24px);
        // border: px2vh(4px) solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
