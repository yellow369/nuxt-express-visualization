<template>
  <div>
    <client-only>
      <dv-full-screen-container>
        <div class="nav">
          <img src="../assets/fullscreen.svg" alt="" @click="fullScreen" v-if="!full">
          <img src="../assets/reduce.svg" alt="" @click="fullScreen" v-if="full">
          <img src="../assets/nav.svg" @click="shownav">
          <div v-if="nav">
            <nuxt-link to="/">首页</nuxt-link>
            <nuxt-link to="/upload">上传</nuxt-link>
            <nuxt-link to="/board">数据看板1</nuxt-link>
            <nuxt-link to="/board/data">数据看板2</nuxt-link>
          </div>
        </div>
        <Nuxt />
      </dv-full-screen-container>

    </client-only>

  </div>
</template>
<script>
export default {
  data() {
    // const data = await $http.$get('/api/users')
    return {
      full: false,
      nav: false
    }
  },
  head() {
    return {

    }
  },
  methods: {
    fullScreen(element) {
      let ele = document.documentElement
      if (!this.full) {
        ele.requestFullscreen()
        document.getElementById('dv-full-screen-container')?.classList.add('fullscreen')
        this.full = true
      } else {
        document.exitFullscreen()
        document.getElementById('dv-full-screen-container')?.classList.remove('fullscreen')
        this.full = false
      }
    },
    shownav() {
      this.nav = !this.nav
    }
  }
}
</script>
<style lang="scss">
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.nav {
  width: 500px;
  height: 60px;
  position: fixed;
  left: 0;
  top: 20px;
  line-height: 60px;
  display: flex;

  img {
    width: 8%;
    margin-bottom: 5px;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    color: #ccc;
    font-size: 22px;
    padding: 0 4px;
  }

}

.fullscreen {
  .sidebar {
    display: none;
  }

  .content-box {
    left: 0;
    top: 0;
  }

  .content-box main>.el-scrollbar>.el-scrollbar__wrap>.el-scrollbar__view {
    padding: 0;
  }

  .tags {
    display: none;
  }
}
</style>
