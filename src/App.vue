<template>
  <div id="app">
    <h1>Coronavirus cases in Switzerland</h1>
    <Data />
    <SvgElement />
    <div>Source: FOPH</div>
  </div>
</template>

<script>
import Data from "./components/Data.vue";
import SvgElement from "./components/SvgElement.vue";

export default {
  name: "App",
  components: {
    Data,
    SvgElement
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  margin: 40px 0 0;
}
</style>
