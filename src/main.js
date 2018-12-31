import Vue from "vue";
import axios from "axios";
import Buefy from "buefy";

import App from "./App.vue";
import router from "./router";

import "@/assets/styles/main.scss";

Vue.use(Buefy);

const token = localStorage.getItem("authorization");

Vue.prototype.$http = axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000",
  headers: {
  	"Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": token ? `Bearer ${localStorage.token}` : ""
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
