<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";
import type { TodoItem } from "@/types";

export default Vue.extend({
  name: "TodoList",
  props: {
    todos: {
      required: true,
      type: Array as PropType<TodoItem[]>,
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
          <p>{{ todo.id }}.&nbsp;</p>
        </div>
        <div class="todo-content">
          <!--          <input type="checkbox" :checked="todo.completed" disabled />-->
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.todo-list {
  margin: 20px;

  &__title {
    margin-bottom: 10px;
  }
}

.list {
  list-style-type: none;
  padding: 0;
}

.list-item {
  display: flex;
  align-items: center;
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
