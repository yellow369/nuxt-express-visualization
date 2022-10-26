<template>
  <div class="report">
    <client-only>
      <dv-border-box-11 :title="name" class="content" :backgroundColor="'#102238'" :color="['#00E0FF']">
        <div class="txt">
          <div id="swi">{{content}}</div>
        </div>
      </dv-border-box-11>
    </client-only>

  </div>
</template>

<script>

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


    this.times1 =  setInterval(() => {
      let swiper = document.getElementById('swi')
      let text = document.querySelector('.txt')
      const { top, right, bottom, left } = swiper.getBoundingClientRect();
      const bottom1 = text.getBoundingClientRect().bottom;

      // console.log(Math.ceil(swiper.offsetHeight / text.offsetHeight));
      // console.log(bottom);
      // console.log(bottom1);
      if (bottom > bottom1) {

        // swiper.style.transform = 'translate(100px, 0)'
        swiper.style.top = -text.offsetHeight + 'px'
      } else if (bottom < bottom1) {
        swiper.style.top = '0px'
      }
    }, 15000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.times);
      clearInterval(this.times1);
      this.times = null;
      this.times1 = null;
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

.content {
  color: #fff;
  width: px2vw(850px);
  height: px2vh(550px);
  text-indent: 2rem;
  font-size: px2vw(22px);

  overflow: hidden;

  .txt {
    width: px2vw(800px);
    height: px2vh(410px);
    margin: 0 auto;
    //定义元素如何处理空白，pre-wrap：保留空白符序列，正常地进行换行；
    white-space: pre-wrap;
    text-indent: 0px;
    overflow: hidden;
    font-size: px2vw(28px);
    margin-top: px2vh(120px);
    position: relative;

    #swi {
      position: absolute;
      transition: all 1s;
      top: 0px
    }
  }
}
</style>
