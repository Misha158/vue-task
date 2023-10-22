import type { Module } from "vuex";
import router from "@/router";
import { Service } from "@/Service";
import type { User } from "@/types";
import type { RootState } from "@/store/index";

export interface AuthState {
  loginError: boolean;
  userInfo: User;
}

const authModule: Module<AuthState, RootState> = {
  state: {
    loginError: false,
    userInfo: {} as User,
  },

  mutations: {
    setLoginError(state, payload) {
      state.loginError = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },

  getters: {
    getUserInfo(state) {
      return Object.keys(state.userInfo).length
        ? state.userInfo
        : {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          };
    },
    getLoginError(state) {
      return state.loginError;
    },
  },
  actions: {
    async onLogin({ commit }, payload) {
      const users = await Service.getUsers();

      if (!users?.length) {
        commit("setLoginError", true);
        return;
      }

      const authUserInfo = users.find(
        ({ username, phone }) =>
          username.toLowerCase() === payload.username.toLowerCase() &&
          phone.toLowerCase() === payload.phone.toLowerCase()
      );

      if (!authUserInfo) {
        commit("setLoginError", true);
        return;
      }

      commit("setUserInfo", authUserInfo);
      localStorage.setItem("auth", "true");
      router.push("/profile");
    },
  },
};

export default authModule;
