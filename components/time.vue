<template>
  <div class="time">
    <div class="txt">
      <p>{{year}}</p>
      <p>{{weekly}}</p>
      <p>{{time}}</p>
    </div>
    <div class="clock" :style="styleVar">
      <!-- 内圈 -->
      <div class="innerBorder">
        <!-- 时钟刻度 -->
        <div class="scale mark1"></div>
        <div class="scale mark2"></div>
        <div class="scale mark3"></div>
        <div class="scale mark4"></div>
        <div class="scale mark5"></div>
        <div class="scale mark6"></div>
        <div class="scale mark7"></div>
        <div class="scale mark8"></div>
      </div>
      <!-- 内圈波浪 -->
      <div class="wave"></div>
      <!-- 时针、分针、秒针 -->
      <div class="hands hourhand"></div>
      <div class="hands minhand"></div>
      <div class="hands sechand"></div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import week from '@/utils/week'

export default {
  name: 'clock',
  components: {},
  props: {
    bgsize: {
      type: Number,
      default: 70
    },
    bgcolor: {
      type: String,
      default: '#D1CCC0'
    }
  },
  data() {
    let year = moment().format("YYYY-MM-DD")
    let weekly = week(moment().format('dddd'))
    let time = moment().format("HH:MM")

    return {
      hour: 0,  //小时
      minute: 0,  //分钟 
      second: 0,  //秒
      year,
      weekly,
      time
    };
  },
  created() { },
  mounted() {
    this.currentTime();
    // 定时校准
    setInterval(this.currentTime, 1000);
  },
  watch: {},
  computed: {
    styleVar() {
      return {
        '--clock-size': this.bgsize + 'px',
        '--clock-bgcolor': this.bgcolor,
        '--length-log2E': ((this.bgsize - 10) / 2) / Math.LOG2E + 'px',
      }
    }
  },
  methods: {
    // 校准时钟指针方法
    currentTime: function () {
      let date = new Date();
      this.hour = date.getHours();
      this.minute = date.getMinutes();
      this.second = date.getSeconds();
      document.getElementsByClassName('hourhand')[0].style.transform = 'rotate(' + this.hour / 12 * 360 + 'deg)';
      document.getElementsByClassName('minhand')[0].style.transform = 'rotate(' + this.minute / 60 * 360 + 'deg)';
      document.getElementsByClassName('sechand')[0].style.transform = 'rotate(' + this.second / 60 * 360 + 'deg)';
    }
  },
};
</script>
<style scoped lang="scss">
@import '@/assets/function.scss';
$clock-size: px2vw(var(--clock-size));
$length-log2E: px2vw(var(--length-log2E));

.time {
  width: px2vw(300px);
  height: px2vh(150px);
  border: 1px solid #fff;
  border-radius: 10px;
  display: flex;
  align-items: center
}

.txt {
  color: #fff;
  width: px2vw(150px);
  text-align: center;
  line-height: px2vh(45px);
}


/* 外部大小和阴影 */
.clock {
  width: var(--clock-size);
  height: var(--clock-size);
  border-radius: 50%;
  // box-shadow: 5px 5px 10px $clock-size, -4px -4px 8px #fff;
  position: relative;
  overflow: hidden;
  background-color: #fff;

}

/* 内阴影 */
// .innerBorder {
//     /* calc加var计算 */
//     width: calc(var(--clock-size) - 10px);
//     height: calc(var(--clock-size) - 10px);
//     position: relative;
//     left: 5px;
//     top: 5px;
//     box-shadow: -3px -3px 6px #fff inset, 3px 3px 6px $clock-size inset;
//     border-radius: 50%;
// }
/* 时钟刻度 */
.scale {
  width: 2px;
  height: 8px;
  position: absolute;
  box-shadow: 1px 1px 1px #9D958F inset, -1px -1px 1px $clock-size inset;
  border-radius: 1px;
}

/* 设置小刻度位置 */
.mark1 {
  left: calc(50% - 1px);
  top: 2px;
}

.mark2 {
  transform: rotate(45deg);
  left: calc(50% + $length-log2E );
  top: calc(50% - $length-log2E );
}

.mark3 {
  transform: rotate(90deg);
  left: calc(100% - 7px);
  top: calc(50% - 3px);
}

.mark4 {
  transform: rotate(135deg);
  left: calc(50% + $length-log2E - 5px);
  top: calc(50% + $length-log2E - 5px);
}

.mark5 {
  left: calc(50% - 1px);
  bottom: 2px;
}

.mark6 {
  transform: rotate(45deg);
  left: calc(50% - $length-log2E + 5px);
  top: calc(50% + $length-log2E - 5px);
}

.mark7 {
  transform: rotate(90deg);
  left: 2px;
  top: calc(50% - 3px);
}

.mark8 {
  transform: rotate(135deg);
  left: calc(50% - $length-log2E );
  top: calc(50% - $length-log2E );
}

/* 中间波浪 */
// .wave {
//     width: 30%;
//     height: 30%;
//     position: absolute;
//     left: 35%;
//     top: 35%;
//     box-shadow: 3px 3px 9px $clock-size, -3px -3px 9px #fff;
//     border-radius: 50%;
//     filter: blur(1px);  /* 模糊处理 */
//     animation: wavemove 4s infinite linear; 
// }
// @keyframes wavemove {
//     0% {
//         transform: scale(0.5);
//     }
//     50% {
//         transform: scale(1);
//         opacity: 1;
//     }
//     100% {
//         transform: scale(1.7);
//         opacity: 0;
//     }
// }
/*************************** 时针、分针、秒针 ****************************/
.hands {
  position: absolute;
  transform-origin: bottom;
  border-radius: 10px;
  z-index: 300;
  bottom: 50%;
  left: calc(50% - 1px);
}

.sechand {
  width: 2px;
  height: 42%;
  background-image: linear-gradient(#CD69C9, #1CA6F3);
}

.minhand {
  width: 4px;
  height: 33%;
  background-color: #9BA5AA;
  left: calc(50% - 2px);
}

.hourhand {
  width: 6px;
  height: 21%;
  background-color: #BEC8E4;
  left: calc(50% - 3px);
}
</style>
