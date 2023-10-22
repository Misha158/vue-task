<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import MyButton from "@/components/MyButton/MyButton.vue";
import MyInput from "@/components/MyInput/MyInput.vue";

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver,
    MyButton,
    MyInput,
  },
  data() {
    return {
      userId: "",
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
  <validation-observer v-slot="{ invalid }">
    <form class="create-todo-form" v-on:submit.prevent="addTodo">
      <h2 class="create-todo-form__title">Create todo</h2>
      <MyInput
        label="User id"
        name="userId"
        type="text"
        v-model.trim="userId"
        rules="required|onlyNumbers"
      />
      <MyInput
        label="Title"
        name="title"
        type="text"
        v-model.trim="title"
        rules="required"
      />
      <MyButton
        :is-disabled="invalid || !title || !userId"
        type="submit"
        text="Add"
      />
    </form>
  </validation-observer>
</template>

<style lang="scss">
@import "../styles/_variables.scss";

.create-todo-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 40px;
  padding: 20px;
  border: 2px solid black;
  background-color: $grey-light;
}

.create-todo-form__wrapper {
  display: flex;
  flex-direction: column;

  span {
    color: $red;
  }
}

.create-todo-form__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.create-todo-form__input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid $border-grey;
  border-radius: 4px;
}

.create-todo-form__button {
  padding: 10px 15px;
  background-color: $green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: $green;
  }

  &:active {
    background-color: $green;
  }

  &:disabled {
    background-color: $black;
    cursor: not-allowed;
  }
}

@media screen and (max-width: 768px) {
  .create-todo-form {
    width: auto;
  }
}
</style>
