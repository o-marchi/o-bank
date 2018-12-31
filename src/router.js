import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home.vue";
import Account from "@/pages/Account.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/minhaconta",
      name: "account",
      component: Account
    }
  ]
});
