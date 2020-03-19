<template>
  <div>
    <p class="active">
      Cases:
      <strong>{{ totalCases }}</strong>
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
        tick-size="4"
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
      maxTicks: 10,
      maxTicksMobile: 7,
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
    fetch(
      "https://spreadsheets.google.com/feeds/list/1MV3AsNadM-Uuf5nh-5JBMj3UHcBhDKH7oZ6B5Rornt8/1/public/values?alt=json"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
    if (window.innerWidth < 601) {
      this.currentDate = this.maxTicksMobile - 1;
      this.setSliderDates(
        new Date(2020, 1, 25),
        new Date(),
        this.maxTicksMobile
      );
    } else {
      this.currentDate = this.maxTicks - 1;
      this.setSliderDates(new Date(2020, 1, 25), new Date(), this.maxTicks);
    }
    const todayDate = moment(new Date()).format("MMDD");
    this.loadData(`data_${todayDate}`);
    this.loadChartData();
  },
  methods: {
    // prepare data for the Chart component
    loadChartData() {
      // let day = 0;
      Object.entries(this.data.days).forEach(([key, val]) => {
        const obj = {};
        const keyString = [
          key.replace("data_", "").slice(2, 4),
          key.replace("data_", "").slice(0, 2)
        ].join(".");
        obj["date"] = keyString;
        let dayTotal = 0;
        if (key === "data_0307") {
          dayTotal = 267;
        } else if (key === "data_0315") {
          dayTotal = 2200;
        } else if (key === "data_0316") {
          dayTotal = 2353;
        } else if (key === "data_0317") {
          dayTotal = 2650;
        } else if (key === "data_0318") {
          dayTotal = 3028;
        } else if (key === "data_0319") {
          dayTotal = 3888;
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
        if (x === "data_0315") {
          this.contagions.forEach(element => {
            this.totalCases = 2217;
            this.totalDeaths += element["deaths"];
          });
        } else if (x === "data_0316") {
          this.contagions.forEach(element => {
            this.totalCases = 2353;
            this.totalDeaths += element["deaths"];
          });
        } else if (x === "data_0317") {
          this.contagions.forEach(element => {
            this.totalCases = 2650;
            this.totalDeaths += element["deaths"];
          });
        } else if (x === "data_0318") {
          this.contagions.forEach(element => {
            this.totalCases = 3028;
            this.totalDeaths += element["deaths"];
          });
        } else if (x === "data_0319") {
          this.contagions.forEach(element => {
            this.totalCases = 3888;
            this.totalDeaths += element["deaths"];
          });
        } else {
          this.contagions.forEach(element => {
            this.totalCases += element["cases"];
            this.totalDeaths += element["deaths"];
          });
        }
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

      let day = fromDate;

      const addDay = day => {
        this.sliderDates.push(day);
        this.sliderDatesFromatted.push(day.format("DD.MM"));
      };

      for (let i = 0; i < maxSteps - 1; i++) {
        day = day.clone().add(perfectIncrement, "d");
        addDay(day);
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
  flex-direction: column;
  margin-top: 13px;
  p {
    margin-bottom: 0px;
  }
  @media (max-width: 600px) {
    > div {
      width: 100%;
    }
  }
  @media (max-width: 500px) {
    align-items: flex-start;
    > div {
      font-size: 12px;
    }
  }
}
</style>
