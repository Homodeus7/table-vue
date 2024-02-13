<template>
  <BaseContainer>
    <div class="flex flex-col gap-5">
      <h1 class="text-3xl">Проведение ТО и мелкий ремонт</h1>
      <BaseNav :title-table="titlesTableVeiw" />
      <BaseCard base>
        <BaseButton base @click="dataStore.addRow">
          <template v-slot:prefix-icon>
            <img class="pr-2" src="@/assets/svg/plus.svg" />
          </template>
          Добавить строку
        </BaseButton>
      </BaseCard>
      <BaseCard base baseTable>
        <div class="flex flex-col">
          <div class="relative self-end py-[6px]">
            <BaseButton
              ref="ignoreElRef"
              icon
              @click="(columnsMenu = !columnsMenu), (columnsSubMenu = false)"
            >
              <img src="@/assets/svg/options.svg" />
            </BaseButton>
            <transition name="visible">
              <BaseDropdownMenu
                v-if="columnsMenu"
                v-on-click-outside="onClickOutsideHandler"
                @drop="toggleMenu"
              />
            </transition>
            <transition name="visible">
              <div
                class="absolute top-6 right-3 min-w-[180px] shadow-menu flex flex-col rounded-[5px] whitespace-nowrap bg-white z-10 text-sm p-[10px]"
                v-if="columnsSubMenu"
                v-on-click-outside="onClickOutsideHandler"
              >
                <template v-for="column in columns" :key="column.name">
                  <BaseCheckbox :label="column.label" v-model="selectedOptions" :value="column" />
                </template>
              </div>
            </transition>
          </div>
          <div>
            <BaseTable :columns="selectedOptions" :rows="rows" />
            <!-- <TableV /> -->
          </div>
        </div>
      </BaseCard>
    </div>
  </BaseContainer>
</template>

<script lang="ts" setup>
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import TableV from '@/components/base/TableV.vue'
import BaseNav from '@/components/base/BaseNav.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseDropdownMenu from '@/components/base/BaseDropdownMenu.vue'
import { vOnClickOutside } from '@vueuse/components'
import { useData } from '@/store/data/index'
import { ref, computed } from 'vue'

const columnsMenu = ref(false)
const columnsSubMenu = ref(false)

const ignoreElRef = ref()

const selectedOptions = ref([
  { name: 'delete', label: '', width: 0 },
  { name: 'dropdown', label: '', width: 0 },
  { name: 'name', label: 'Наименование еденицы', width: 0 },
  { name: 'price', label: 'Цена', width: 0 },
  { name: 'quantity', label: 'Кол-во', width: 0 },
  { name: 'sum', label: 'Итого', width: 0 }
])

const dataStore = useData()
const titlesTableVeiw = computed(() => dataStore.titlesTableVeiw)
const rows = computed(() => dataStore.rows)
const columns = computed(() => dataStore.columns)

const toggleMenu = () => {
  ;(columnsSubMenu.value = !columnsSubMenu.value), (columnsMenu.value = false)
}

const onClickOutsideHandler: any = [
  () => {
    ;(columnsMenu.value = false), (columnsSubMenu.value = false)
  },
  { ignore: [ignoreElRef] }
]
</script>
<style lang="scss" scoped>
.visible-enter-active {
  animation: menu-in 0.2s;
}
.visible-leave-active {
  animation: menu-in 0.2s reverse;
}
@keyframes menu-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.shadow-menu {
  box-shadow:
    0 0 3px 0 #000,
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
}
</style>
