<template>
  <nav class="flex gap-6">
    <span
      v-for="item in titleTableVeiw"
      class="font-semibold cursor-pointer text-tory-blue hover:text-black"
      :class="{ 'text-black': item.value === ui.tableView }"
      @click="ui.tableView = item.value"
    >
      {{ item.name }}
    </span>
  </nav>
</template>
<script lang="ts" setup>
import { useUI } from '@/store/ui/index'
import { reactive } from 'vue'
const ui = useUI()

const titleTableVeiw = reactive([
  { name: 'Общее', value: 'common' },
  { name: 'Товары', value: 'gds' },
  { name: 'Доп. расходы', value: 'exps' }
])
</script>
