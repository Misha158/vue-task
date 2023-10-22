<script lang="ts" setup="">
import type { FilterConfig } from "@/constants";
import { reactive } from "vue";
import MySelect from "@/components/MySelect/MySelect.vue";
import MyInput from "@/components/MyInput/MyInput.vue";
import { debounce } from "lodash";

const { filterConfig, onFilterChange } = defineProps({
  filterConfig: {
    type: Array as FilterConfig[],
  },
  onFilterChange: Function,
});

const filterStateReduce = filterConfig.reduce((acc, current) => {
  acc[current.filterName] = current.options?.[0]?.value || "";
  return acc;
}, {});

const filterState = reactive(filterStateReduce);

const handleFilterChange = (inputValue) => {
  onFilterChange(filterState);
};

const handleInputSearch = debounce((event) => {
  onFilterChange(filterState);
}, 800);
</script>

<template>
  <div class="container">
    <div v-for="filter in filterConfig" :key="filter.filterName">
      <label :style="{ fontWeight: 600 }">{{
        filter.filterName.toUpperCase()
      }}</label>

      <div v-if="filter.type === 'select'">
        <MySelect
          v-model="filterState[filter.filterName]"
          :options="filter.options"
          :handleFilterChange="handleFilterChange"
        />
        <div>State: {{ filterState[filter.filterName] }}</div>
      </div>
      <div v-if="filter.type === 'input'">
        <MyInput
          v-model="filterState[filter.filterName]"
          @input="handleInputSearch"
          name="username"
          :placeholder="filter.filterName"
        />
        <div>State: {{ filterState[filter.filterName] }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/_variables.scss";
.container {
  display: flex;
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
