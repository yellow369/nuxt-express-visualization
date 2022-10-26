<template>
  <div class="check">
    <div class="fm">
      <div class="banner">
        <div class="title">
          <div class="text">FM消防检查：</div>
        </div>

      </div>
      <div class="content">
        <div v-for="(item, index) in record" :key="index">
          <div class="circular">
            <div class="complete" v-if="item[4] == '已完成'">✔</div>
          </div>
          <p>{{item[3].slice(5)}}</p>
          <p>{{item[2]}}</p>
        </div>
      </div>
    </div>
    <div class="mouse">
      <div class="banner">
        <div class="title">
          <div class="text">虫鼠害检查：</div>
        </div>
      </div>
      <div class="content-mouse">
        <div v-for="(item, index) in mouse" :key="index">
          <div class="circular">
            <div class="complete" v-if="item[4] == '已完成'">✔</div>
          </div>
          <p>{{item[3].slice(5)}}</p>
          <p>{{item[2]}}</p>
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
        console.log(this.par);
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
  width: px2vw(1900px);
  display: flex;
}

.fm {
  width: px2vw(1300px);

}

.mouse {
  width: px2vw(400px);

  margin-left: px2vw(100px);

  .content-mouse {
    width: px2vw(400px);
    height: px2vh(120px);
    margin-top: px2vh(30px);
    display: flex;
    justify-content: space-around;

    .circular {
      width: px2vw(140px);
      height: px2vw(140px);
      border-radius: px2vw(70px);
      background-color: #518BC3;
      margin: 5px;

      .complete {
        width: 100%;
        height: 100%;
        font-size: px2vw(70px);
        background-color: #00E0E2;
        border-radius: px2vw(70px);
        color: rgba(0, 0, 0, 0.721);
        font-weight: 700;
        text-align: center;
        line-height: px2vw(140px);
      }
    }

    p {
      width: px2vw(150px);
      text-align: center;
      color: rgba(255, 255, 255, 0.733);
    }

  }

}

.banner {
  width: px2vw(380px);
  height: px2vh(70px);
  border: px2vw(3px) solid rgba(81, 139, 195, 0.9);
  padding: px2vw(4px);
  margin: 0 auto;

  .title {
    background-color: rgba(81, 139, 195, 0.9);
    height: px2vh(57px);
    width: px2vw(366px);
    font-size: px2vw(36px);
    text-align: center;
    line-height: px2vh(57px);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.751);
  }
}

.content {
  width: px2vw(1300px);
  height: px2vh(120px);
  color: #fff;
  margin-top: px2vh(30px);
  display: flex;
  justify-content: space-around;


  .circular {
    width: px2vw(140px);
    height: px2vw(140px);
    border-radius: px2vw(70px);
    background-color: #518BC3;
    margin: 5px;

    .complete {
      width: 100%;
      height: 100%;
      font-size: px2vw(70px);
      background-color: #00E0E2;
      border-radius: px2vw(70px);
      color: rgba(0, 0, 0, 0.721);
      font-weight: 700;
      text-align: center;
      line-height: px2vw(140px);
    }
  }

  p {
    width: px2vw(150px);
    text-align: center;
    color: rgba(255, 255, 255, 0.733);
  }


}
</style>
