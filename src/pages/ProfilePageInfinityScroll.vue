<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import MyCustomFilters from "@/components/MyCustomFilters.vue";
import TodoList from "@/components/TodoList.vue";
import CreateTodoForm from "@/components/CreateTodoForm.vue";
import { filterConfig } from "@/constants";
import router from "@/router";

export default Vue.extend({
  components: {
    UserInfo,
    MyCustomFilters,
    TodoList,
    CreateTodoForm,
  },

  data: () => ({
    filterConfig,
    isTodoListIsLoading: false,
    page: 1,
    isInfinityScrollLoading: false,
  }),

  methods: {
    ...mapActions(["fetchTodos"]),
    ...mapMutations(["setTodos"]),
    onFilterChange: async function (filters) {
      console.log("filter changed");
      await this.setTodos([]);
      this.page = 1;

      router.push({ path: "/profile", query: filters });
      this.isTodoListIsLoading = true;
      await this.fetchTodos({
        filters: { ...filters, page: 1 },
      });
      this.isTodoListIsLoading = false;
    },
    loadMore: async function () {
      console.log("loadMore");
      this.isInfinityScrollLoading = true;
      const queryParams = router.currentRoute.query;
      this.page = this.page + 1;
      await this.fetchTodos({
        filters: { ...queryParams, page: this.page },
      });
      this.isInfinityScrollLoading = false;
    },
  },

  async mounted() {
    const queryParams = router.currentRoute.query;
    this.isTodoListIsLoading = true;
    await this.fetchTodos({
      filters: { ...queryParams, page: this.page },
    });
    this.isTodoListIsLoading = false;
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
    <TodoList
      :todos="$store.getters.getTodos"
      :isLoading="isTodoListIsLoading"
    />
    <div v-intersection="loadMore" />
    <v-progress-circular
      v-if="isInfinityScrollLoading"
      indeterminate
      color="primary"
    />
  </div>
</template>

<style lang="scss" scoped></style>
