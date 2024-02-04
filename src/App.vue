<template>
  <component :is="layout" v-if="layout" />
</template>

<script setup lang="ts">
import { computed, shallowRef, unref } from 'vue'
import { useRoute } from 'vue-router'
import Main from '@/layouts/MainLayout.vue'

const route = useRoute()
const main = shallowRef(Main)

const layout = computed(() => {
  if (route.meta.layout === 'main') return unref(main)
})
</script>

<style lang="scss"></style>
