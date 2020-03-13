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
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: "400px"
              }
            }
          }
        ]
      },
      series: [
        {
          name: "Infected",
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
  max-width: 700px;
  margin: 0 auto;
}
</style>
