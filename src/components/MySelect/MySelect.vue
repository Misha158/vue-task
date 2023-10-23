<script lang="ts" setup="">
import { ref } from "vue";

const props = defineProps({
  options: Array,
  handleFilterChange: Function,
  label: String,
  value: String,
});

const selectedValue = ref(props.value);
const emit = defineEmits(["change", "input"]);

const handleChange = (event) => {
  selectedValue.value = event.target.value;
  emit("change", selectedValue);
  emit("input", selectedValue);
  props.handleFilterChange?.(selectedValue);
};
</script>

<template>
  <div class="select-wrapper">
    <label>{{ label }}</label>
    <select v-model="selectedValue" @change="handleChange" class="select-style">
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
</template>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";
.select-wrapper {
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  select {
    background-color: white;
    height: 40px;
  }
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
</style>
