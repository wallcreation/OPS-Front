<script setup>
import { RouterView } from 'vue-router'
import AdminSide from '@/components/AdminSide.vue'
</script>
<template>
  <main class="flex h-screen text-[#EDE9FE]">
    <AdminSide class="w-1/6 rounded-r-lg"/>
    <section class="w-5/6 p-1 m-1 overflow-y-hidden">
      <RouterView />
    </section>
  </main>
</template>
