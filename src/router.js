import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home.vue";
import Account from "@/pages/Account.vue";

Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
  switch (to.name) {
    case "home":
      if (
        localStorage.getItem("user") &&
        localStorage.getItem("authorization")
      ) {
        next("/minhaconta");
      }
      break;
    case "account":
      if (
        !localStorage.getItem("user") ||
        !localStorage.getItem("authorization")
      ) {
        next("/");
      }
      break;
  }

  next();
});

export default router;
