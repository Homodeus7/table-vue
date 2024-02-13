<template>
  <div class="flex gap-2">
    <input :id="label" type="checkbox" v-model="model" :value="value" />
    <label :for="label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface CardProps {
  name: string
  label: string
  width: number
}

export interface Checkbox {
  modelValue?: CardProps[]
  value?: CardProps
  label?: string
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
