<template>
  <div class="order">
    <div class="title">
      <div class="text">原材料预约信息</div>
    </div>
    <div class="content">
      <dv-scroll-board :config="config" class="form" />
    </div>

  </div>
</template>

<script>


export default {
  props: {
    data: '',
    header: ''
  },
  data() {
    // console.log(this.data.map((items) => items.ORDERDATE));

    let config = {
      header: ['ad'],
      data: ['z', 'dsadsa', 'hhh'],
      align: ['center'],
      hoverPause: false,
      headerBGC: '#153276',
      oddRowBGC: '#132235',
      evenRowBGC: '#132235'
    }
    return {
      config
    }
  },
  head() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    //修改表格数据

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';

.title {
  width: px2vw(300px);
  color: #fff;
  border: 2px solid #1A4273;
  padding: 4px;
  // margin-left: px2vw(40px);

  .text {
    background-color: #1A4273;
    font-weight: 700;
    font-size: px2vw(24px);
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}
.content {
  .form {
    width: px2vw(1200px);
    height: px2vh(350px);
  }
}

</style>
