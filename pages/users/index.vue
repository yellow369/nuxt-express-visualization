<template>
  <section class="container">
    <div>
      <Logo />
      <h1 class="title">
        USERS
      </h1>
      <ul class="users">

      </ul>
      <h1>{{num}}</h1>
      <button>12121</button>
      <nuxt-link class="button" to="/">
        Homepage
      </nuxt-link>
    </div>
  </section>
</template>

<script>

export default {
  async asyncData(context) {
    // const data = await $http.$get('/api/users')
    let num = 1
    let user = await context.$axios.get('users')
    return { num: user.data[0].name }
  },
  head() {
    return {
      title: 'Users'
    }
  },

}
</script>

<style scoped >
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  margin: 30px 0;
}

.users {
  list-style: none;
  margin: 0;
  padding: 0;
}

.user {
  margin: 10px 0;
}

.button {
  display: inline-block;
  margin-top: 50px;
}
</style>
