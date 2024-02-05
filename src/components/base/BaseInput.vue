<template>
  <div class="relative flex flex-col gap-1">
    <label
      v-if="label"
      :for="label"
      :class="{
        'label-thin': labelThin,
        'label-normal': !labelThin
      }"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      :type="password ? 'password' : 'text'"
      v-model="value"
      class="pl-[18px] pr-[32px] py-[10px] overflow-hidden text-ellipsis"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div class="absolute bottom-[0.5rem] left-[0.8rem] flex items-center">
      <slot name="prefix-icon"></slot>
    </div>

    <div
      class="absolute bottom-[8px] right-[18px] flex items-center text-cornflower-blue text-base cursor-pointer"
      :class="{ hidden: disabled }"
    >
      <slot name="suffix-icon"></slot>
    </div>

    <slot></slot>
    <span
      v-if="errorMessage"
      class="z-10 absolute -bottom-[1.2rem] left-2 text-sm font-medium text-pomegranate duration-150"
      :class="{
        'max-w-[180px] -bottom-[2.5rem]': errorL,
        'max-w-[240px] -bottom-[2.5rem]  backdrop-blur-md': errorM
      }"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

export interface InputProps {
  modelValue?: string | unknown
  placeholder?: string
  isValid?: boolean
  errorMessage?: string
  errorL?: boolean
  errorM?: boolean
  disabled?: boolean
  width?: string
  label?: string
  background?: boolean
  labelThin?: boolean
  password?: boolean
  textPadding?: boolean
}
const props = defineProps<InputProps>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (text) => emit('update:modelValue', text)
})

const input = ref<HTMLElement | null>(null)

onMounted(() => {
  try {
    const tag = input.value as any

    if (props.width) {
      tag.style.width = props.width
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<style lang="scss" scoped>
.label-thin {
  font-size: 14px;
  color: #635b5b;
}
.label-normal {
  font-size: 1rem;
  color: #e1e4f0;
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
}
input[type='text'],
input[type='number'] {
  height: 42px;
  font-size: 16px;
  color: #e1e4f0;
  outline: none;
  &::placeholder {
    font-size: 14px;
    color: #635b5b;
  }
  &:disabled {
    pointer-events: none;
    cursor: default;
    color: #635b5b;
    border: 1px solid #635b5b;
    background: rgb(255, 255, 255, 4%);
  }
  &.text-padding {
    padding-left: 3.2rem;
  }
}
</style>
