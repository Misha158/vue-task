<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    increment() {
      this.$store.dispatch("increment");
    },
  },
});
</script>

<template>
  <div>
    <p>Count: {{ $store.getters.getCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style lang="scss" scoped></style>
