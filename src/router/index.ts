import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

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
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    },
  ],
});

export default router;
