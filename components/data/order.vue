<template>
  <div class="order">
    <div class="banner">
      <div class="title">
        <div class="text">原材料预约信息</div>
      </div>
      <div class="count">
        <div class="line-top"></div>
        <div style="display: flex;align-items: center;justify-content: center">
          <div style="width: 45%;text-align: center;">
            <div class="flop">{{config1}}</div>
            <span>预约总数量</span>
          </div>
          <div style="height: 30%; width: 1px; color: rgba(256, 256, 256, 0.2);font-size: 30px;">|</div>
          <div style="width: 45%; height: 80%">
            <div class="flop" style="color: #12B8E9">{{config2}}</div>
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


export default {
  props: {

  },
  data() {


    return {
      config: null,
      config1: null,
      config2: null,
      times: null
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
    }, 20000)

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
          e[index][e[index].indexOf('已完成')] = '<div ><span style="color: #00C430;font-weight: 600;font-size: 1.5vh;padding-right: 2px">●</span>已完成</div>'
        } else if (item.indexOf('未完成') !== -1) {
          e[index][e[index].indexOf('未完成')] = '<div ><span style="color: #FF1600;font-weight: 600;font-size: 1.5vh;padding-right: 2px">●</span>未完成</div>'
        }
      })
    },
    get() {
      this.$axios.post('xlsx/order').then((res) => {
        console.log(res.data[0]);
        let data = res.data[0].data
        // console.log(this.data.map((items) => items.ORDERDATE));
        let form = data
        let header = []
        if (form[0].indexOf('当前日期') !== -1) {
          header = res.data[0].data[0]
          form.shift()
        }
        this.change(form)

        let num1 = 0
        let num2 = 0
        form.map((item) => {
          num1 += item[7]
          num2 += item[8]
        })
        let sty = []
        data[0].map((item) => sty.push('center'))

        this.config = {
          header,
          data: form,
          align: sty,
          hoverPause: false,
          headerBGC: '#1A3FE02E',
          waitTime: '4000'
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

.banner {
  width: px2vw(1938px);
  height: px2vw(150px);
  background: url(../../assets/img/order-banner.png);
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
      border: 2px solid;
      border-image: linear-gradient(270deg, rgba(57, 183, 213, 0), rgba(63, 204, 234, 1), rgba(63, 204, 234, 0)) 2 2;
      margin-top: -1px;
    }

    .flop {
      width: px2vw(220px);
      height: px2vh(55px);
      text-align: center;
      color: #6496f9;
      font-size: px2vw(50px);
      margin-bottom: px2vh(3px);
    }
    span {
      font-size: px2vh(35px);
      line-height: px2vh(40px);
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
      background-color: rgba(26, 63, 224, 0.25) !important;
      font-size: px2vw(30px);
    }

    .rows {
      .row-item {
        background-color: rgba(26, 63, 224, 0.1800) !important;
        font-size: px2vw(26px);
      }
    }
  }
}
</style>
