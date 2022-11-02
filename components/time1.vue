<template>
  <div class="time1">
    <div class="year"><span>{{ year }}</span></div>
    <div class="year" style="display: flex;justify-content: center;align-items: center"><span>{{ weekly
    }}</span>&nbsp;<span>{{ time }}</span></div>
  </div>
</template>

<script>
import moment from 'moment'
import week from '@/utils/week'

export default {
  data(context) {

    return {
      year: '',
      weekly: '',
      time: ''
    }
  },
  head() {
    return {

    }
  },
  methods: {
    getTime() {
      let date = new Date();
      let hour = date.getHours();
      hour = hour < 10 ? '0' + hour : hour;//时间补0  
      let minute = date.getMinutes();
      minute = minute < 10 ? '0' + minute : minute;//时间补0  
      let second = date.getSeconds();
      second = second < 10 ? '0' + second : second;//时间补0  
      this.year = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
      this.weekly = week(moment().format('dddd'))
      this.time = hour + ':' + minute + ':' + second
    }
  },
  mounted() {

    this.getTime()
    this.times = setInterval(() => {
      this.getTime()
    }, 1000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      this.times = null;
    })
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.time1 {
  position: fixed;
  right: px2vw(340px);
  top: px2vh(86px);
  width: px2vw(320px);
  height: px2vh(74px);
  text-align: center;
  letter-spacing: px2vw(2px);

  .year {
    line-height: px2vh(44px);
    font-size: px2vh(38px);
    font-family: 54--Regular;
    font-weight: 500;
    color: #CFF1FF;
  }
}
</style>
