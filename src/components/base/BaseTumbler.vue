<template>
  <div class="flex gap-4">
    <input
      type="radio"
      id="week"
      v-model="time"
      name="week"
      value="week"
      class="hidden"
      @click="emit('week')"
    />
    <label for="week" class="radio" :class="{ 'active-radio': time === 'week' }"> 1 Week </label>
    <input
      type="radio"
      id="two_week"
      v-model="time"
      name="two_week"
      value="two_week"
      class="hidden"
      @click="emit('two_week')"
    />
    <label for="two_week" class="radio" :class="{ 'active-radio': time === 'two_week' }">
      2 Week
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['week', 'two_week'])

const time = ref('week')
</script>

<style scoped lang="scss">
.radio {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 48px;
  border-radius: 100px;
  font-size: 20px;
  font-weight: 600;
  border: 2px solid #8d92ff;
  cursor: pointer;
  &:hover {
    background-color: rgb(141, 146, 255, 0.1);
  }
  @media (min-width: 768px) {
    width: 170px;
  }
}

.active-radio {
  background-color: #8d92ff;
  &:hover {
    background-color: #8d92ff;
  }
}
</style>
