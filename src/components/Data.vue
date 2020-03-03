<template>
  <div>
    <button @click="loadData">LoadData</button>
    <div v-html="cases"></div>
  </div>
</template>

<script>
import cheerio from "cheerio";
import axios from "axios";

export default {
  name: "Data",
  data() {
    return {
      cases: null
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/http://datawrapper.dwcdn.net/lR5wn/40/"
        )
        .then(response => {
          const $ = cheerio.load(response.data);
          this.cases = $(".chart-intro");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
