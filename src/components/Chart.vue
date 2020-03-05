<template>
  <div class="chart-wrapper">
    <apexchart
      width="400"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
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
          id: "vuechart-example",
          toolbar: {
            show: false
          }
        },
        colors: ["#ef233c"],
        xaxis: {
          categories: ["1", "asdf", "234"]
        },
        yaxis: {
          title: {
            text: "Coronavirus Cases"
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
    console.log(this.options.xaxis.categories);
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
  display: flex;
  justify-content: center;
}
</style>
