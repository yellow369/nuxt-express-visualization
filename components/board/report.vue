<template>
  <div class="report">
    <client-only>
      <dv-border-box-11 :title="name" class="content" :backgroundColor="'#102238'" :color="['#00E0FF']">
        <div class="txt">
          <!-- {{content}} -->
          "当前日期",
          "类型",
          "供应商",
          "物料号",
          "物料名称",
          "托含量",
          "箱/拍",
          "预约数量",名称",
          "托含量",
          "箱/拍",
          "预约数量",
          "预约拍数",
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
    clearInterval(this.times)
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
  width: px2vw(500px);
  height: px2vh(300px);
  overflow: hidden;
  text-indent: 2rem;
  font-size: px2vw(22px);
  padding-top: px2vh(60px);

  .txt {
    width: px2vw(450px);
    margin: 0 auto;
    //定义元素如何处理空白，pre-wrap：保留空白符序列，正常地进行换行；
    white-space: pre-wrap;
    // overflow: hidden;

  }
}
</style>
