<template>
  <div class="container">
    <el-upload class="upload-demo" drag action="http://localhost:3000/api/upload" :accept="'.xlsx, .xls'" >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">消防信息文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="http://localhost:3000/api/upload" :accept="'.xlsx, .xls'" >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">安全事故文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="http://localhost:3000/api/upload" :accept="'.xlsx, .xls'" >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">原材料库位文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="http://localhost:3000/api/upload" :accept="'.xlsx, .xls'" >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">原材料预约文件</div>
    </el-upload>
    <el-upload class="upload-demo" drag action="http://localhost:3000/api/upload/t" :accept="'.txt'" >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text" >公告文栏文件</div>
    </el-upload>
  </div>
</template>

<script>

export default {
  async asyncData(context) {
    // const data = await $http.$get('/api/users')
    
  },
  head() {
    return {
      title: 'Users'
    }
  },

}
</script>

<style scoped lang="scss">
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

.upload-demo {
  margin: 0 20px;
  .el-upload__text {
  font-size: 24px;
}
}


</style>
