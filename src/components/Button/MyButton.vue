<script lang="ts" setup="">
const props = defineProps({
  text: String,
  type: String,
  isDisabled: Boolean,
  handleClick: Function,
  isFullWidth: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <button
    type="type"
    class="my__button"
    :class="{ 'full-width': isFullWidth }"
    :disabled="isDisabled"
    @click="handleClick"
  >
    {{ text }}
    <slot v-if="!text"></slot>
  </button>
</template>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";
.my__button {
  font-weight: 600;
  font-size: 17px;
  padding: 10px;
  background-color: $green;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: $green-hover;
  }

  &:disabled {
    background-color: $disabled;
    cursor: not-allowed;
  }
}

.full-width {
  width: 100%;
}
</style>
