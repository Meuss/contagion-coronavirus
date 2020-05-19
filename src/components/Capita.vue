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
          position: "front",
          xaxis: [
            // {
            //   x: 17,
            //   borderColor: "#179E87",
            //   label: {
            //     borderColor: "#179E87",
            //     style: {
            //       color: "#fff",
            //       background: "#179E87",
            //       fontWeight: 700
            //     },
            //     text: "Italy quarantine => 09.03"
            //   }
            // },
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
                text: "CH lockdown 16.03"
              }
            },
            {
              x: 65,
              borderColor: "#ef233c",
              label: {
                borderColor: "#ef233c",
                style: {
                  color: "#fff",
                  background: "#ef233c",
                  fontWeight: 700
                },
                text: "01.05"
              }
            },
            {
              x: 35,
              borderColor: "#ef233c",
              label: {
                borderColor: "#ef233c",
                style: {
                  color: "#fff",
                  background: "#ef233c",
                  fontWeight: 700
                },
                text: "01.04"
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
                text: "01.03"
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
        "74386", // 25.03
        "80539",
        "86498",
        "92472",
        "97689",
        "101739",
        "105792",
        "110574", // 01.04
        "115242",
        "119827",
        "124632",
        "128948",
        "132547",
        "135586",
        "139422",
        "143626",
        "147577", // 10.04
        "152271",
        "156363",
        "159516",
        "162488",
        "165155",
        "168941",
        "172434",
        "175925",
        "178972",
        "181228", // 20.04
        "183957",
        "187327",
        "189973",
        "192994",
        "195351",
        "197675",
        "199414",
        "201505",
        "203591",
        "205463",
        "207428", // 01.05
        "209328",
        "210717",
        "211938",
        "213013",
        "214457",
        "215858",
        "217185",
        "218268",
        "219070",
        "219814",
        "221216",
        "222104",
        "223096",
        "223885",
        "224760",
        "225435",
        "225886"
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
        "10907", // 25.03
        "11805",
        "12934",
        "14439",
        "15922",
        "16605",
        "17198",
        "17768", // 01.04
        "18551",
        "19706",
        "20773",
        "21115",
        "21637",
        "22293",
        "23280",
        "23798",
        "24549", // 10.04
        "25226",
        "25618",
        "25688",
        "25957",
        "26267",
        "26588",
        "27033",
        "27333",
        "27469",
        "27724", // 20.04
        "27815",
        "28079",
        "28281",
        "28496",
        "28623",
        "28684",
        "28904",
        "29010",
        "29144",
        "29318",
        "29536", // 01.05
        "29607",
        "29647",
        "29773",
        "29821",
        "29893",
        "29961",
        "30043",
        "30072",
        "30093",
        "30176",
        "30344",
        "30372",
        "30402",
        "30428",
        "30453",
        "30464",
        "30552"
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
