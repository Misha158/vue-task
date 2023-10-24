import type { Module } from "vuex";
import { Service } from "@/Service";
import type { TodoItem } from "@/types";
import type { RootState } from "@/store/index";

export interface TodosState {
  todos: TodoItem[];
  todoUserIds: (number | string)[];
  favoriteTodoIds: number[];
  filters: Object;
}

const todosModule: Module<TodosState, RootState> = {
  state: {
    todos: [],
    todoUserIds: ["All users"],
    favoriteTodoIds: JSON.parse(localStorage.getItem("favoriteTodoIds")) || [],
    filters: {},
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
    setGlobalFilters(state, payload) {
      state.filters = payload;
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
    getGlobalFilters(state) {
      return state.filters;
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
          page?: number;
        };
      }
    ) {
      const todos = await Service.getTodos(payload);

      const newTodos = [...state.todos, ...(todos || [])];
      if (payload?.filters?.status === "favorites") {
        commit(
          "setTodos",
          newTodos?.filter((todo) =>
            state.favoriteTodoIds.some((id) => id === todo.id)
          )
        );
        return;
      }

      commit("setTodos", newTodos);
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
