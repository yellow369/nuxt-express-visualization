<template>
  <div class="order">
    <div class="title">
      <div class="text">原材料预约信息</div>
    </div>
    <div class="count">
      <dv-digital-flop :config="config1" class="flop" />
      <div class="text">/预约总数量</div>
    </div>
    <div class="count">
      <dv-digital-flop :config="config2" class="flop" />
      <div class="text">/预约总拍位</div>
    </div>
    <div class="content">
      <client-only>
        <dv-scroll-board :config="config" class="form" />
      </client-only>
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
    let form = this.data
    // console.log(form[0].indexOf('当前日期'));
    if (form[0].indexOf('当前日期') !== -1) {
      form.shift()
    }
    this.change(form)
    console.log(form[0][7]);
    let num1 = 0
    let num2 = 0
    form.map((item) => {
      num1 += item[7]
      num2 += item[8]
    })
    let config = {
      header: this.header,
      data: form,
      align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
      hoverPause: false
    }

    return {
      config,
      config1: { number: [num1] },
      config2: { number: [num2] },
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
    change(e) {
      e.map((item, index) => {
        if (item.indexOf('已完成') !== -1) {
          e[index][e[index].indexOf('已完成')] = '<span style="color: #00C430;font-weight: 700;font-size: 22px;padding-right: 2px">●</span>已完成'
        } else if (item.indexOf('未完成') !== -1) {
          e[index][e[index].indexOf('未完成')] = '<span style="color: #FF1600;font-weight: 700;font-size: 22px;padding-right: 2px">●</span>未完成'
        }
      })
    }
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

.count {
  width: px2vw(300px);
  height: px2vh(120px);
  display: inline-block;

  .flop {
    display: inline-block;
    width: px2vw(160px);
    height: px2vh(150px);
    vertical-align: middle
  }

  .text {
    color: #fff;
    display: inline-block;
    padding-bottom: 10px;

  }
}


.content {
  .form {
    width: px2vw(1000px);
    height: px2vh(400px);
  }
}
</style>
