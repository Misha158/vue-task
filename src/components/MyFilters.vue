<script lang="ts">
import Vue from "vue";

import { mapGetters, mapActions } from "vuex";
import { debounce } from "lodash";
import { Statuses } from "@/types";
import { statusOptions } from "@/constants";
import MySelect from "@/components/MySelect/MySelect.vue";

export default Vue.extend({
  name: "MyFilters",
  components: { MySelect },
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

  computed: {
    ...mapGetters(["getTodoUserIds"]),
    optionsUserId() {
      return this.getTodoUserIds.map((userId) => ({
        label: userId,
        value: userId,
      }));
    },
  },
});
</script>

<template>
  <div class="container">
    <h2>Filters</h2>
    <div class="filters">
      <MySelect
        :options="options"
        :handleFilterChange="handleFilterChange"
        label="My custom select"
        v-model="statusFilter"
      />

      <MySelect
        :options="optionsUserId"
        :handleFilterChange="handleFilterChange"
        label="User ID:"
        v-model="userFilter"
      />

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
