<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as yup from "yup";
import MyButton from "@/components/Button/MyButton.vue";

const schema = yup.object().shape({
  userId: yup.number().min(0),
});

extend("onlyNumbers", {
  validate: (value) => schema.isValid({ userId: value }),
  message: "Only numbers are allowed in this field.",
});

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver,
    MyButton,
  },
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
  <validation-observer v-slot="{ invalid }">
    <form class="create-todo-form" v-on:submit.prevent="addTodo">
      <h2 class="create-todo-form__title">Create todo</h2>

      <validation-provider
        rules="required|onlyNumbers"
        v-slot="{ errors }"
        class="create-todo-form__wrapper"
      >
        <label for="userId" class="create-todo-form__label">User ID:</label>
        <input
          v-model.trim="userId"
          type="text"
          id="userId"
          class="create-todo-form__input"
        />
        <span>{{ errors[0] }}</span>
      </validation-provider>
      <validation-provider
        rules="required"
        v-slot="{ errors }"
        class="create-todo-form__wrapper"
      >
        <label for="title" class="create-todo-form__label">Title:</label>
        <input
          v-model.trim="title"
          type="text"
          id="title"
          class="create-todo-form__input"
        />
        <span>{{ errors[0] }}</span>
      </validation-provider>

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

.create-todo-form__label {
  font-weight: bold;
  margin-bottom: 5px;
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
