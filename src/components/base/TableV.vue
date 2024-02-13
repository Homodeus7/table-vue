<template>
  <div class="flex flex-col">
  <div class="flex">
    <div
      v-for="(column, ind) in columns"
      class="relative py-[14px] font-semibold border border-pale-grey first:border-l-0 last:border-r-0"
      :style="{width: `${column.width}px`}"
    >
      {{ column.label }}
      <div
        class="cursor-col-resize absolute top-0 right-0 bottom-0 w-1"
        @mousedown="startMove($event, ind)"
      ></div>
    </div>
  </div>

</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const columns = ref([
  { name: 'name', label: 'Name', width: 100 },
  { name: 'last_name', label: 'Last Name', width: 100 },
  { name: 'phone', label: 'Phone', width: 100 },
  { name: 'email', label: 'Email', width: 100 }
])

let rows = ref([
  { name: "Ivan", last_name: "Ivanov", phone: "8999999", email: "test@test.ru" },
	{ name: "Ivan", last_name: "Ivanov", phone: "8999999", email: "test@test.ru" },
	{ name: "Ivan", last_name: "Ivanov", phone: "8999999", email: "test@test.ru" },
])

const resize = ref(false)
const startOffset = ref(0)
const selectedCol = ref(0)

const move = (e: any) => {
  if (resize.value) {
    let newWidth = startOffset.value + e.pageX
    let colObj = columns.value[selectedCol.value ?? 0]
    colObj.width = newWidth
    columns.value[selectedCol.value] = colObj
  }
}
const startMove = (e: any, ind: any) => {
  resize.value = true
  startOffset.value = columns.value[ind].width - e.pageX
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
