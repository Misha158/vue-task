<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import MyFilters from "@/components/MyFilters.vue";
import TodoList from "@/components/TodoList.vue";
import CreateTodoForm from "@/components/CreateTodoForm.vue";

export default Vue.extend({
  components: { UserInfo, MyFilters, TodoList, CreateTodoForm },
  methods: {
    ...mapActions(["fetchTodos"]),
  },
  mounted() {
    this.fetchTodos();
  },
});
</script>

<template>
  <div>
    <UserInfo :user="$store.getters.getUserInfo" />
    <CreateTodoForm />
    <MyFilters :todos="$store.getters.getTodos" />
    <TodoList :todos="$store.getters.getTodos" />
  </div>
</template>

<style lang="scss" scoped></style>
