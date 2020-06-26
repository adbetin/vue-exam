<template>
  <div id="app">
    <ImageSearch />
  </div>
</template>

<script>
import ImageSearch from './components/ImageSearch.vue'

export default {
  name: 'App',
  components: {
    ImageSearch
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
