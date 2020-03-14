import Vue from "vue";
import VTooltip from "v-tooltip";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";

Vue.use(Vuetify);

Vue.config.productionTip = false;
Vue.use(VTooltip);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
