<template>
  <div>
    <p class="active">
      Active cases: <strong>{{ totalCases }}</strong>
    </p>
    <SvgElement :contagions="contagions" :totalCases="totalCases" />
  </div>
</template>

<script>
import contagionsData from "../assets/data-lR5wn.csv";
import SvgElement from "./SvgElement.vue";
export default {
  name: "Data",
  components: {
    SvgElement
  },
  data() {
    return {
      contagions: [],
      totalCases: 0,
      cantons: [
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
        { name: "St. Gallen", short: "SG" },
        { name: "Graubünden", short: "GR" },
        { name: "Aargau", short: "AG" },
        { name: "Thurgau", short: "TG" },
        { name: "Ticino", short: "TI" },
        { name: "Vaud", short: "VD" },
        { name: "Valais", short: "VS" },
        { name: "Neuchâtel", short: "NE" },
        { name: "Geneva", short: "GE" },
        { name: "Jura", short: "JU" }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.totalCases = 0;
      this.contagions = [];
      // process data from csv, create an array of cases objects per canton
      contagionsData.forEach(element => {
        const obj = {};
        obj["name"] = this.cantons.find(
          ({ name }) => name === element.Titel
        ).short;
        obj["cases"] = element.Cases;
        this.contagions.push(obj);
      });
      // total cases
      this.contagions.forEach(element => {
        this.totalCases += element["cases"];
      });
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  font-size: 1.6em;
  strong {
    color: #ef233c;
  }
}
</style>
