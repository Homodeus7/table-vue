<template>
  <tr>
    <td v-for="column in columns" class="border border-pale-grey">{{ rows[column.name] }}</td>
  </tr>
</template>

<script lang="ts" setup>
export interface BaseRowProps {
  columns: {
    name: string
  }[]
  rows: {
    name: string
    last_name: string
    phone: string
    email: string
  }
}

defineProps<BaseRowProps>()
</script>
