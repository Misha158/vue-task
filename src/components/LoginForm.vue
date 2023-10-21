<script lang="ts" setup>
import { ref } from "vue";
import { ValidationObserver } from "vee-validate";
import store from "@/store";
import MyButton from "@/components/MyButton/MyButton.vue";
import MyInput from "@/components/MyInput/MyInput.vue";

const username = ref("bret");
const phone = ref("1-770-736-8031 x56442");

const onLogin = (data) => {
  store.dispatch("onLogin", data);
};

const handleLogin = async () => {
  onLogin({
    username: username.value,
    phone: phone.value,
  });
};

const inputField = ref(null);
</script>

<template>
  <div class="login">
    <div class="login__header">description</div>
    <form class="login-form" v-on:submit.prevent="handleLogin">
      <div class="login-form__header">description</div>
      <validation-observer v-slot="{ invalid }">
        <MyInput
          v-model.trim="username"
          :name="'username'"
          :type="'text'"
          :placeholder="'Username'"
          :autoFocus="true"
          :rules="'required|noNumbers'"
        />

        <MyInput
          v-model.trim="phone"
          :name="'phone'"
          :type="'text'"
          :placeholder="'Phone Number'"
          :rules="'required'"
        />
        <MyButton
          type="submit"
          text="Login"
          :is-disabled="invalid || !username || !phone"
        />
        <div class="login-error" v-if="$store.getters.getLoginError">
          Login error
        </div>
      </validation-observer>
    </form>
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

    .login-error {
      color: $red;
      margin-top: 10px;
    }
  }
}
</style>
