<template>
  <div class="container">
    <div>
      <Logo />
      <div class="links">
        <a href="/upload" class="button--green">
          上传文件
        </a>
      </div>
      <div class="links">
        <a href="/board" class="button--green">
          安全看板
        </a>
      </div>
      <div class="links">
        <a href="/board/data" class="button--green">
          运营看板
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   asyncData({ $http, context }) {
    
    return {
      
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
