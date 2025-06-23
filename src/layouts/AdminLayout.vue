<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/admin/Header.vue'
</script>
<template>
  <header class="w-screen bg-surface px-4 py-2 flex items-center justify-between text-text">
    <Header />
  </header>
  <main class="h-full mx-5 text-text">
    <RouterView />
  </main>
</template>
