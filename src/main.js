import Vue from "vue";
import Axios from "axios";
import VueTheMask from 'vue-the-mask';
import VMoney from 'v-money';
import Buefy from "buefy";

import App from "./App.vue";
import router from "./router";

import "@/assets/styles/main.scss";

Vue.use(VueTheMask);
Vue.use(VMoney, {precision: 4});
Vue.use(Buefy);

const authorization = localStorage.getItem("authorization");

Vue.prototype.$http = Axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: authorization
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
