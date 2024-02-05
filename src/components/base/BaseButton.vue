<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type ButtonHTMLAttributes } from 'vue'

export interface BaseButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  width?: string
  loading?: boolean
  base?: boolean
}

const props = defineProps<BaseButtonProps>()

const emit = defineEmits(['click'])

const button = ref<HTMLElement | null>(null)

const onClick = () => {
  return emit('click')
}

onMounted(() => {
  try {
    const tag = button.value as any

    if (props.width) {
      tag.style.width = props.width
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <button
    v-bind="props"
    :class="[
      {
        ...props
      }
    ]"
    @click="onClick"
  >
    <slot name="prefix-icon"></slot>
    <slot></slot>
    <LoaderIcon v-if="loading" size="18px" class="animate-spin ml-2" />
    <slot name="suffix-icon"></slot>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/main.css';

$timeout: 0.1s;

button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  font: {
    weight: 400;
  }
  &.base {
    height: 40px;
    width: 120px;
    color: #f47a0e;
    border-radius: 10px;
    border: 1px solid #f47a0e;
    background: rgb(255, 255, 255, 4%);
    transition: all linear $timeout;
    &:hover {
      color: #c38e60;
      border: 1px solid #c38e60;
    }
    &:active {
      color: #824614;
      border: 1px solid #824614;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      color: #635b5b;
      border: 1px solid #635b5b;
    }
  }
}
</style>
