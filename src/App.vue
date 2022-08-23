<template>
  <div id="app">
    <BaseLayout v-if="isAuthenticated" />
    <LoginLayout v-else />
  </div>
</template>
<script>
import BaseLayout from './layouts/BaseLayout.vue'
import LoginLayout from "./layouts/LoginLayout.vue";
import {mapState} from 'vuex'

export default {
  name:'App',
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  components: {
    LoginLayout,
    BaseLayout
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  margin: 0;
}
</style>
