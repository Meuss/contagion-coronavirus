<template>
  <div class="capita">
    <div class="chart-wrapper" v-if="loaded">
      <apexchart :options="options" :series="series" type="line"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
// import Papa from "papaparse";
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
          position: "back",
          xaxis: [
            {
              x: 17,
              borderColor: "#179E87",
              label: {
                borderColor: "#179E87",
                style: {
                  color: "#fff",
                  background: "#179E87",
                  fontWeight: 700
                },
                text: "Italy quarantine => 09.03"
              }
            },
            {
              x: 19,
              borderColor: "#ef233c",
              label: {
                borderColor: "#ef233c",
                style: {
                  color: "#fff",
                  background: "#ef233c",
                  fontWeight: 700
                },
                text: "Extraordinary situation => 16.03"
              }
            },
            {
              x: 23,
              borderColor: "#ef233c",
              label: {
                borderColor: "#ef233c",
                style: {
                  color: "#fff",
                  background: "#ef233c",
                  fontWeight: 700
                },
                text: "=> 20.03"
              }
            },
            {
              x: 4,
              borderColor: "#ef233c",
              label: {
                borderColor: "#ef233c",
                style: {
                  color: "#fff",
                  background: "#ef233c",
                  fontWeight: 700
                },
                text: "=> 01.03"
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
    prepareData() {
      // Use Techengines data for IT
      // FIX: hard coding data.
      // https://github.com/techengines/coronavirus-stats-italy/blob/master/data/italy/nationwide_it.csv
      const itData = [
        "19", // 21.02
        "76",
        "152",
        "229",
        "322",
        "400",
        "650",
        "888",
        "1128",
        "1694",
        "2036",
        "2502",
        "3089",
        "3858",
        "3916",
        "5061",
        "6387",
        "7985",
        "8514",
        "10590",
        "12839",
        "14955",
        "17750",
        "20603",
        "23073", // 16.03
        "26062",
        "28710",
        "33190",
        "37860",
        "42681",
        "46638",
        "59138",
        "63927",
        "69176"
      ];
      this.italySeries(itData);

      // Use BAG data for CH.

      const swissData = [
        "1", // 25.02
        "2",
        "8",
        "15", // Rassemblements 1000 personnes
        "21",
        "25", // 01.03
        "32",
        "47",
        "80",
        "112",
        "185",
        "267",
        "328",
        "373",
        "470", // 10.03
        "645",
        "850",
        "1125",
        "1353",
        "2200", // 15.03
        "2353", // Situation particulière
        "2650",
        "3028",
        "4281",
        "5702",
        "6828",
        "7661",
        "8772",
        "9896",
        "10247"
      ];
      this.swissSeries(swissData);
      // load chart
      this.loaded = true;
    },
    italySeries(x) {
      const it = [{}];
      it[0].id = "Italy";
      it[0].cases = x;
      const mapIT = it[0].cases.map(e =>
        this.perMillion(e, this.population.Italy)
      );
      const filteredMapIT = mapIT.filter(e => e > 0.91);
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
      const filteredMapCH = mapCH.filter(e => e > 0.91);
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
    this.prepareData();
  }
};
</script>
