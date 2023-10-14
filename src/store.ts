import Vue from "vue";
import Vuex from "vuex";
import { Service } from "@/Service";
import router from "./router";

Vue.use(Vuex);

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const store = new Vuex.Store({
  state: {
    loginError: false,
    userInfo: {} as User,
  },
  mutations: {
    async onLogin(state, credentials: { username: string; phone: string }) {
      const users = await Service.getUsers();

      if (!users?.length) {
        state.loginError = true;
        return;
      }

      const authUserInfo = users.find(
        ({ username, phone }) =>
          username === credentials.username && phone === credentials.phone
      );

      if (!authUserInfo) {
        state.loginError = true;
        return;
      }

      state.userInfo = authUserInfo;
      router.push("/profile");
    },
  },
});

export default store;
