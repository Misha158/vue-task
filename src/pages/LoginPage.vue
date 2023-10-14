<script lang="ts">
import Vue from "vue";
import LoginForm from "../components/LoginForm.vue";

export default Vue.extend({
  components: {
    LoginForm,
  },
});
</script>

<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 210px;
}
</style>
