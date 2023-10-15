<script lang="ts">
import Vue from "vue";
import UserInfo from "@/components/UserInfo.vue";

export default Vue.extend({
  components: { UserInfo },
  methods: {},
});
</script>

<template>
  <UserInfo :user="$store.getters.getUserInfo" />
</template>

<style lang="scss" scoped></style>
