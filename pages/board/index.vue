<template>
  <div class="board">
    <Banner></Banner>
    <Security></Security>
  </div>
</template>

<script>
import Banner from '@/components/banner.vue'
import Security from '@/components/security.vue'

export default {
    async asyncData(context) {
        // const data = await $http.$get('/api/users')
        let num = 1;
        let user = await context.$axios.get("users");
        return { num: user.data[0].name };
    },
    head() {
        return {
            title: "数据看板"
        };
    },
    components: { Banner, Security }
}
</script>

<style scoped lang="scss">
@import '../../assets/function.scss';
.board {
  min-height: 100vh;
  min-width: 100vh;
  background-color: #132235;
}

.el-button {
  width: px2vw(200px);
  height: px2vw(80px);
}

</style>
