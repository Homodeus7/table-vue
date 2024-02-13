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
  <div class="w-full flex flex-col px-[10px] pt-[15px]">
    <div class="self-end min-w-[300px] flex flex-col gap-[5px] text-sm">
      <div class="bg-catskill-white p-[15px] border border-pale-grey rounded-[5px]">
        <div
          v-for="item in dataSums"
          :key="`${item.name}+${item.value}`"
          class="flex justify-between"
        >
          <span class="text-[#8f8f8f]">{{ item.name }}:</span>
          <span>{{ item.value }}</span>
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
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
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

const amount = computed(() =>
  formatObjectNumber(props.rows.map((el) => Number(el.sum)).reduce((a, b) => a + b))
)
const quantity = computed(() =>
  formatObjectNumber(props.rows.map((el) => Number(el.quantity)).reduce((a, b) => a + b))
)
const wheight = computed(() => formatObjectNumber(Number(quantity.value) * 20))

const dataSums = reactive([
  { name: 'Сумма', value: `${amount.value} руб` },
  { name: 'Кол-во', value: `${quantity.value} шт` },
  { name: 'Общий вес', value: `${wheight.value} кг` }
])

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
