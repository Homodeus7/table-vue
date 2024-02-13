<template>
  <tr>
    <td v-for="(column, ind) in columns" :key="`${column.name}-${ind}`" class="px-[10px] py-[5px]">
      <div v-if="column.name === 'delete'" class="relative">
        <BaseButton ref="ignoreElRef" icon @click="columnsMenu = !columnsMenu">
          <img src="@/assets/svg/delete.svg" />
        </BaseButton>
        <transition name="visible">
          <BaseDropdownMenu
            delete
            v-if="columnsMenu"
            v-on-click-outside="onClickOutsideHandler"
            @drop="dataStore.deleteRow(rows.ind)"
          />
        </transition>
      </div>
      <div v-else-if="column.name === 'dropdown'">
        <BaseButton icon>
          <img src="@/assets/svg/dropdown.svg" />
        </BaseButton>
      </div>
      <div v-else class="min-h-[38px] px-[10px] py-[10px] border border-[#ccc] rounded-[5px]">
        {{ rows[column.name] }}
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseDropdownMenu from '@/components/base/BaseDropdownMenu.vue'
import { useData } from '@/store/data/index'
import { vOnClickOutside } from '@vueuse/components'
import { ref } from 'vue'

export interface BaseRowProps {
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
  }
  ind?: number
}
defineProps<BaseRowProps>()

const dataStore = useData()
const columnsMenu = ref(false)
const ignoreElRef = ref()

const onClickOutsideHandler: any = [
  () => {
    columnsMenu.value = false
  },
  { ignore: [ignoreElRef] }
]
</script>
