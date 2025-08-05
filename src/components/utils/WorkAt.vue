<script setup>
import 'primeicons/primeicons.css'
const props = defineProps({
  work_at: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <p class="flex">
    <i v-if="work_at === 'day'" class="pi pi-sun" size="24" color="primary"/>
    <i v-else class="pi pi-moon" size="24" color="primary"/>
    <span class="ml-3">{{ work_at }}</span>
  </p>
</template>
