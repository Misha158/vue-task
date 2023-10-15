import type { Module } from "vuex";
import { Service } from "@/Service";
import type { TodoItem } from "@/types";
import type { RootState } from "@/store/index";

export interface TodosState {
  todos: TodoItem[];
  todoUserIds: (number | string)[];
  favoriteTodoIds: number[];
}

const todosModule: Module<TodosState, RootState> = {
  state: {
    todos: [],
    todoUserIds: ["All users"],
    favoriteTodoIds:
      JSON.parse(localStorage.getItem("favoriteTodoIds") || "") || [],
  },

  mutations: {
    setTodos(state, payload: TodoItem[]) {
      state.todos = payload;
    },
    setTodoIds(state, payload: (number | string)[]) {
      state.todoUserIds = payload;
    },
    setFavoriteTodoIds(
      state,
      payload: {
        id: number;
        shouldRemoveFromFavorite: boolean;
      }
    ) {
      if (payload.shouldRemoveFromFavorite) {
        const newFavoriteIds = state.favoriteTodoIds.filter(
          (todoId) => todoId !== payload.id
        );
        state.favoriteTodoIds = newFavoriteIds;
        localStorage.setItem("favoriteTodoIds", JSON.stringify(newFavoriteIds));
        return;
      }
      localStorage.setItem(
        "favoriteTodoIds",
        JSON.stringify([...state.favoriteTodoIds, payload.id])
      );
      state.favoriteTodoIds = [...state.favoriteTodoIds, payload.id];
    },
  },

  getters: {
    getTodos(state) {
      return state.todos;
    },
    getTodoUserIds(state) {
      return state.todoUserIds;
    },
    getFavoriteTodoIds(state) {
      return state.favoriteTodoIds;
    },
  },
  actions: {
    async fetchTodos(
      { state, commit },
      payload: {
        filters?: {
          status?: string;
          userId?: string;
          title?: string;
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
    async createNewTodo(
      { state, commit },
      payload: {
        title: string;
        userId: number;
        completed: boolean;
      }
    ) {
      const newTodo = await Service.createTodo(payload);
      state.todos = [
        {
          id: newTodo.id,
          userId: newTodo.data.userId,
          title: newTodo.data.title,
          completed: newTodo.data.completed,
        },
        ...state.todos,
      ];
    },
  },
};

export default todosModule;
