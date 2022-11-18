<template>
  <div class="time1">
    <div class="year"><span>{{ year }}&nbsp; </span></div>
    <div class="year" style="display: flex;justify-content: center;align-items: center"><span>{{ weekly
    }}&nbsp; 
    {{ weekly_en.toLocaleUpperCase() }}</span>&nbsp;
    <span>{{ time }}</span></div>
  </div>
</template>

<script>
import moment from 'moment'
import week from '@/utils/week'

export default {
  data(context) {

    return {
      year: '',
      year_en: '',
      weekly: '',
      weekly_en: '',
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
      this.year_en = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
      this.weekly = week(moment().format('dddd'))
      this.weekly_en = moment().format('ddd')
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
  right: px2vw(320px);
  top: px2vh(90px);
  width: px2vw(380px);
  height: px2vh(74px);
  text-align: center;
  z-index: 9;
  // letter-spacing: px2vw(2px);

  .year {
    line-height: px2vh(35px);
    font-size: px2vw(28px);
    font-family: 54--Regular;
    color: #CFF1FF;
  }
}
</style>
