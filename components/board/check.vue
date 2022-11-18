<template>
  <div class="check">
    <div class="fm">
      <div class="banner">
        <div class="title">
          <div class="text" style="text-align: left; margin-left: 6%;">FM消防检查 <br /><span>FM Firefighting Inspect</span>
          </div>
        </div>
        <img src="../../assets/index/check/logo.png" alt="">
      </div>
      <div class="content">
        <div v-for="(item, index) in record" :key="index" class="item">
          <div class="circular">
            <img src="../../assets/index/check/com.png" v-if="item[4] == '已完成'" alt="">
          </div>
          <p :class="item[4] !== '已完成' ? 'color-unactive' : ''">{{ item[3].slice(5) }}</p>
          <p :class="item[4] !== '已完成' ? 'color-unactive' : ''">{{ item[2] }}</p>
        </div>
      </div>
    </div>
    <div class="mouse">
      <div class="banner">
        <img src="../../assets/index/check/logo1.png" alt="" class="logo1">
        <div class="title">
          <div class="text">虫鼠害检查 <br /><span>Pest Control Inspect</span></div>
        </div>
      </div>
      <div class="content-mouse">
        <div v-for="(item, index) in mouse" :key="index" class="item">
          <div class="circular">
            <!-- <div class="complete" v-if="item[4] == '已完成'">✔</div> -->
            <img src="../../assets/index/check/com.png" v-if="item[4] == '已完成'" alt="">
          </div>
          <p :class="item[4] !== '已完成' ? 'color-unactive' : ''">{{ item[3].slice(5) }}</p>
          <p :class="item[4] !== '已完成' ? 'color-unactive' : ''">{{ item[2] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: ''
  },
  data() {

    return {
      record: [],
      mouse: [],
      par: [],
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
    }, 10000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      this.times = null;
    })

  },
  methods: {
    get() {
      this.$axios.post('xlsx/check').then((res) => {
        this.record = []
        this.mouse = []
        this.par = res.data[0].data
        if (this.par[0].indexOf('当前日期') !== -1) {
          this.par.shift()
        }
        // console.log(this.par);
        this.par.map((items) => {
          if (items[1] == 'FM消防检查') {
            items[3].slice(5)
            this.record.push(items)
          } else if (items[1] == '虫鼠害检查') {
            this.mouse.push(items)
          }
        })
      }).catch((err) => {
        console.log('请求失败' + err.message);
      })
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.check {
  width: px2vw(1620px);
  display: flex;
}

.fm {
  width: px2vw(1165px);
  height: px2vh(555px);
  background: url(../../assets/index/check/fmbg.png) no-repeat;
  background-size: px2vw(1165px) px2vh(557px);
}

.mouse {
  width: px2vw(420px);
  height: px2vh(555px);
  margin-left: px2vw(40px);
  background: url(../../assets/index/check/mousebg.png) no-repeat;
  background-size: px2vw(420px) px2vh(557px);

  .banner {
    width: px2vw(520px);
    height: px2vh(96px);
    display: flex;
    padding-left: px2vw(10px);

    .title {
      height: px2vh(66px);
      width: px2vw(300px);
      font-size: px2vh(45px);
      line-height: px2vh(40px);
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      // text-shadow: 0px 2px 25px #0083F0;
      padding-top: px2vh(10px);
      text-align: right;
      padding-right: px2vw(20px);

      span {
        font-size: px2vw(30px);
      }
    }

    .logo1 {
      width: px2vw(119px);
      height: px2vh(51px);
      margin-top: px2vh(40px);
    }

  }


  .content-mouse {
    width: px2vw(420px);
    height: px2vh(120px);
    margin-top: px2vh(90px);
    display: flex;
    justify-content: space-around;

    .item {
      width: px2vw(167px);
      height: px2vw(310px);
      background: url(../../assets/index/check/itembg.png) no-repeat;
      background-size: px2vw(167px) px2vw(310px);

      .circular {
        width: px2vw(100px);
        height: px2vw(100px);
        border-radius: px2vw(50px);
        background: url(../../assets/index/check/uncom.png);
        margin: px2vh(20px) auto;

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        width: 100%;
        text-align: center;
        color: rgba(115, 240, 255, 1);
        line-height: px2vh(70px);
      }
    }
  }

}

.banner {
  width: px2vw(620px);
  height: px2vh(96px);
  display: flex;

  .title {
    height: px2vh(66px);
    width: px2vw(400px);
    font-size: px2vh(45px);
    line-height: px2vh(40px);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    // text-shadow: 0px 2px 25px #0083F0;
    padding-top: px2vh(10px);
    text-align: center;

    span {
      font-size: px2vw(30px);
    }
  }

  .logo1 {
    width: px2vw(119px);
    height: px2vh(51px);
    margin-top: px2vh(18px);
  }

  img {
    width: px2vw(116px);
    height: px2vh(83px);
    margin-top: px2vh(8px);
  }
}

.content {
  width: px2vw(1165px);
  height: px2vh(120px);
  color: #fff;
  margin-top: px2vh(90px);
  display: flex;
  justify-content: space-around;


  .item {
    width: px2vw(167px);
    height: px2vw(310px);
    background: url(../../assets/index/check/itembg.png) no-repeat;
    background-size: px2vw(167px) px2vw(310px);

    .circular {
      width: px2vw(100px);
      height: px2vw(100px);
      border-radius: px2vw(50px);
      background: url(../../assets/index/check/uncom.png);
      margin: px2vh(20px) auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      width: 100%;
      text-align: center;
      color: rgba(115, 240, 255, 1);
      line-height: px2vh(70px);
    }
  }
}

.color-unactive {
  color: #ccc !important;
}
</style>
