<template>
  <div class="security">
    <div class="num">
      <div class="num-item" v-for="(item, index) in date" :key="index">
        {{date[index]}}
      </div>
    </div>
    <div class="content">
      <p>2022年已连续安全生产</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {

  },
  data() {

    return { date: [], }

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
        let day = Math.floor((now.getTime() - this.formartDateTime(this.date[1][1])) / 3600 / 24 / 1000)
        this.date = this.converToArray(day)
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
  padding-top: px2vh(200px);
  margin-bottom: px2vh(105px);
  color: #fff;
  text-align: center;
  justify-content: space-evenly;

  &-item {
    width: px2vw(60px);
    height: px2vh(80px);
    background-color: #1D91FF;
    border-radius: 8px;
    font-size: px2vh(60px);
    line-height: px2vh(80px);
    font-weight: 600;
    margin: 0 px2vw(4px);
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
  margin-top: px2vh(150px);
}
</style>
