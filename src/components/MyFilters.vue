<script lang="ts">
import Vue from "vue";

import { mapActions } from "vuex";
import { debounce } from "lodash";
import { Statuses } from "@/types";
import { statusOptions } from "@/constants";

export default Vue.extend({
  name: "MyFilters",

  data() {
    return {
      statusFilter: Statuses.All,
      userFilter: "All users",
      titleSearch: "",
      options: statusOptions,
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
  watch: {
    "$store.getters.getFavoriteTodoIds": {
      handler() {
        this.fetchTodos({
          filters: {
            status: this.statusFilter,
            userId: this.userFilter,
            title: this.titleSearch,
          },
        });
      },
      immediate: true,
    },
  },
});
</script>

<template>
  <div class="container">
    <h2>Filters</h2>
    <div class="filters">
      <div class="select-wrapper">
        <label for="status-filter">Status:</label>
        <select
          v-model="statusFilter"
          id="status-filter"
          @change="handleFilterChange"
          class="select-style"
        >
          <option
            v-for="option in options"
            :value="option.value"
            :key="option.value"
            class="option-style"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="select-wrapper">
        <label for="user-filter">User ID:</label>
        <select
          v-model="userFilter"
          id="user-filter"
          @change="handleFilterChange"
          class="select-style"
        >
          <option
            v-for="userId in this.$store.getters.getTodoUserIds"
            :key="userId"
            :value="userId"
            class="option-style"
          >
            {{ userId }}
          </option>
        </select>
      </div>
      <div class="select-wrapper">
        <label for="filterByTitle">Title:</label>
        <input
          name="filterByTitle"
          type="text"
          placeholder="Search by title"
          @input="handleInputSearch"
          :value="titleSearch"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/_variables.scss";
.container {
  padding: 20px;
  margin-top: 40px;
  border: 2px solid black;
  background-color: $grey-light;
}
.filters {
  display: flex;
}
.select-wrapper {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.select-style {
  padding: 8px;
  font-size: 16px;
  border: 1px solid $border-grey;
  border-radius: 4px;
}

.option-style {
  padding: 8px;
  font-size: 16px;
}

input {
  /*width: 200px;*/
  padding: 10px;
  border: 1px solid $border-grey;
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  .select-wrapper {
    margin-right: 0px;
  }
}
</style>
