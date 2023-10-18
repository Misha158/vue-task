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
      return state.userInfo;
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
