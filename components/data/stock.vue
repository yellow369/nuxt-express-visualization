<template>
  <div class="stock">
    <div class="title">
      <div class="text">原料包材出入库体积(m³)</div>
    </div>
    <div class="content" id="main">

    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    data: ''
  },
  data() {
    // console.log(this.data.map((items) => items.ORDERDATE));

    return {}
  },
  head() {
    return {

    }
  },
  mounted() {
    
  },
  methods: {
    
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
  margin-left: px2vw(100px);

  .text {
    background-color: #1A4273;
    font-weight: 700;
    font-size: px2vw(24px);
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}


</style>
