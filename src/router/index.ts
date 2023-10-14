import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../pages/LoginPage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: LoginPage,
    },
  ],
});

export default router;
