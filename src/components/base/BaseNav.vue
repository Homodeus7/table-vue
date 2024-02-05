<template>
  <nav class="flex gap-6">
    <li
      v-for="item in titleTable"
      :key="item.value"
      class="font-semibold cursor-pointer text-tory-blue hover:text-black duration-100"
      :class="{ '!text-black': item.value === ui.tableView }"
      @click="ui.tableView = item.value"
    >
      {{ item.name }}
    </li>
  </nav>
</template>
<script lang="ts" setup>
import { useUI } from '@/store/ui/index'
const ui = useUI()

export interface titleTableVeiwProps {
  titleTable: { name?: string; value?: string }[]
}

defineProps<titleTableVeiwProps>()
</script>
