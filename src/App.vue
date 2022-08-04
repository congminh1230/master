<template>
  <div id="app">
    <!-- <router-view/> -->
    <BaseLayout/> 
  </div>
</template>
<script>
import BaseLayout from './layouts/BaseLayout.vue'
export default {
  name:'App',
  data() {
    return {

    }
  },
  components: {
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
