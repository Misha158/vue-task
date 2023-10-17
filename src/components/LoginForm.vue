<script lang="ts">
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { mapActions } from "vuex";
import * as yup from "yup";

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
  }),

  methods: {
    ...mapActions(["onLogin"]),

    handleLogin: async function () {
      this.onLogin({
        username: this.username,
        phone: this.phone,
      });
    },
  },

  mounted() {
    this.$refs.inputField.focus();
  },
};
</script>

<template>
  <div class="login">
    <div class="login__header">description</div>
    <validation-observer v-slot="{ invalid }">
      <form class="login-form" v-on:submit.prevent="handleLogin">
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
            v-model.trim="username"
            :class="{ hasError: errors.length > 0 }"
            ref="inputField"
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
            v-model.trim="phone"
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
        <div class="login-error" v-if="$store.getters.getLoginError">
          Login error
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<style lang="scss">
@import "../styles/_variables.scss";

.login {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: $grey-light;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    border-radius: 5px 5px 0 0;
    font-size: 17px;
    font-weight: 400;
    background-color: $grey-light2;
    color: $disabled;
  }

  .login-form {
    padding: 15px 20px 20px;

    &__header {
      font-size: 15px;
      margin-bottom: 10px;
      color: $disabled;
    }

    &__wrapper {
      display: block;
      margin-bottom: 15px;

      span {
        color: $red;
      }
    }

    &__input {
      width: 100%;
      padding: 10px;
      border: 1px solid $border-grey;
      border-radius: 5px;
    }

    &__input.hasError {
      border: 2px solid $red;
      outline: none;
    }

    &__button {
      font-weight: 600;
      font-size: 17px;
      width: 100%;
      padding: 10px;
      background-color: $green;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: $green;
      }

      &:disabled {
        background-color: $disabled;
        cursor: not-allowed;
      }
    }

    .login-error {
      color: $red;
      margin-top: 10px;
    }
  }
}
</style>
