<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      userId: null,
      title: "",
    };
  },
  methods: {
    ...mapActions(["createNewTodo"]),
    async addTodo() {
      const newTodo = {
        userId: this.userId,
        title: this.title,
        completed: false,
      };
      await this.createNewTodo(newTodo);
    },
  },
});
</script>

<template>
  <form class="create-todo-form" v-on:submit.prevent="addTodo">
    <h2 class="create-todo-form__title">Create todo</h2>
    <label for="userId" class="create-todo-form__label">User ID:</label>
    <input
      v-model="userId"
      type="number"
      id="userId"
      class="create-todo-form__input"
    />
    <label for="title" class="create-todo-form__label">Title:</label>
    <input
      v-model="title"
      type="text"
      id="title"
      class="create-todo-form__input"
    />
    <button type="submit" class="create-todo-form__button">Add</button>
  </form>
</template>

<style lang="scss">
.create-todo-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px;
}

.create-todo-form__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.create-todo-form__label {
  font-weight: bold;
  margin-bottom: 5px;
}

.create-todo-form__input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-todo-form__button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-todo-form__button:hover {
  background-color: #45a049;
}

.create-todo-form__button:active {
  background-color: #3e8e41;
}
</style>
