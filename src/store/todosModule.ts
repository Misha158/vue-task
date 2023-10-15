import type { Module } from "vuex";
import { Service } from "@/Service";
import type { TodoItem } from "@/types";
import type { RootState } from "@/store/index";

export interface TodosState {
  todos: TodoItem[];
}

const todosModule: Module<TodosState, RootState> = {
  state: {
    todos: [],
  },

  mutations: {
    setTodos(state, payload) {
      state.todos = payload;
    },
  },

  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      const todos = await Service.getTodos();

      commit("setTodos", todos);
    },
  },
};

export default todosModule;
