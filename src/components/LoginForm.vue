<template>
  <div class="login">
    <div class="login__header">description</div>
    <validation-observer v-slot="{ invalid }">
      <form class="login-form" v-on:submit.prevent="onLogin">
        <div class="login-form__header">description</div>
        <validation-provider
          rules="required|noNumbers"
          v-slot="{ errors }"
          class="login-form__wrapper"
        >
          <input
            name="username"
            type="text"
            class="login-form__input"
            placeholder="Username"
            v-model="username"
            :class="{ hasError: errors.length > 0 }"
          />
          <span>{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider
          rules="required"
          v-slot="{ errors }"
          class="login-form__wrapper"
        >
          <input
            type="text"
            class="login-form__input"
            placeholder="Phone Number"
            v-model="phone"
          />
          <span>{{ errors[0] }}</span>
        </validation-provider>

        <button
          type="submit"
          class="login-form__button"
          :disabled="invalid || !username || !phone"
        >
          Login
        </button>
        <div class="login-error" v-if="loginError">Login error</div>
      </form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as yup from "yup";
import { Service } from "@/Service";

interface User {
  name: string;
  phone: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[\p{L}\s]+$/u, "Only alphabets are allowed for this field "),
});

extend("noNumbers", {
  validate: (value) => schema.isValid({ username: value }),
  message: "Only letters are allowed in this field.",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data: () => ({
    username: "",
    phone: "",
    loginError: false,
  }),

  methods: {
    onLogin: async function () {
      const users = await Service.getUsers();

      if (!users?.length) {
        this.loginError = true;
        return;
      }

      const isAuth = users.find(
        ({ name, phone }) => name === this.username && phone === this.phone
      );

      if (!isAuth) {
        this.loginError = true;
        return;
      }

      this.$router.push("/profile");
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #c3c3c3;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 17px;
    font-weight: bold;
    background-color: #a5a5a5;
    color: #5f5f5f;
    padding: 10px 0;
    border-radius: 5px 5px 0 0;
  }

  .login-form {
    padding: 20px;

    &__header {
      font-size: 15px;
      margin-bottom: 10px;
      color: #5f5f5f;
    }

    &__wrapper {
      display: block;
      margin-bottom: 15px;

      span {
        color: #e74c3c;
      }
    }

    &__input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    &__input.hasError {
      border: 2px solid #e74c3c;
      outline: none;
    }

    &__button {
      font-weight: 600;
      font-size: 17px;
      width: 100%;
      padding: 10px;
      background-color: #519945;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #45a049;
      }

      &:disabled {
        background-color: #575757;
        cursor: not-allowed;
      }
    }

    .login-error {
      color: #e74c3c;
      margin-top: 10px;
    }
  }
}
</style>
