<template>
  <div id="app">
    <h2>Contagion</h2>
    <h1>Coronavirus in Switzerland</h1>
    <Data />
    <div>Source: FOPH</div>
  </div>
</template>

<script>
import Data from "./components/Data.vue";

export default {
  name: "App",
  components: {
    Data
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  min-height: 100%;
  background-color: #edf2f4;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b2d42;
  padding-top: 60px;
}
</style>
