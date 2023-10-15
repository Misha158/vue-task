import Vue from "vue";
import Vuex from "vuex";
import authModule from "./authModule";
import todosModule from "./todosModule";

import type { AuthState } from "./authModule";
import type { TodosState } from "./todosModule";

Vue.use(Vuex);

export interface RootState {
  authModule: AuthState;
  todosModule: TodosState;
}

export default new Vuex.Store({
  modules: {
    authModule,
    todosModule,
  },
});
