<template>
   <div class="w-full flex flex-col px-[10px]">
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
import { reactive, computed } from 'vue'
import { formatObjectNumber } from '@/utils/index'

export interface BaseTableSum {
  rows: {
    ind: number
    name: string
    price: string
    quantity: string
    sum: string
  }[]
}

const props = defineProps<BaseTableSum>()

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
</script>