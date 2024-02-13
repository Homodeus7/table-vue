<template>
  <div
    v-if="delete"
    class="absolute top-0 left-3 min-w-[100px] shadow-menu flex flex-col rounded-[5px] bg-white z-10 text-sm"
  >
    <div
      @click="emit('drop')"
      class="flex gap-2 items-center justify-between py-[7px] px-[10px] cursor-pointer whitespace-nowrap hover:bg-[#eef3f8]"
    >
      <span>Удалить</span>
    </div>
  </div>
  <div
    v-else
    class="absolute top-6 right-3 min-w-[180px] shadow-menu flex flex-col rounded-[5px] bg-white z-10 text-sm"
  >
    <div
      @click="emit('drop')"
      class="flex gap-2 items-center justify-between py-[7px] px-[10px] cursor-pointer whitespace-nowrap hover:bg-[#eef3f8]"
    >
      <span>Отображение столбцов</span>
      <img class="h-[10px]" src="@/assets/svg/arrow.svg" />
    </div>
    <div
      class="flex gap-2 items-center justify-between py-[7px] px-[10px] cursor-pointer whitespace-nowrap hover:bg-[#eef3f8]"
    >
      <span>Порядок столбцов</span>
      <img class="h-[10px]" src="@/assets/svg/arrow.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['drop'])
export interface BaseDropdownMenu {
  delete?: boolean
}
defineProps<BaseDropdownMenu>()
</script>
<style lang="scss" scoped>
.shadow-menu {
  box-shadow:
    0 0 3px 0 #000,
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
}
</style>
