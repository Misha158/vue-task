<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";
import type { TodoItem } from "@/types";
import { mapMutations, mapGetters } from "vuex";
import MyButton from "@/components/MyButton/MyButton.vue";

export default Vue.extend({
  components: { MyButton },
  name: "TodoList",
  props: {
    todos: {
      required: true,
      type: Array as PropType<TodoItem[]>,
    },
  },
  computed: {
    ...mapGetters(["getFavoriteTodoIds"]),
  },
  methods: {
    ...mapMutations(["setFavoriteTodoIds"]),
    convertStatus(status: string) {
      if (!status) return "Uncompleted";
      if (status) return "Completed";
      if (status === "favorite") return "Favorite";
    },
    saveFavoriteTodoIds(todoId: number) {
      this.setFavoriteTodoIds({
        id: todoId,
        shouldRemoveFromFavorite:
          this.getFavoriteTodoIds?.includes(todoId) || false,
      });
    },
  },
});
</script>

<template>
  <div class="todo-list">
    <h2 class="todo-list__title">Todolist</h2>
    <div v-if="!todos.length">Sorry! No todos were found!</div>
    <ul class="list" v-else>
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

        <MyButton
          :text="'Add to favorite'"
          :handleClick="() => saveFavoriteTodoIds(todo.id)"
          :isFullWidth="false"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "../styles/_variables.scss";
.todo-list {
  padding: 20px;
  border: 2px solid black;
  border-top: none;
  background-color: $grey-light;

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
  background-color: $white;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-item input[type="checkbox"] {
  margin-right: 10px;
}

.completed {
  text-decoration: line-through;
  color: $grey-light2;
}
</style>
