<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/admin/Header.vue'
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <header class="h-[10%] w-full bg-surface px-4 py-2 flex items-center justify-between text-text shadow-md">
      <Header />
    </header>
    <main class="h-[90%] w-full overflow-auto px-5 text-text">
      <RouterView />
    </main>
  </div>
</template>
