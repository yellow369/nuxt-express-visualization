<template>
  <div class="security">
    <div class="num">
      <div class="num-item" v-for="(item, index) in date" :key="index">
        <div class="text">{{ date[index] }}</div>
      </div>
    </div>
    <div class="content">
      <p>{{ year }}年已连续安全生产天数</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {

  },
  data() {

    return { date: [], year: '' }

  },
  head() {
    return {

    }
  },
  methods: {
    formartDateTime(dateStr) {
      dateStr = dateStr.replace(/-/g, '.')
      dateStr = dateStr + " 00:00:00"
      var timestamp = new Date(dateStr).getTime();
      return timestamp
    },
    converToArray: number => [...`${number}`].map(el => parseInt(el)),
    get() {
      this.$axios.post('xlsx/security').then((res) => {
        this.date = res.data[0].data
        let now = new Date()
        this.year = now.getFullYear()
        // console.log(this.date[1][1].includes(this.year));
        if (this.date[1][1].includes(this.year)) {
          let day = Math.floor((now.getTime() - this.formartDateTime(this.date[1][1])) / 3600 / 24 / 1000)
          this.date = this.converToArray(day)
        } else {
          let day = Math.floor((now.getTime() - this.formartDateTime(`${this.year}.01.01`)) / 3600 / 24 / 1000)
          this.date = this.converToArray(day)
        }
      }).catch((err) => {
        console.log('请求失败' + err.message);
      })
    }
  },
  mounted() {
    // console.log(this.data);
    this.get()
    this.times = setInterval(() => {
      this.get()
    }, 10000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      this.times = null;
    })
  },
  destroyed() {

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.security {
  background: url(../../assets/index/security/bg.png) no-repeat;
  background-size: px2vw(691px) px2vh(658px);
  width: px2vw(691px);
  height: px2vh(658px);
}


.num {
  display: flex;
  width: px2vw(236px);
  height: px2vh(80px);
  margin: 0 auto;
  margin-bottom: px2vh(105px);
  margin-top: px2vh(180px);
  color: #fff;
  text-align: center;
  justify-content: space-evenly;

  &-item {
    width: px2vw(86px);
    height: px2vh(138px);
    background: linear-gradient(180deg, rgba(52, 143, 255, 0.47) 0%, rgba(112, 151, 255, 0.41) 37%, rgba(47, 32, 185, 0.7) 100%);
    box-shadow: 0px 2px 11px 0px rgba(0, 16, 88, 0.5);
    border-radius: px2vw(47px);
    border: 1px solid;
    // border-image: linear-gradient(180deg, rgba(167, 231, 255, 0.18), rgba(208, 238, 255, 1)) 1 1;
    margin: 0 px2vw(3px);

    .text {
      width: px2vw(80px);
      height: px2vh(130px);
      font-size: px2vh(90px);
      font-weight: bold;
      color: #FFFFFF;
      line-height: px2vh(130px);
      text-shadow: 0px px2vw(2px) px2vw(16px) #609AFF;
    }
  }
}

.content {
  width: px2vw(270px);
  height: px2vh(80px);
  // background-color: rgba(255, 255, 255, 0.29);
  text-align: center;
  margin: 0 auto;
  // color: rgba(255, 255, 255, 0.733);
  color: #fff;
  font-size: px2vw(39px);
  font-weight: 500;
  line-height: px2vh(40px);
  margin-top: px2vh(90px);
}
</style>
