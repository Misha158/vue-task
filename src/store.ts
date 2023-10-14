import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0, // Example state property
    // Add other state properties here
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    // Add other mutations here
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    // Add other actions here
  },
  getters: {
    getCount: (state) => {
      return state.count;
    },
    // Add other getters here
  },
});

export default store;
