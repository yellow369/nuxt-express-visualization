<template>
  <div>
    <client-only>

      <dv-full-screen-container>
        <div class="nav">
          <img src="../assets/nav.svg" alt="">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/upload">上传</nuxt-link>
          <nuxt-link to="/board">数据看板1</nuxt-link>
          <nuxt-link to="/board/data">数据看板2</nuxt-link>
        </div>
        <Nuxt />
      </dv-full-screen-container>

    </client-only>

  </div>
</template>

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
  width: 280px;
  height: 60px;
  position: fixed;
  left: 0;
  top: 20px;
  line-height: 60px;

  img {
    width: 12%;
    margin-bottom: 5px;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    color: #ccc;
    opacity: 0;
    transition: all 0.5s;
  }

  &:hover {
    a {
      opacity: 1;
      transition: all 0.5s;
    }
  }
}
</style>
