<template>
  <div class="three">
    <div class="title">
      <div class="text">消防阀门点位图<br /><span>Fire Valve Map</span></div>
    </div>
    <div><img src="../../assets/仓库3D图.png" alt=""></div>
    <!-- <el-table style="width: 28%;background-color: rgba(0,0,0,0);" :data="tableData">
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
    </el-table> -->
    <div class="table">
      <div class="table-title">消防阀门编号说明 <br /><span>Fire Valve Number Discription</span></div>
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
        '1# 	1号库办库公室1层PIV类型阀门', '2#	1号库办库办公室2层PIV类型阀门', '3#	1号库PIV类型阀门', '4#	2号库办公室1层PIV类型阀门', '5#	2号库办公室2层PIV类型阀门',
        '6#	  2号库PIV类型阀门', '7#	3号库PIV类型阀门', '8#	3号库办公室1层PIV类型阀门', '9#	3号库办公室2层PIV类型阀门', '10#	阀门间3号PIV类型阀门',
        '11#	阀门间2号PIV类型阀门', '12#	阀门间1号PIV类型阀门', '13#	室外NON - INDICATING类型阀门', '14#	室外NON - INDICATING类型阀门',
        '15#	消火栓NON - INDICATING阀门', '16#	消火栓NON - INDICATING阀门', '17#	消防泵房NON - INDICATING类型阀门',
        '18#	消防泵房NON - INDICATING类型阀门', '19#	3号库末端试水备用阀', '20#	2号库末端试水备用阀', '21#	1号库末端试水备用阀', '22#	1号办公室末端试水备用阀',
        '23#	室内消火栓进水阀', '24#	2号库办公室1F末端试水备用阀', '25#	3号库办公室末端试水备用阀', '26#	阀门间1号泄水阀', '27#	阀门间2号泄水阀', '28#	阀门间3号泄水阀',
        '29#	喷淋系统泄水阀', '30#	消火栓系统泄水阀', '31#	3号库末端试水阀', '32#	2号库末端试水阀', '33#	1号库末端试水阀', '34#	1号办公室末端试水阀',
        '35#	2号办公室1F末端试水阀', '36#	3号办公室末端试水阀', '37#	2号办公室2F末端试水阀', '38#	2号库办公室2F末端试水备用阀'
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
  height: px2vh(1300px);
  margin-top: px2vh(80px);
  position: relative;

  .title {
    height: px2vh(66px);
    width: px2vw(420px);
    font-size: px2vh(45px);
    line-height: px2vh(40px);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    text-align: left;
    padding-left: px2vw(80px);

    .text {
      width: 100%;

      span {
        font-size: px2vh(35px);
      }
    }
  }

  img {
    height: px2vh(1312px);
    width: px2vw(3534px);
    margin-top: px2vh(-100px);
    margin-left: px2vw(-80px);
    // transition: all 1s;
  }

  .table {
    color: rgba(255, 255, 255, 0.758);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: px2vh(1280px);
    width: px2vw(800px);
    margin-left: px2vw(0px);
    font-size: px2vw(24px);
    position: absolute;
    right: -5%;
    top: 0%;
    line-height: px2vw(26px);

    .table-title {
      font-size: px2vh(45px);
      line-height: px2vh(40px);
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: px2vh(20px);
      margin-left: px2vw(35px);

      span {
        font-size: px2vh(35px);
      }
    }

    .col {
      margin: 0 px2vw(0px);
      font-size: px2vw(22px);
      transform: scale(0.9);
      line-height: px2vh(30px);
    }
  }
}
</style>
