<template>
  <div class="check">
    <div class="fm">
      <client-only>
        <dv-decoration-7 class="title">&nbsp;&nbsp;FM消防检查&nbsp;&nbsp;</dv-decoration-7>
      </client-only>
      <div class="content">
        <div class="item">
          <div v-for="(item, index) in record" :key="index">
            <div class="circular">
              <div class="complete" v-if="item[4] == '已完成'">✔</div>
            </div>
            <p>{{item[0]}}</p>
            <p>{{item[2]}}</p>
          </div>

        </div>
      </div>
    </div>
    <div class="mouse">
      <client-only>
        <dv-decoration-7 class="title">&nbsp;&nbsp;虫鼠害检查&nbsp;&nbsp;</dv-decoration-7>
      </client-only>
      <div class="content">
        <div class="item">
          <div v-for="(item, index) in mouse" :key="index">
            <div class="circular">
              <div class="complete" v-if="item[4] == '已完成'">✔</div>
            </div>
            <p>{{item[0]}}</p>
            <p>{{item[2]}}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: ''
  },
  data(context) {
    let record = []
    let mouse = []
    record.push(this.data[1])
    record.push(this.data[2])
    record.push(this.data[3])
    record.push(this.data[4])
    record.push(this.data[5])
    record.push(this.data[6])
    mouse.push(this.data[7])
    mouse.push(this.data[8])
    // console.log(record);
    return {
      record,
      mouse
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

.check {
  width: px2vw(1000px);
}

.fm {
  width: px2vw(700px);
  display: inline-block;
}

.mouse {
  width: px2vw(200px);
  display: inline-block;
  margin-left: px2vw(40px);

  .title {
  width: px2vw(250px);

  }
  .content {
    width: px2vw(250px);
    
  }
}

.title {
  width: px2vw(300px);
  height: px2vh(40px);
  color: #fff;
  line-height: px2vh(40px);
  font-size: px2vw(24px);
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0 auto;
  // background-color: #ccc;
}


.content {
  width: px2vw(700px);
  height: px2vh(120px);
  color: #fff;

  .item {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;

    .circular {
      width: px2vw(80px);
      height: px2vw(80px);
      border-radius: px2vw(40px);
      background-color: #518BC3;
      margin: 5px;

      .complete {
        width: 100%;
        height: 100%;
        font-size: 40px;
        background-color: #00E0E2;
        border-radius: px2vw(40px);
        color: rgba(0, 0, 0, 0.721);
        font-weight: 700;
        text-align: center;
      }
    }

    p {
      width: px2vw(90px);
      text-align: center;
      color: rgba(255, 255, 255, 0.733);
    }

  }
}
</style>
