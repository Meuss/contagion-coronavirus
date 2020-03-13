<template>
  <div class="capita">
    <div class="chart-wrapper" v-if="loaded">
      <apexchart type="line" :options="options" :series="series"></apexchart>
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
      papaConfig: {},
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
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv"
      )
        .then(response => response.text())
        .then(text => {
          this.prepareData(text);
        });
    },
    prepareData(data) {
      // get all data
      const allData = Papa.parse(data, this.papaConfig);
      // get swiss data
      const rawSwitzerland = allData.data.find(
        country => country[1] === "Switzerland"
      );
      // remove useless swiss data
      const Switzerland = rawSwitzerland
        .filter(a => a != "0")
        .filter(b => b != "Switzerland")
        .filter(c => c != "46.8182")
        .filter(d => d != "8.2275")
        .filter(e => e != "");
      // create swiss object
      const swissobject = {
        id: "Switzerland",
        cases: Switzerland
      };
      // get italy data
      const rawItaly = allData.data.find(country => country[1] === "Italy");
      // remove useless italy data
      const Italy = rawItaly
        .filter(a => a != "0")
        .filter(b => b != "Italy")
        .filter(c => c != "43")
        .filter(d => d != "12")
        .filter(e => e != "");
      // create italy object
      const italyobject = {
        id: "Italy",
        cases: Italy
      };
      this.rawData.push(swissobject, italyobject);
      this.prepareSeries();
    },
    perMillion(x, population) {
      const modified = ((x / population) * 1000000).toFixed(2);
      return modified;
    },
    prepareSeries() {
      const ch = this.rawData.filter(obj => {
        return obj.id === "Switzerland";
      });
      const mapCH = ch[0].cases.map(e =>
        this.perMillion(e, this.population.Switzerland)
      );
      this.compareLastElement(mapCH);

      // TODO: missing infos for the last two days...
      mapCH.push(this.perMillion(867, this.population.Switzerland));
      mapCH.push(this.perMillion(1125, this.population.Switzerland));

      const filteredMapCH = mapCH.filter(e => e > 1);
      this.series[0].data = filteredMapCH;

      const it = this.rawData.filter(obj => {
        return obj.id === "Italy";
      });
      const mapIT = it[0].cases.map(e =>
        this.perMillion(e, this.population.Italy)
      );
      this.compareLastElement(mapIT);
      const filteredMapIT = mapIT.filter(e => e > 1);
      this.series[1].data = filteredMapIT;
      this.loaded = true;
    },
    compareLastElement(arr) {
      if (arr[arr.length - 1] === arr[arr.length - 2]) {
        arr.pop();
      }
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
