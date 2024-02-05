<template>
  <BaseContainer>
    <div class="flex flex-col gap-6">
      <h1 class="text-3xl">Проведение ТО и мелкий ремонт</h1>
      <BaseNav :title-table="titlesTableVeiw" />
      <BaseCard base> aasdasd</BaseCard>
      <BaseCard base>
        <BaseTable :columns="columns" :rows="rows" />
      </BaseCard>
    </div>
  </BaseContainer>
</template>

<script lang="ts" setup>
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseNav from '@/components/base/BaseNav.vue'

import { reactive } from 'vue'

const titlesTableVeiw = reactive([
  { name: 'Общее', value: 'common' },
  { name: 'Товары', value: 'gds' },
  { name: 'Доп. расходы', value: 'exps' }
])

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
</script>
<style scoped></style>
