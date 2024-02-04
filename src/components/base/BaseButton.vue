<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type ButtonHTMLAttributes } from 'vue'

export interface BaseButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  primary?: boolean
  special?: boolean
  connect?: boolean
  disconnect?: boolean
  outlines?: boolean
  blue?: boolean
  icon?: boolean
  width?: string
  loading?: boolean
  add?: boolean
  text?: boolean
  b_gradient?: boolean
  base?: boolean
  baseMax?: boolean
  green?: boolean
  red?: boolean
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
  font-family: 'Druk Text';
  font-size: 1rem;
  line-height: 1em;
  border-radius: 1rem;
  font: {
    weight: 400;
  }
  &.primary {
    padding: 0.4em 1em 0.5em 1em;
    background: #f47a0e;
    color: white;
    border: 0;
    border-radius: 0.7rem;
    transition: all linear $timeout;
    @media (min-width: 768px) {
      height: 1.7em;
      width: 7.5em;
      transition: all linear $timeout;
      &:hover {
        background: #df7e2a;
      }

      &:active {
        background: #824614;
      }
    }
  }
  &.base {
    font-size: 14px;
    height: 40px;
    width: 120px;
    color: #f47a0e;
    border-radius: 10px;
    border: 1px solid #f47a0e;
    background: rgb(255, 255, 255, 4%);
    transition: all linear $timeout;
    &Max {
      width: 160px;
      @media (min-width: 1028px) {
        width: 120px;
      }
    }
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
  &.special {
    font-family: 'Druk Text';
    padding: 0.7em 1.4em;
    font-size: 1.2em;
    line-height: 1em;
    color: #ffa03b;
    text-align: center;
    text-decoration: none;
    transition: all linear $timeout;
    border: 1px solid rgb(255, 137, 46, 70%);
    border-radius: 3em;
    @media (min-width: 768px) {
      padding: 0.6em 1.8em 0.8em 1.8em;
      transition: all linear $timeout;
      &:hover {
        background-color: #ffa03b;
        color: black;
      }
      &:active {
        background-color: #ffa03b;
        color: black;
        opacity: 0.8;
      }
    }
  }
  &.blue {
    font-size: 14px;
    height: 40px;
    width: 100%;
    color: #677fff;
    border-radius: 10px;
    border: 1px solid #677fff;
    background: rgb(255, 255, 255, 4%);
    transition: all linear $timeout;
    &:hover {
      color: #818cc6;
      border: 1px solid #818cc6;
    }
    &:active {
      color: #3c498d;
      border: 1px solid #3c498d;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      color: #635b5b;
      border: 1px solid #635b5b;
    }
    @media (min-width: 1280px) {
      width: 120px;
    }
  }
  &.green {
    font-size: 14px;
    height: 46px;
    width: 100%;
    color: #e1e4f0;
    border-radius: 10px;
    border: none;
    background: #04c675;
    transition: all linear $timeout;
    &:hover {
      background: #51aa87;
    }
    &:active {
      background: #088e58;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      color: #9f99a3;
      background: #635b5b;
    }
  }
  &.red {
    font-size: 14px;
    height: 46px;
    width: 100%;
    color: #e1e4f0;
    border-radius: 10px;
    border: none;
    background: #f4370e;
    transition: all linear $timeout;
    &:hover {
      background: #c35e49;
    }
    &:active {
      background: #992913;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      color: #9f99a3;
      background: #635b5b;
    }
  }
  &.connect {
    font-size: 14px;
    height: 40px;
    width: 160px;
    color: #f47a0e;
    border-radius: 10px;
    border: 1px solid #f47a0e;
    background: rgb(255, 255, 255, 4%);
    transition: all linear $timeout;
    @media (min-width: 768px) {
    }
  }
  &.disconnect {
    font-size: 14px;
    height: 40px;
    width: 160px;
    color: #c4c8d3;
    border-radius: 10px;
    border: 1px solid #242228;
    background: rgb(255, 255, 255, 4%);
    transition: all linear $timeout;
    @media (min-width: 768px) {
    }
  }
  &.icon {
    font-size: 14px;
    height: 36px;
    width: 36px;
    color: #f47a0e;
    border-radius: 10px;
    border: 1px solid #f47a0e;
    background: #161319;
    transition: all linear $timeout;
    &Max {
      width: 160px;
      @media (min-width: 1028px) {
        width: 120px;
      }
    }
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
  &.text {
    font-family: Calibri;
    width: max-content;
    border-radius: 0;
  }
  &.add {
    width: 2.2em;
    height: 2.2em;
    background: #181a26;
    border-radius: 0.375em;
    padding: 0;
    @media (min-width: 768px) {
      width: 2.5em;
      height: 2.5em;
      transition: all linear $timeout;
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.7;
      }
    }
  }
  &.outlines {
    padding: 0.75em 1em;
    font-size: 14px;
    background: transparent;
    color: #677fff;
    border: 1px solid #677fff;
    border-radius: 10px;
    background-color: rgb(255, 255, 255, 4%);
    @media (min-width: 768px) {
      max-width: 125px;
      transition: all linear $timeout;
      &:hover {
        color: white;
        background-color: #677fff;
      }
      &:active {
        color: white;
        background-color: #677fff;
        opacity: 0.8;
      }
    }
  }
  .b_gradient {
    border: 1px solid rgb(255, 137, 46, 70%);
    @media (min-width: 768px) {
      --border-width: 1px;
      --border-radius: 60px;
      --color-1: #ff7800;
      --color-2: #ffb749;

      & {
        background: linear-gradient(to right, #ff7800, #ffb749),
          linear-gradient(to right, #ff7800, #ffb749);
        background-position:
          26px 0,
          26px 100%;
        background-repeat: no-repeat;
        background-size: calc(100% - var(--border-radius) - var(--border-radius) + 36px)
          var(--border-width);
        border: none;
      }
      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: var(--border-radius);
        top: 0;
        bottom: 0;
      }
      &:before {
        left: 0;
        border: var(--border-width) solid var(--color-1);
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        border-right-color: transparent;
      }
      &:after {
        right: 0;
        border: var(--border-width) solid var(--color-2);
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
        border-left-color: transparent;
      }
    }
  }
}
</style>
