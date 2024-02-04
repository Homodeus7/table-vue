<template>
  <input
    class="checkbox-item"
    type="checkbox"
    v-model="model"
    :is-valid="isValid"
    :error-message="errorMessage"
    :disabled="disabled"
    :checked="checked"
    :id="id"
  />
  <label :for="id">{{ label }}</label>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

export interface Checkbox {
  modelValue?: any
  isValid?: boolean
  errorMessage?: string
  disabled?: boolean
  label?: string
  checked?: boolean
  id?: string
}

const props = defineProps<Checkbox>()

const emit = defineEmits(['update:modelValue'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
<style lang="scss" scoped>
.checkbox-item {
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + label {
    font-size: 14px;
    color: #8d98af;
    display: inline-flex;
    align-items: center;
    user-select: none;
    @media (min-width: 1024px) {
      font-size: 16px;
    }
  }
  & + label::before {
    content: '';
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #334155;
    border-radius: 3px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
  &:checked + label::before {
    transition: all linear 0.1s;
    border-color: #334155;
    background-color: #334155;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23b0b7c3' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
  &:focus + label::before {
    box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.07);
  }
  &:focus:not(:checked) + label::before {
    border-color: #334155;
  }
}
</style>
