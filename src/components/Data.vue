<template>
  <div>
    <button @click="loadData">LoadData</button>
    <div v-html="cases"></div>
  </div>
</template>

<script>
import cheerio from "cheerio";
import axios from "axios";
import contagionsData from "../assets/data-lR5wn.csv";

export default {
  name: "Data",
  data() {
    return {
      cases: null,
      contagions: []
    };
  },
  created() {
    const cantons = [
      { name: "Zurich", short: "ZH" },
      { name: "Bern", short: "BE" },
      { name: "Luzern", short: "LU" },
      { name: "Uri", short: "UR" },
      { name: "Schwyz", short: "SZ" },
      { name: "Obwalden", short: "OW" },
      { name: "Nidwalden", short: "NW" },
      { name: "Glarus", short: "GL" },
      { name: "Zug", short: "ZG" },
      { name: "Fribourg", short: "FR" },
      { name: "Solothurn", short: "SO" },
      { name: "Basel City", short: "BS" },
      { name: "Basel Country", short: "BL" },
      { name: "Schaffhausen", short: "SH" },
      { name: "Appenzell Ausserrhoden", short: "AR" },
      { name: "Appenzell Innerrhoden", short: "AI" },
      { name: "Sankt Gallen", short: "SG" },
      { name: "Graubünden", short: "GR" },
      { name: "Aargau", short: "AG" },
      { name: "Thurgau", short: "TG" },
      { name: "Ticino", short: "TI" },
      { name: "Vaud", short: "VD" },
      { name: "Valais", short: "VS" },
      { name: "Neuchâtel", short: "NE" },
      { name: "Geneva", short: "GE" },
      { name: "Jura", short: "JU" }
    ];
    // process data from csv
    contagionsData.forEach(element => {
      this.contagions.push([
        cantons.find(({ name }) => name === element.Titel).short,
        element.Cases
      ]);
    });
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.cases = null;
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/http://datawrapper.dwcdn.net/lR5wn/41/"
        )
        .then(response => {
          const $ = cheerio.load(response.data);
          this.cases = $(".chart-intro");
        });
    }
  }
};
</script>

<style scoped lang="scss"></style>
