<template>
  <div class="container">
    <el-upload class="upload-demo" drag action="/api/upload/check" :accept="'.xlsx, .xls'">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">安全检查信息文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="/api/upload/security" :accept="'.xlsx, .xls'">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">安全事故文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="/api/upload/stock" :accept="'.xlsx, .xls'">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">原材料库位文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="/api/upload/order" :accept="'.xlsx, .xls'">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">原材料预约文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="/api/upload/t" :accept="'.txt'">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">公告文栏文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="/api/upload/video" :accept="'.mp4'">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">安全视频文件</div>
    </el-upload>
  </div>
</template>

<script>


export default {
  async asyncData(context) {
    // const data = await $http.$get('/api/users')
  },
  data() {
    return {
      height: '100',
      width: '100'
    }
  },
  head() {
    return {
      title: "Users"
    };
  },
  components: {},
  computed: {


  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/function.scss';
.container {
  margin: 0 auto;
  min-height: 100vh;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
}

.upload-demo ::v-deep {
  margin: 0 20px;

   .el-upload-dragger  {
    width: px2vw(300px);
    height: px2vh(300px);
    min-height: 180px;
  }

  .el-upload__text {
    font-size: px2vh(40px);
  }
}
</style>
