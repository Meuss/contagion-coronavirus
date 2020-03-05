<template>
  <div class="chart-wrapper">
    <apexchart type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  props: ["chartcontagions"],
  data() {
    return {
      options: {
        chart: {
          id: "total-cases",
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        colors: ["#ef233c"],
        xaxis: {
          categories: ["1", "asdf", "234"]
        },
        yaxis: {
          title: {
            text: "COVID-19 Cases"
          }
        }
      },
      series: [
        {
          name: "Total cases",
          data: []
        }
      ]
    };
  },
  created() {
    const days = [];
    this.chartcontagions.forEach(function(element) {
      days.push(element.date);
    });
    this.options.xaxis.categories = days;
    const arrayTotals = [];
    this.chartcontagions.forEach(function(element) {
      arrayTotals.push(element.total);
    });
    this.series[0].data = arrayTotals;
  },
  components: {
    apexchart: VueApexCharts
  }
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
  max-width: 500px;
  margin: 0 auto;
}
</style>
