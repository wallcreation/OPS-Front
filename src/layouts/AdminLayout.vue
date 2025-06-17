<script setup>
import { RouterView } from 'vue-router';
import AdminSide from '@/components/AdminSide.vue'
</script>
<template>
  <div class="flex h-screen">
    <AdminSide class="w-1/6" />
    <RouterView/>
  </div>
</template>
