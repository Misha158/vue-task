import type { Module } from "vuex";
import { Service } from "@/Service";
import type { TodoItem } from "@/types";
import type { RootState } from "@/store/index";

export interface TodosState {
  todos: TodoItem[];
  todoUserIds: (number | string)[];
}

const todosModule: Module<TodosState, RootState> = {
  state: {
    todos: [],
    todoUserIds: ["All users"],
  },

  mutations: {
    setTodos(state, payload) {
      state.todos = payload;
    },
    setTodoIds(state, payload) {
      state.todoUserIds = payload;
    },
  },

  getters: {
    getTodos(state) {
      return state.todos;
    },
    getTodoUserIds(state) {
      return state.todoUserIds;
    },
  },
  actions: {
    async fetchTodos(
      { state, commit },
      payload: {
        filters?: {
          status?: string;
          userId?: string;
        };
      }
    ) {
      const todos = await Service.getTodos(payload);

      commit("setTodos", todos);
      if (state.todoUserIds.length === 1) {
        const userIds = todos?.map((todo) => todo.userId);
        const finalUserIds = ["All users", ...new Set(userIds)];

        commit("setTodoIds", finalUserIds);
      }
    },
  },
};

export default todosModule;
