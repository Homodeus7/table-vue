<template>
  <div class="flex justify-center items-center">
    <vue-awesome-paginate
      :class="{ blue: blue }"
      :total-items="totalItems"
      :items-per-page="itemPerPage"
      :max-pages-shown="maxPagesShown"
      v-model="value"
      @click="onClickHandler"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Pagination {
  totalItems?: number
  itemPerPage?: number
  maxPagesShown?: number
  modelValue: number
  blue?: boolean
}
const props = defineProps<Pagination>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (page) => emit('update:modelValue', page)
})

const onClickHandler = (page: number) => {}
</script>
