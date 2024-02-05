<template>
  <table>
    <thead>
      <tr>
        <td
          v-for="(column, ind) in columns"
          class="border border-pale-grey relative"
          :class="`w-[${column.width ?? 0}px]`"
        >
          {{ column.label ?? '' }}
          <div
            class="cursor-col-resize absolute top-0 right-0 bottom-0 w-1"
            @mousedown="startMove($event, ind)"
          ></div>
        </td>
      </tr>
    </thead>
    <tbody>
      <BaseRow v-for="row in rows" :columns="columns" :rows="row" />
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import BaseRow from '@/components/base/BaseRow.vue'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export interface BaseTableProps {
  columns: {
    name: string
    label: string
    width: number
  }[]
  rows: {
    name: string
    last_name: string
    phone: string
    email: string
  }[]
}

const props = defineProps<BaseTableProps>()

const draggable = ref(false)
const startOffset = ref(0)
const selectedCol = ref(0)

const move = (e: any) => {
  if (draggable.value) {
    let newWidth = startOffset.value + e.pageX
    let colObj = props.columns[selectedCol.value ?? 0]
    colObj.width = newWidth
    props.columns[selectedCol.value] = colObj
  }
}
const startMove = (e: any, ind: any) => {
  draggable.value = true
  startOffset.value = props.columns[ind].width - e.pageX
  selectedCol.value = ind
}
const stopMove = () => {
  draggable.value = false
}
onMounted(() => {
  document.addEventListener('mouseup', stopMove)
  document.addEventListener('mousemove', move)
})
onUnmounted(() => {
  document.removeEventListener('mouseup', stopMove)
  document.removeEventListener('mousemove', stopMove)
})
</script>
