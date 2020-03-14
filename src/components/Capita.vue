<template>
  <div class="capita">
    <div class="chart-wrapper" v-if="loaded">
      <apexchart :options="options" :series="series" type="line"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Papa from "papaparse";
export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      rawData: [],
      loaded: false,
      papaConfig: {
        header: true
      },
      population: {
        Switzerland: 8654622,
        Italy: 60461826
      },
      options: {
        chart: {
          id: "comparison",
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          background: "#fff",
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
              x: 10,
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
        colors: ["#ef233c", "#179E87"],
        xaxis: {
          type: "category",
          categories: [],
          title: {
            text: "Days",
            style: {
              fontSize: 17
            }
          }
        },
        yaxis: {
          title: {
            text: "Cases (per 1M inhabitans)",
            style: {
              fontSize: 17
            }
          },
          decimalsInFloat: 0
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                id: "comparison",
                fontFamily: "Avenir, Helvetica, Arial, sans-serif",
                background: "#fff",
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                },
                height: "400px"
              },
              annotations: {
                xaxis: []
              },
              xaxis: {
                title: {
                  style: {
                    fontSize: 12
                  }
                }
              },
              yaxis: {
                title: {
                  text: "Cases (per 1M)",
                  style: {
                    fontSize: 12
                  }
                },
                decimalsInFloat: 0
              }
            }
          }
        ]
      },
      series: [
        {
          name: "Switzerland",
          data: []
        },
        {
          name: "Italy",
          data: []
        }
      ]
    };
  },
  methods: {
    getData() {
      fetch(
        "https://raw.githubusercontent.com/techengines/coronavirus-stats-italy/master/data/italy/nationwide_it.csv"
      )
        .then(response => response.text())
        .then(text => {
          this.prepareData(text);
        });
    },
    prepareData(ITdata) {
      // Use Techengines data for IT
      this.italySeries(ITdata);
      // Use BAG data for CH.
      const swissData = [
        "1",
        "2",
        "8",
        "15",
        "21",
        "25",
        "32",
        "47",
        "80",
        "112",
        "185",
        "267",
        "328",
        "373",
        "470",
        "645",
        "850",
        "1125",
        "1353"
      ];
      this.swissSeries(swissData);
      // load chart
      this.loaded = true;
    },
    italySeries(x) {
      // ITALY DATA
      const italy_data = Papa.parse(x, this.papaConfig);
      // some array cardio
      const italy_ordered = italy_data.data.reverse();
      italy_ordered.shift();
      const italy_array = [];
      italy_ordered.forEach(e => {
        italy_array.push(e.positive.replace(".0", ""));
      });
      const it = [{}];
      it[0].id = "Italy";
      it[0].cases = italy_array;
      const mapIT = it[0].cases.map(e =>
        this.perMillion(e, this.population.Italy)
      );
      const filteredMapIT = mapIT.filter(e => e > 1);
      this.createSeries(filteredMapIT, 1);
    },
    swissSeries(x) {
      // SWISS DATA
      const ch = [{}];
      ch[0].id = "Switzerland";
      ch[0].cases = x;
      const mapCH = ch[0].cases.map(e =>
        this.perMillion(e, this.population.Switzerland)
      );
      const filteredMapCH = mapCH.filter(e => e > 1);
      filteredMapCH.push(null, null, null, null, null); // to have the same length of Italy, so that tooltip shows both numbers
      this.createSeries(filteredMapCH, 0);
    },
    createSeries(data, index) {
      const series = [];
      data.forEach(e => series.push(e));
      this.series[index].data = series;
    },
    perMillion(x, population) {
      const modified = ((x / population) * 1000000).toFixed(2);
      return modified;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
  max-width: 700px;
  margin: 0 auto;
}
</style>
