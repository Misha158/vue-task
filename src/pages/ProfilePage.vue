<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import MyFilters from "@/components/MyFilters.vue";
import TodoList from "@/components/TodoList.vue";
import CreateTodoForm from "@/components/CreateTodoForm.vue";

export default Vue.extend({
  components: { UserInfo, MyFilters, TodoList, CreateTodoForm },
  data: () => ({
    test: {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
  }),
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
    <!--  <UserInfo :user="$store.getters.getUserInfo" />-->
    <UserInfo :user="this.test" />
    <CreateTodoForm />
    <MyFilters :todos="$store.getters.getTodos" />
    <!--  <TodoList :todolist="" />-->
    <TodoList :todos="$store.getters.getTodos" />
  </div>
</template>

<style lang="scss" scoped></style>
