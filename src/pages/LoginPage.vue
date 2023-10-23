<script lang="ts">
import Vue from "vue";
import LoginForm from "../components/LoginForm.vue";
import MyObservable from "../components/MyObservable/MyObservable.vue";

export default Vue.extend({
  components: {
    LoginForm,
    MyObservable,
  },
});
</script>

<template>
  <div class="container">
    <MyObservable />
    <LoginForm />
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 210px;
}
</style>
