<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './public/css/reset.css';
@import './public/css/common.css';
#app {
  width:100%;
  height:100%;
}
</style>
