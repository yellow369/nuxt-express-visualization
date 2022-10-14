<template>
  <div class="report">
    <client-only>
      <dv-border-box-11 :title="name" class="content" :backgroundColor="'#102238'" :color="['#00E0FF']">
        <p class="txt">{{data}}</p>
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
    console.log(this.data);
    return {
      name,

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
  }
}
</style>
