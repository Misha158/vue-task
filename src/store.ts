import Vue from "vue";
import Vuex from "vuex";
import { Service } from "@/Service";
import router from "./router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginError: false,
  },
  mutations: {
    async onLogin(state, credentials: { username: string; phone: string }) {
      const users = await Service.getUsers();

      if (!users?.length) {
        state.loginError = true;
        return;
      }

      const isAuth = users.find(
        ({ username, phone }) =>
          username === credentials.username && phone === credentials.phone
      );

      if (!isAuth) {
        state.loginError = true;
        return;
      }

      router.push("/profile");
    },
  },
});

export default store;
