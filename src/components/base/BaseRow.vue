<template>
  <tr>
    <td v-for="(column, ind) in columns" :key="`${column.name}-${ind}`" class="px-[10px] py-[5px]">
      <div class="min-h-[38px] px-[10px] py-[10px] border border-[#ccc] rounded-[5px]">
        {{ rows[column.name] }}
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { VueDraggableNext } from 'vue-draggable-next'
import { shallowRef } from 'vue'

const draggable = shallowRef(VueDraggableNext)

export interface BaseRowProps {
  columns: {
    name: string
    label: string
    width: number
  }[]
  rows: {
    name: string
    price: string
    quantity: string
    sum: string
  }
  ind?: number
}
const props = defineProps<BaseRowProps>()
</script>
