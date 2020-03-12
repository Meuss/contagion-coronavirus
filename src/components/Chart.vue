<template>
  <div class="chart-wrapper">
    <apexchart type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
// import moment from "moment";
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
        annotations: {
          xaxis: [
            {
              x: "+13",
              borderColor: "#ef233c",
              label: {
                borderColor: "#ef233c",
                style: {
                  color: "#fff",
                  background: "#ef233c",
                  fontWeight: 700
                },
                text: "Testing stopped"
              }
            }
          ]
        },
        dataLabels: {
          // enabled: true
        },
        colors: ["#ef233c", "#00ffff"],
        xaxis: {
          type: "category",
          categories: [],
          title: {
            text: "Days since first case"
          }
        },
        yaxis: {
          title: {
            text: "Total COVID-19 Cases in Switzerland"
          }
        }
      },
      series: [
        {
          name: "Infected",
          data: []
        }
        // {
        //   name: "Italy",
        //   data: [3, 3, 3, 3, 4, 21, 79, 157, 229, 323, 470, 655, 889, 1128]
        // }
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
  max-width: 700px;
  margin: 0 auto;
}
</style>
