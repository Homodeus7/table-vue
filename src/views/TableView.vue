<template>
  <BaseContainer>
    <div class="flex flex-col gap-6">
      <h1 class="text-3xl">Проведение ТО и мелкий ремонт</h1>
      <BaseNav />
      <BaseCard base> aasdasd</BaseCard>
      <BaseCard base>
        <table>
          <thead>
            <tr>
              <td
                v-for="(column, ind) in columns"
                :style="{ position: 'relative', width: column.width + 'px' }"
              >
                {{ column.label }}
                <div
                  class="cursor-col-resize absolute top-0 right-0 bottom-0 w-1"
                  @mousedown="startMove($event, ind)"
                ></div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows">
              <td v-for="column in columns">{{ row[column.name] }}</td>
            </tr>
          </tbody>
        </table>
      </BaseCard>
    </div>
  </BaseContainer>
</template>

<script lang="ts" setup>
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseNav from '@/components/base/BaseNav.vue'

import { ref, reactive, onMounted, onUnmounted } from 'vue'

const columns = reactive([
  { name: 'name', label: 'Name', width: 100 },
  { name: 'last_name', label: 'Last Name', width: 100 },
  { name: 'phone', label: 'Phone', width: 100 },
  { name: 'email', label: 'Email', width: 100 }
])

const rows = reactive([
  {
    name: 'Ivan',
    last_name: 'Ivanov',
    phone: '8999999',
    email: 'test@test.ru'
  },
  {
    name: 'Ivan',
    last_name: 'Ivanov',
    phone: '8999999',
    email: 'test@test.ru'
  },
  {
    name: 'Ivan',
    last_name: 'Ivanov',
    phone: '8999999',
    email: 'test@test.ru'
  }
])

const draggable = ref(false)
const startOffset = ref(0)
const selectedCol = ref(0)

const move = (e: any) => {
  if (draggable.value) {
    let newWidth = startOffset.value + e.pageX
    let colObj = columns[selectedCol.value ?? 0]
    colObj.width = newWidth
    columns[selectedCol.value] = colObj
  }
}
const startMove = (e: any, ind: any) => {
  draggable.value = true
  startOffset.value = columns[ind].width - e.pageX
  selectedCol.value = ind
}
const stopMove = () => {
  draggable.value = false
}
onUnmounted(() => {
  document.removeEventListener('mouseup', stopMove)
  document.removeEventListener('mousemove', stopMove)
})
onMounted(() => {
  document.addEventListener('mouseup', stopMove)
  document.addEventListener('mousemove', move)
})
</script>
<style scoped>
table td {
  border: 1px solid black;
}
</style>
