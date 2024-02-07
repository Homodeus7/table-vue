<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type ButtonHTMLAttributes } from 'vue'

export interface BaseButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  width?: string
  loading?: boolean
  base?: boolean
  icon?: boolean
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
  border: none;
  border-radius: 1rem;
  font-size: 14px;
  font-weight: 400;
  &.base {
    height: 35px;
    width: 146px;
    color: white;
    border-radius: 5px;
    background: #2f8cff;
    transition: all linear $timeout;
    &:hover {
      background: #5ea7ff;
    }
    &:active {
      background: #0073fe;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      color: #738090;
    }
  }
  &.icon {
    width: max-content;
    padding-right: 15px;
    border-radius: 0;
  }
}
</style>
