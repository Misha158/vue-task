<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";
import type { TodoItem } from "@/types";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "TodoList",
  props: {
    todos: {
      required: true,
      type: Array as PropType<TodoItem[]>,
    },
  },
  methods: {
    ...mapMutations(["setFavoriteTodoIds"]),
    convertStatus(status: string) {
      if (!status) return "Uncompleted";
      if (status) return "Completed";
      if (status === "favorite") return "Favorite";
    },
    saveFavoriteTodoIds(id: number, shouldRemoveFromFavorite: boolean) {
      this.setFavoriteTodoIds({ id, shouldRemoveFromFavorite });
    },
  },
});
</script>

<template>
  <div class="todo-list">
    <h2 class="todo-list__title">Todolist</h2>
    <ul class="list">
      <li v-for="todo in todos" :key="todo.id" class="list-item">
        <div class="todo-info">
          <p><strong>Todo id:</strong> {{ todo.id }}</p>
          <p><strong>User id:</strong> {{ todo.userId }}</p>
          <p><strong>Status:</strong> {{ convertStatus(todo.completed) }}</p>
          <p>
            <strong>Favorite:</strong>
            {{ $store.getters.getFavoriteTodoIds?.includes(todo.id) }}
          </p>
          <span :class="{ completed: todo.completed }"
            ><strong>Title:</strong> {{ todo.title }}</span
          >
        </div>
        <button
          @click="
            saveFavoriteTodoIds(
              todo.id,
              $store.getters.getFavoriteTodoIds?.includes(todo.id)
            )
          "
        >
          Add to favorite
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.todo-list {
  border: 1px solid #ccc;
  border-top: none;
  padding: 20px;

  &__title {
    margin-bottom: 10px;
  }
}

.list {
  list-style-type: none;
  padding: 0;
}

.list-item {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-item input[type="checkbox"] {
  margin-right: 10px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}
</style>
