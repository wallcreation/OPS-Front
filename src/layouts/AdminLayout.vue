<script setup>
import { RouterView } from 'vue-router';
import AdminSide from '@/components/AdminSide.vue'
</script>
<template>
  <div class="flex h-screen text-[#E0E0E0]">
    <AdminSide class="w-1/6" />
    <RouterView class="w-5/6 h-screen my-2"/>
  </div>
</template>
