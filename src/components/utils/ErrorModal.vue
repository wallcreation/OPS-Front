<script setup>
import { onMounted } from 'vue'
const emit = defineEmits(['close'])
const props = defineProps({
  error: {
    type: String,
    required: true,
  },
})

// onMounted(async () => {
//   setTimeout(() => {
//     emit('close')
//   }, 10000)
// })
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
    <div class="px-5 py-3 m-4 text-center border-2 border-border rounded-lg bg-surface">
      <h1 class="text-xl mb-1 text-text">Une erreur est survenu</h1>
      <p class="text-error underline underline-offset-1 font-bold">{{ error }}</p>
      <button
        @click="emit('close')"
        class="mt-1 mx-auto px-2 text-text border-2 border-primary rounded-lg hover:border-primary-dark hover:bg-primary-dark"
      >
        Fermer
      </button>
    </div>
  </div>
</template>
