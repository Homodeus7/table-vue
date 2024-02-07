<template>
  <table class="w-full leading-none whitespace-nowrap">
    <thead>
      <tr>
        <td
          v-for="(column, ind) in columns"
          class="relative px-[10px] py-[14px] font-semibold border border-pale-grey first:border-l-0 last:border-r-0"
          :class="`w-[${column.width}px]`"
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
      <BaseRow
        v-for="(row, ind) in rows"
        :key="`${row.name}-${ind}`"
        :columns="columns"
        :rows="row"
        :ind="ind"
      />
    </tbody>
  </table>
  <div class="w-full flex flex-col px-[10px]">
    <div class="self-end min-w-[300px] pt-[15px] flex flex-col gap-[5px] text-sm">
      <div class="bg-catskill-white p-[15px] border border-pale-grey rounded-[5px]">
        <div class="flex justify-between">
          <span class="text-[#8f8f8f]">Сумма:</span>
          <span>{{ amount }} руб</span>
        </div>
        <div class="flex justify-between">
          <span class="text-[#8f8f8f]">Кол-во:</span>
          <span>{{ quantity }} шт</span>
        </div>
        <div class="flex justify-between">
          <span class="text-[#8f8f8f]">Общий вес:</span>
          <span>{{ wheight }} кг</span>
        </div>
      </div>
      <div class="bg-catskill-white p-[15px] border border-pale-grey rounded-[5px]">
        <div class="flex justify-between">
          <span>Общая сумма:</span>
          <span class="font-semibold">{{ amount }} руб</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseRow from '@/components/base/BaseRow.vue'
import { formatObjectNumber } from '@/utils/index'
import { ref, onMounted, onUnmounted, computed } from 'vue'

export interface BaseTableProps {
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
  }[]
}

const props = defineProps<BaseTableProps>()

const resize = ref(false)
const startOffset = ref(0)
const selectedCol = ref(0)

const move = (e: any) => {
  if (resize.value) {
    const newWidth = startOffset.value + e.pageX
    const colObj = props.columns[selectedCol.value]
    colObj.width = newWidth
    props.columns[selectedCol.value] = colObj
  }
}
const startMove = (e: any, ind: any) => {
  resize.value = true
  startOffset.value = props.columns[ind].width - e.pageX
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

const amount = computed(() =>
  formatObjectNumber(props.rows.map((el) => Number(el.sum)).reduce((a, b) => a + b))
)
const quantity = computed(() =>
  formatObjectNumber(props.rows.map((el) => Number(el.quantity)).reduce((a, b) => a + b))
)
const wheight = computed(() => formatObjectNumber(Number(quantity.value) * 20))
</script>
