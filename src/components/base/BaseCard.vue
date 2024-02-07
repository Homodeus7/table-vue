<template>
  <div
    ref="card"
    v-bind="props"
    :class="[
      {
        ...props
      }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface CardProps {
  width?: string
  base?: boolean
  baseTable?: boolean
}
const card = ref<HTMLDivElement>()
const props = withDefaults(defineProps<CardProps>(), {})

onMounted(() => {
  try {
    const tag = card.value as any

    if (props.width) {
      tag.style.width = props.width
    }
  } catch (e) {
    console.error(e)
  }
})
</script>
<style lang="scss">
.base {
  border: 1px solid #eeeff1;
  background-color: white;
  border-radius: 10px;
  padding: 20px 25px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  &Table {
    padding: 0 0 25px 0;
  }
}
</style>
