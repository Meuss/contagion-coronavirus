<template>
  <div>
    <p class="active">
      Cases:
      <strong>{{ totalCases }}</strong>
    </p>
    <div class="choose-date">
      <p>Date:</p>
      <Datepicker
        :disabled-dates="disabledDates"
        :format="customFormatter"
        @selected="changeDate"
        monday-first
      />
    </div>
    <SvgElement :contagions="contagions" :totalcases="totalCases" />
    <Chart :chartcontagions="chartcontagions" />
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import data from "../assets/data.js";
import SvgElement from "./SvgElement.vue";
import Chart from "./Chart.vue";
export default {
  name: "Data",
  components: {
    SvgElement,
    Chart,
    Datepicker
  },
  data() {
    return {
      disabledDates: {
        to: new Date(2020, 1, 25), // Disable all dates up to specific date
        // from: new Date() // Disable all dates after specific date
        from: new Date() // Disable all dates after specific date
      },
      data,
      contagions: [],
      chartcontagions: [],
      totalCases: 0,
      cantons: [
        { name: "Zurich", short: "ZH" },
        { name: "Bern", short: "BE" },
        { name: "Lucerne", short: "LU" },
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
    this.loadData(`data_${moment(new Date()).format("MMDD")}`);
    this.loadChartData();
  },
  methods: {
    // prepare data for the Chart component
    loadChartData() {
      Object.entries(this.data.days).forEach(([key, val]) => {
        const obj = {};
        // format the dates
        const dateString = [
          key.replace("data_", "").slice(2, 4),
          ".",
          key.replace("data_", "").slice(0, 2)
        ].join("");
        obj["date"] = dateString;
        // prepare the totals
        let dayTotal = 0;
        val.forEach(function(element) {
          dayTotal += element["Cases"];
        });
        obj["total"] = dayTotal;
        // push dates + totals
        this.chartcontagions.push(obj);
      });
    },
    loadData(x) {
      this.totalCases = 0;
      this.contagions = [];
      // process data from csv, create an array of cases objects per canton
      if (this.data.days[x] !== undefined) {
        this.data.days[x].forEach(element => {
          const obj = {};
          obj["name"] = this.cantons.find(
            ({ name }) => name === element.Titel
          ).short;
          obj["cases"] = element.Cases;
          obj["deaths"] = element.Deaths;
          this.contagions.push(obj);
        });
        // total cases
        this.contagions.forEach(element => {
          this.totalCases += element["cases"];
        });
      } else {
        // unavailable: get last day with data
        let i = 0;
        Object.entries(this.data.days).forEach(([key]) => {
          const keyString = [
            key.replace("data_", "").slice(0, 2),
            key.replace("data_", "").slice(2, 4)
          ].join("");
          if (i < parseInt(keyString)) {
            i = keyString;
          }
        });
        this.loadData(`data_${i}`);
      }
    },
    customFormatter(date) {
      return moment(date).format("DD.MM.YYYY");
    },
    changeDate(x) {
      this.loadData(`data_${moment(x).format("MMDD")}`);
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  font-size: 1.4em;
  margin-bottom: 0;
  margin-top: 0;
  strong {
    font-size: 1.6em;
    color: #ef233c;
  }
}
.choose-date {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
