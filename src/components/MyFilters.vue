<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";
import type { TodoItem } from "@/types";
import { mapActions } from "vuex";
import { debounce } from "lodash";

export default Vue.extend({
  name: "MyFilters",
  props: {
    todos: {
      type: Array as PropType<TodoItem[]>,
      required: true,
    },
  },
  data() {
    return {
      statusFilter: "all",
      userFilter: "All users",
      titleSearch: "",
    };
  },
  methods: {
    ...mapActions(["fetchTodos"]),
    handleFilterChange() {
      this.fetchTodos({
        filters: {
          status: this.statusFilter,
          userId: this.userFilter,
          title: this.titleSearch,
        },
      });
    },
    handleInputSearch: debounce(function (event) {
      this.titleSearch = event.target.value;
      this.fetchTodos({
        filters: {
          status: this.statusFilter,
          userId: this.userFilter,
          title: event.target.value,
        },
      });
    }, 800),
  },
});
</script>

<template>
  <div class="filters">
    <label for="status-filter">Status:</label>
    <select
      v-model="statusFilter"
      id="status-filter"
      @change="handleFilterChange"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
      <option value="favorites">Favorites</option>
    </select>

    <label for="user-filter">User ID:</label>
    <select v-model="userFilter" id="user-filter" @change="handleFilterChange">
      <option
        v-for="userId in this.$store.getters.getTodoUserIds"
        :key="userId"
        :value="userId"
      >
        {{ userId }}
      </option>
    </select>
    <input
      name="filterByTitle"
      type="text"
      placeholder="Search by title"
      @input="handleInputSearch"
      :value="titleSearch"
    />
  </div>
</template>

<style scoped></style>
