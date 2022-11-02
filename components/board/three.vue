<template>
  <div class="three">
    <div class="title">
      <div class="text">阀门:</div>
    </div>
    <img src="../../assets/img/three3.png" alt="">
    <!-- <el-table style="width: 28%;background-color: rgba(0,0,0,0);" :data="tableData">
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
    </el-table> -->
    <div class="table">
      <div class="col" v-for="(item, index) in tableData">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data(context) {
    // const data = await $http.$get('/api/users')

    return {
      tableData: [
        '1#	1号库办库公室1层PIV类型阀门', '2#	1号库办库办公室2层PIV类型阀门', '3#	1号库PIV类型阀门', '4#	2号库办公室1层PIV类型阀门', '5#	2号库办公室2层PIV类型阀门',
        '6#	2号库PIV类型阀门', '7#	3号库PIV类型阀门', '8#	3号库办公室1层PIV类型阀门', '9#	3号库办公室2层PIV类型阀门', '10#	阀门间3号PIV类型阀门',
        '11#	阀门间2号PIV类型阀门', '12#	阀门间1号PIV类型阀门', '13#	室外NON - INDICATING类型阀门', '14#	室外NON - INDICATING类型阀门',
        '15#	消火栓NON - INDICATING阀门', '16#	消火栓NON - INDICATING阀门', '17#	消防泵房NON - INDICATING类型阀门',
        '18#	消防泵房NON - INDICATING类型阀门', '19#	3号库末端试水备用阀', '20#	2号库末端试水备用阀', '21#	1号库末端试水备用阀', '22#	1号办公室末端试水备用阀',
        '23#	室内消火栓进水阀', '24#	2号库办公室1F末端试水备用阀', '25#	3号库办公室末端试水备用阀', '26#	阀门间1号泄水阀', '27#	阀门间2号泄水阀', '28#	阀门间3号泄水阀',
        '29#	喷淋系统泄水阀', '30#	消火栓系统泄水阀', '31#	3号库末端试水阀', '32#	2号库末端试水阀', '33#	1号库末端试水阀', '34#	1号办公室末端试水阀',
        '35#	2号办公室1F末端试水阀', '36#	3号办公室末端试水阀', '37#	2号办公室2F末端试水阀', '38#	2号库办公室2F末端试水备用阀', '39#	成品库PIV类型阀门',
        '40#	成品库阀门间PIV类型阀门', '41#	成品库阀门间泄水阀', '42#	成品库末端试水阀', '43#	成品库末端试水备用阀', '44#	成品库室外NON - INDICATING类型阀门',
        '45#	成品库室外NON - INDICATING类型阀门'
      ]
    }
  },
  head() {
    return {

    }
  },
  methods: {

  },
  mounted() {


    // this.get()
  }
}

</script>

<style scoped lang="scss">
@import '@/assets/function.scss';


.three {
  width: px2vw(4096px);
  height: px2vh(1200px);
  margin-top: px2vh(120px);
  display: flex;

  .title {
    font-size: px2vh(46px);
    color: #18E8FC;
    line-height: px2vh(52px);
    letter-spacing: px2vw(7px);
    text-shadow: 0px 2px 8px #0037BD;
    background: linear-gradient(360deg, #AAE7FF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    text-align: left;
    margin-left: px2vw(40px);
  }

  img {
    height: px2vh(1150px);
    margin-top: px2vh(-50px);
    // transition: all 1s;
  }

  .table {
    color: #00C9F9;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    min-height: px2vh(950px);
    height: px2vh(1100px);
    margin-left: px2vw(50px);

    .col {
      margin: 0 px2vw(30px);
    }
  }
}
</style>
