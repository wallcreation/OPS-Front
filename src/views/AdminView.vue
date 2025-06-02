<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { onMounted } from 'vue'
import AdminHeader from '@/components/AdminHeader.vue'
onMounted(() => {})
</script>

<template>
  <AdminHeader />
  <main class="bg-[url('/generalbg.jpg')] bg-cover h-screen w-full">
    <p>dashboard</p>
  </main>
</template>
