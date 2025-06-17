<script setup>
import AdminSide from '@/components/AdminSide.vue'
</script>

<template>
  <div class="flex">
    <AdminSide class="w-1/6 h-screen fixed top-0 left-0" />
    <main class="ml-[16.666667%] w-5/6 p-4">
      <slot />
    </main>
  </div>
</template>
