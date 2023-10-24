import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import ForbiddenPage from "../pages/ForbiddenPage.vue";
import ProfilePageInfinityScroll from "@/pages/ProfilePageInfinityScroll.vue";

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
      component: ProfilePageInfinityScroll,
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: ForbiddenPage,
    },
  ],
});

const checkIsAuthorized = () => {
  const isAuth = localStorage.getItem("auth");

  return isAuth === "true";
};

router.beforeEach((to, from, next) => {
  if (to.name !== "forbidden" && to.name !== "home" && !checkIsAuthorized()) {
    return next({ name: "forbidden" });
  } else next();
});

export default router;
