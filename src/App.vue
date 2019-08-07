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
@import 'public/css/common';
#app {
  width:3840px;
  height:1080px;
    overflow: hidden;
}
</style>
