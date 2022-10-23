<template>
  <div>
    <div class="num">
      <div class="num-item">
        {{date[0]}}
      </div>
      <div class="num-item">
        {{date[1]}}
      </div>
      <div class="num-item">
        {{date[2]}}
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
    data: ''
  },
  data() {

    return { date: [] }

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
    converToArray: number => [...`${number}`].map(el => parseInt(el))

  },
  mounted() {
    // console.log(this.data);

    this.$axios.post('xlsx/security').then((res) => {
      this.date = res.data[0].data
      let now = new Date()
      let day = Math.floor((now.getTime() - this.formartDateTime(this.date[1][1])) / 3600 / 24 / 1000)
      this.date = this.converToArray(day)
    }).catch((err) => {
      console.log('请求失败' + err.message);
    })

  }

}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.num {
  display: flex;
  width: px2vw(200px);
  height: px2vh(80px);
  margin: 0 auto;
  margin-bottom: 10px;
  color: #fff;
  text-align: center;
  justify-content: space-evenly;

  &-item {
    width: px2vw(50px);
    height: px2vh(80px);
    background-color: #1D91FF;
    border-radius: 8px;
    font-size: px2vh(60px);
    line-height: px2vh(80px);
    font-weight: 600;
  }
}

.content {
  width: px2vw(300px);
  height: px2vh(40px);
  background-color: rgba(255, 255, 255, 0.29);
  text-align: center;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.733);
  font-size: px2vw(24px);
  font-weight: 500;
  line-height: px2vh(40px);
}
</style>
