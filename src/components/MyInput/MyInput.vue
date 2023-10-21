<script lang="ts" setup="">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";

import * as yup from "yup";
const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[\p{L}\s]+$/u, "Only alphabets are allowed for this field "),
});

extend("noNumbers", {
  validate: (value) => schema.isValid({ username: value }),
  message: "Only letters are allowed in this field.",
});

const props = defineProps({
  label: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    required: true,
  },
  autoFocus: {
    type: Boolean,
    default: false,
  },
  rules: [String],
});

const emit = defineEmits(["input"]);

const onInputChange = (event) => {
  emit("input", event.target.value);
};
</script>

<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <validation-provider :name="name" :rules="rules" v-slot="{ errors }">
      <input
        class="my-input"
        :class="{ hasError: errors[0] }"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        v-focus="autoFocus"
        :value="value"
        @input="onInputChange"
      />
      <span class="input__error">{{ errors[0] }}</span>
    </validation-provider>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.my-input {
  width: 100%;
  padding: 10px;
  border: 1px solid $border-grey;
  border-radius: 5px;

  &.hasError {
    border: 2px solid $red;
    outline: none;
  }
}

.input__error {
  display: block;
  color: $red;
  margin: 2px 0 10px 0;
}
</style>
