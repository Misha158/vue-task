<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import MyCustomFilters from "@/components/MyCustomFilters.vue";
import TodoList from "@/components/TodoList.vue";
import CreateTodoForm from "@/components/CreateTodoForm.vue";
import { filterConfig } from "@/constants";

export default Vue.extend({
  components: {
    UserInfo,
    MyCustomFilters,
    TodoList,
    CreateTodoForm,
  },

  data: () => ({
    filterConfig,
  }),

  methods: {
    ...mapActions(["fetchTodos"]),
    onFilterChange: function (filters) {
      this.fetchTodos({
        filters,
      });
    },
  },
  mounted() {
    this.fetchTodos();
  },

  computed: {
    ...mapGetters([
      "getTodoUserIds",
      "getTodos",
      "getGlobalFilters",
      "getFavoriteTodoIds",
    ]),
    optionsUserId() {
      return this.getTodoUserIds.map((userId) => ({
        label: userId,
        value: userId,
      }));
    },
  },

  watch: {
    getTodoUserIds: {
      handler(newVal) {
        this.filterConfig = this.filterConfig.map((filter) => {
          if (filter.filterName === "userId") {
            return { ...filter, options: this.optionsUserId };
          }
          return filter;
        });
      },
      immediate: true,
    },
    getFavoriteTodoIds: {
      handler() {
        this.fetchTodos({
          filters: {
            status: this.getGlobalFilters?.status,
            userId: this.getGlobalFilters?.userId,
            title: this.getGlobalFilters?.title,
          },
        });
      },
    },
  },
});
</script>

<template>
  <div>
    <UserInfo :user="$store.getters.getUserInfo" />
    <CreateTodoForm />
    <MyCustomFilters
      :filter-config="this.filterConfig"
      :onFilterChange="this.onFilterChange"
    />
    <TodoList :todos="$store.getters.getTodos" />
  </div>
</template>

<style lang="scss" scoped></style>
