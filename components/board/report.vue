<template>
  <div class="report">
    <client-only>
      <dv-border-box-11 :title="name" class="content" :backgroundColor="'#102238'" :color="['#00E0FF']">
        <div class="txt">
          {{data}}
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
    let name = this.title.substring(0, this.title.indexOf('.'))
    let content = this.data.replace(/<br\/>/g, " ");
    console.log(content);

    return {
      name,
      content
    }
  },
  head() {
    return {

    }
  },

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

  .txt {
    width: px2vw(450px);
    margin: 0 auto;
    margin-top: px2vh(100px);
    //定义元素如何处理空白，pre-wrap：保留空白符序列，正常地进行换行；
    white-space: pre-wrap
  }
}
</style>
