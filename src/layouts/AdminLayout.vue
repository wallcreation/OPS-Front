<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/admin/Header.vue'
</script>
<template>
  <header class="w-full bg-surface px-4 py-2 flex items-center justify-between text-text motion-translate-y-in-100">
    <Header />
  </header>
  <main class="w-full px-5 text-text motion-translate-y-in-100">
    <RouterView />
  </main>
</template>
