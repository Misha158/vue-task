import Vue from "vue";
import Vuex from "vuex";
import authModule from "./authModule";
import type { AuthState } from "./authModule";

Vue.use(Vuex);

export interface RootState {
  auth: AuthState;
}

export default new Vuex.Store({
  modules: {
    authModule,
  },
});
