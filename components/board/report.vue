<template>
  <div class="report">
    <div class="content">
      <div class="title">{{ name }}<br /><span>Bullet Board</span></div>

      <div class="txt">
        <div class="scroll1">
          <div class="swi">{{ content }}</div>
        </div>
        <div class="scroll2">
          <div class="swi"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let vueSeamLessScroll
if (process.client) {
  vueSeamLessScroll = resolve => require(['vue-seamless-scroll'], resolve)  // 3d图表库
}
export default {
  props: {
    data: '',
    title: ''
  },
  data(context) {
    // const data = await $http.$get('/api/users')
    return {
      name: '',
      content: '',
      times: null,
      times1: null,
      times1: null,
      distance: 0,
      distance1: 0,
      top: 0,
      top1: 0,
    }
  },
  components: { vueSeamLessScroll },
  head() {
    return {

    }
  },
  mounted() {
    this.get()
    this.times = setInterval(() => {
      this.get()
    }, 10000)
    // this.roll()
    // this.rollRepeat()
    this.rollRepeat3()
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      clearInterval(this.times1);
      clearInterval(this.times2);
      this.times = null;
      this.times1 = null;
      this.times2 = null;
    })

  },
  methods: {
    get() {
      this.$axios.post('txt/report/title').then((res) => {
        let title = res.data
        this.name = title.substring(0, title.indexOf('.'))
      }).catch((err) => {
        console.log('请求失败' + err.message);
      })
      this.$axios.post('txt/report/content').then((res) => {
        let text = res.data
        this.content = text.replace(/<br\/>/g, " ");

      }).catch((err) => {
        console.log('请求失败' + err.message);
      })
    },
    roll() {
      this.times1 = setInterval(() => {
        let swiper = document.getElementById('swi')
        let text = document.querySelector('.txt')
        const { top, right, bottom, left } = swiper.getBoundingClientRect();
        const bottom1 = text.getBoundingClientRect().bottom;
        // console.log(Math.ceil(swiper.offsetHeight / text.offsetHeight));
        // console.log(bottom);
        // console.log(bottom1);
        swiper.style.transition = ''
        // console.log((bottom / bottom1));
        if (text.offsetHeight < (swiper.offsetHeight - 20)) {
          if (bottom + (text.offsetHeight / 5) > bottom1) {
            // swiper.style.transform = 'translate(100px, 0)'
            this.distance += text.offsetHeight / 3000
            swiper.style.top = -this.distance + 'px'
          } else {
            swiper.style.transition = 'all 1s'
            swiper.style.top = '0px'
            this.distance = 0
            clearInterval(this.times1);
            this.times1 = null;
            setTimeout(() => {
              this.roll()
            }, 4000);
          }
        }
      }, 2)
    },
    rollRepeat() {
      this.times1 = setInterval(() => {
        let swiper = document.getElementById('swi')
        let swiper1 = document.getElementById('swi1')
        let text = document.querySelector('.txt')
        // swiper1.style.top = swiper.offsetHeight + 'px'

        const { top, right, bottom, left } = swiper.getBoundingClientRect();
        // const bottom1 = swiper1.getBoundingClientRect().bottom;
        const bottom2 = text.getBoundingClientRect().bottom;
        // console.log(Math.ceil(swiper.offsetHeight / text.offsetHeight));
        // console.log(this.top);

        // console.log(swiper.style.transform.substring(7).split(',')[4]);
        swiper.style.transition = ''
        // console.log((bottom / bottom1));
        if (text.offsetHeight < (swiper.offsetHeight - 20)) {
          if (this.top1 / 2 < swiper.offsetHeight) {
            // swiper.style.transform = 'translate(100px, 0)'
            this.distance -= text.offsetHeight / 300
            this.distance1 -= text.offsetHeight / 300
            swiper.style.transform = `translateY(${this.distance}px)`
            swiper1.style.transform = `translateY(${this.distance1}px)`
            this.top = -this.distance
            this.top1 = -this.distance1
          } else {
            swiper.style.transform = `translateY(${text.offsetHeight}px)`
            swiper1.style.transform = `translateY(${this.top + text.offsetHeight}px)`
            this.top = text.offsetHeight
            this.top1 = text.offsetHeight
            this.distance = text.offsetHeight
            this.distance1 = text.offsetHeight
            clearInterval(this.times1);
            this.times1 = null;
            this.rollRepeat()
          }
        }
      }, 2)
    },
    rollRepeat3() {
      this.times1 = setInterval(() => {
        let text = document.querySelector('.txt')
        let scroll1 = document.querySelector('.scroll1')
        let scroll2 = document.querySelector('.scroll2')
        function scrollup() {
          console.log(text.scrollTop);
          if (text.scrollTop > scroll1.offsetHeight) { //滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
            text.scrollTop = 0;
          } else {
            text.scrollTop += 1
          }
        }
        if (text.offsetHeight < scroll1.offsetHeight) {
          scroll2.innerHTML = scroll1.innerHTML
          scrollup()
        } else {
          scroll2.innerHTML = ''
          clearInterval(this.times1);
          this.times1 = null;
          this.rollRepeat3()
        }
      }, 50)

    },
    rollRepeat1() {
      this.times2 = setInterval(() => {
        let swiper = document.getElementById('swi')
        let swiper1 = document.getElementById('swi1')
        let text = document.querySelector('.txt')
        const { top, right, bottom, left } = swiper1.getBoundingClientRect();
        const bottom1 = text.getBoundingClientRect().bottom;
        // console.log(Math.ceil(swiper.offsetHeight / text.offsetHeight));
        console.log(bottom);
        console.log(bottom1);
        swiper1.style.transition = ''
        // console.log((bottom / bottom1));
        if (text.offsetHeight < swiper1.offsetHeight) {
          if (bottom + text.offsetHeight > bottom1) {
            // swiper.style.transform = 'translate(100px, 0)'
            this.distance1 += text.offsetHeight / 3000
            swiper1.style.scrollTop = (swiper1.offsetHeight - this.distance1) + 'px'

          } else if (bottom + text.offsetHeight <= bottom1) {
            swiper1.style.scrollTop = swiper1.offsetHeight + 'px'
            this.distance1 = 0
            clearInterval(this.times2);
            this.times2 = null;
            // setTimeout(() => {
            // }, 4000);
            this.rollRepeat1()

          }
        }
      }, 2)
    }
  },
  destroyed() {

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

// .title {
//   width: px2vw(200px);
//   height: px2vh(90px);
//   margin: 0 auto;
//   color: #fff;
//   line-height: px2vh(90px);
// }

.report {
  .content {
    color: #fff;
    width: px2vw(950px);
    height: px2vh(550px);
    overflow: hidden;
    background: url(../../assets/index/report/bg.png) no-repeat;
    background-size: px2vw(950px) px2vh(550px);

    .title {
      height: px2vh(120px);
      width: px2vw(300px);
      font-size: px2vh(45px);
      line-height: px2vh(40px);
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      // text-shadow: 0px 2px 25px #0083F0;
      text-align: left;
      padding-top: px2vh(15px);
      padding-left: px2vw(40px);

      span {
        font-size: px2vw(30px);
      }
    }


    .txt {
      // text-indent: 1rem;
      width: px2vw(900px);
      height: px2vh(410px);
      margin: 0 auto;
      //定义元素如何处理空白，pre-wrap：保留空白符序列，正常地进行换行；
      // text-indent: px2vw(40px);
      overflow: hidden;
      // margin-top: px2vh(120px);
      position: relative;


    }
  }
}


.swi {
  // position: absolute;
  // // padding: 0 px2vw(20px);
  // // transition: all 0.5s;
  // top: 0px;
  -webkit-transform: scale(0.94);
  font-size: 14px;
  font-family: 'Verdana';
  white-space: pre-wrap;
}




.animate {
  padding-left: 20px;
  font-size: 12px;
  color: #fff;
  animation: 15s wordsLoop linear infinite normal;
}

.animate1 {
  padding-left: 20px;
  font-size: 12px;
  color: #fff;
  animation: 15s 2s wordsLoop1 linear infinite normal;
}

@keyframes wordsLoop {

  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-100%);
  }

  51% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0%);
  }
}

@keyframes wordsLoop1 {

  0% {
    transform: translateY(90%);
  }

  100% {
    transform: translateY(-80%);
  }
}
</style>
