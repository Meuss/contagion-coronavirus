<template>
  <div>
    <p class="active">
      Cases:
      <strong v-if="totalCases < 375">{{ totalCases }}</strong>
      <!-- after automatic testing stopped -->
      <strong v-else>{{ totalCases }}+</strong>
    </p>
    <p class="active">
      Deaths:
      <strong v-if="isNaN(totalDeaths)">0</strong>
      <strong v-else>{{ totalDeaths }}</strong>
    </p>
    <div class="choose-date">
      <p>Date:</p>
      <v-slider
        v-model="selectedDate"
        :tick-labels="sliderDatesFromatted"
        :max="sliderDates.length - 1"
        ticks="always"
      ></v-slider>
    </div>
    <SvgElement :contagions="contagions" :totalcases="totalCases" />
    <Chart :chartcontagions="chartcontagions" />
  </div>
</template>

<script>
import moment from "moment";
import data from "../assets/data.js";
import SvgElement from "./SvgElement.vue";
import Chart from "./Chart.vue";
export default {
  name: "Data",
  components: {
    SvgElement,
    Chart
  },
  data() {
    return {
      disabledDates: {
        to: new Date(2020, 1, 25),
        from: new Date()
      },
      data,
      today: new Date(),
      contagions: [],
      chartcontagions: [],
      totalCases: 0,
      totalDeaths: 0,
      value: 0,
      fruits: 0,
      sliderDates: [],
      sliderDatesFromatted: [],
      maxTicks: 7,
      currentDate: 0,
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
  computed: {
    selectedDate: {
      get() {
        return this.currentDate;
      },
      set(value) {
        this.currentDate = value;
        this.changeDate();
      }
    }
  },
  created() {
    this.currentDate = this.maxTicks - 1;
    this.setSliderDates(new Date(2020, 1, 25), new Date(), this.maxTicks);
    this.loadData(`data_${moment(new Date()).format("MMDD")}`);
    this.loadChartData();
  },
  methods: {
    // prepare data for the Chart component
    loadChartData() {
      let day = 0;
      Object.entries(this.data.days).forEach(([key, val]) => {
        const obj = {};
        if (key === "data_0225") {
          obj["date"] = "25.02";
        } else {
          obj["date"] = `+${day}`;
        }
        day++;
        // prepare the totals
        let dayTotal = 0;
        if (key === "data_0307") {
          dayTotal = 267;
        } else {
          val.forEach(function(element) {
            dayTotal += element["Cases"];
          });
        }
        obj["total"] = dayTotal;
        // push dates + totals
        this.chartcontagions.push(obj);
      });
    },
    loadData(x) {
      this.totalCases = 0;
      this.totalDeaths = 0;
      this.contagions = [];
      // process data from csvs, create an array of cases objects per canton
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
        this.contagions.forEach(element => {
          this.totalCases += element["cases"];
          this.totalDeaths += element["deaths"];
        });
      } else {
        // unavailable: day not imported yet
        // => get last day with data
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
    changeDate() {
      this.previousSelectedDate = this.selectedDate;
      this.loadData(
        `data_${this.sliderDates[this.selectedDate].format("MMDD")}`
      );
    },
    setSliderDates(from, to, maxSteps) {
      const fromDate = moment(from);
      const toDate = moment(to);
      const daysBetweenDays = toDate.diff(fromDate, "days");
      const perfectIncrement = Math.floor(daysBetweenDays / (maxSteps - 1));
      console.log(daysBetweenDays, perfectIncrement);

      let day = fromDate;

      const addDay = day => {
        this.sliderDates.push(day);
        this.sliderDatesFromatted.push(day.format("DD.MM"));
      };

      for (let i = 0; i < maxSteps - 1; i++) {
        addDay(day);
        day = day.clone().add(perfectIncrement, "d");
      }

      addDay(toDate);
    }
  }
};
</script>

<style scoped lang="scss">
.active {
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
  @media (max-width: 500px) {
    justify-content: flex-start;
  }
}
</style>
