<template>
  <table class="leading-none whitespace-nowrap">
    <thead>
      <tr>
        <td
          v-for="(column, ind) in columns"
          class="relative font-semibold px-[10px] py-[14px] border border-pale-grey first:border-l-0 last:border-r-0"
          :style="{ width: `${column.width}px` }"
        >
            {{ column.label }}
          <div
            class="cursor-col-resize absolute top-0 right-0 bottom-0 w-1 hover:w-[3px] hover:bg-dodger-blue"
            @mousedown="startMove($event, ind)"
          ></div>
        </td>
      </tr>
    </thead>
    <tbody>
      <BaseRow
        v-for="(row, ind) in rows"
        :key="`${row.name}-${ind}`"
        :columns="columns"
        :rows="row"
        :ind="ind"
      />
    </tbody>
  </table>
  <BaseTableSum :rows="rows"/>
</template>

<script lang="ts" setup>
import BaseRow from '@/components/base/BaseRow.vue'
import BaseTableSum from '@/components/base/BaseTableSum.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useElementBounding } from '@vueuse/core'

export interface BaseTableProps {
  columns: {
    name: string
    label: string
    width: number
  }[]
  rows: {
    ind: number
    name: string
    price: string
    quantity: string
    sum: string
  }[]
}

const props = defineProps<BaseTableProps>()

const resize = ref(false)
const startOffset = ref(0)
const selectedCol = ref(0)

const move = (e: any) => {
  if (resize.value) {
    let newWidth =  startOffset.value + e.pageX
    console.log('newWidth:', newWidth)
    let colObj = props.columns[selectedCol.value]
    colObj.width = newWidth
    props.columns[selectedCol.value] = colObj
  }
}
const startMove = (e: any, ind: any) => {
  resize.value = true
  startOffset.value = props.columns[ind].width - e.pageX
  console.log('st move offset:', startOffset.value)
  selectedCol.value = ind
}
const stopMove = () => {
  resize.value = false
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
