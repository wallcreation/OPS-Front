<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const reconnect = () => {
  router.push('/login')
}

onMounted(() => {
  setTimeout(() => {
    reconnect()
  }, 5000) // redirection automatique après 5 secondes
})
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 h-screen w-screen">
    <div class="flex flex-col items-center justify-center bg-surface text-text p-6 rounded-2xl max-w-sm w-full text-center">
      <h2 class="text-xl font-semibold mb-2 text-warning">Session expirée</h2>
      <p class="text-muted mb-4">Vous serez redirigé vers la page de connexion dans quelques secondes.</p>
      <button
        @click="reconnect"
        class="px-4 py-2 rounded-lg bg-surface hover:bg-primary-light text-white hover:text-bg transition"
      >
        Se reconnecter maintenant
      </button>
    </div>
  </div>
</template>

<style scoped></style>
