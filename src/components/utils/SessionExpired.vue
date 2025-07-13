<script setup>
import { clearProfile } from '@/api'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const emit = defineEmits(['close'])

const router = useRouter()

const reconnect = () => {
  clearProfile()
  emit('close') // cacher le composant
  router.push('/login')
}

onMounted( () => {
  setTimeout(() => {
    reconnect
  }, 5000);
})
</script>

<template>
  <div
    class="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 h-screen w-screen"
  >
    <div class="flex flex-col items-center justify-center border-2 border-border rounded-lg bg-surface text-text p-6 max-w-sm w-full text-center">
      <h2 class="text-xl font-semibold mb-2 text-warning">Session expirée</h2>
      <p class="text-muted mb-4">Vous serez redirigé vers la page de connexion dans quelques secondes.</p>
      <button
        @click="reconnect"
        class="px-4 py-2 rounded-lg border-2 border-primary hover:border-primary-dark hover:bg-primary-light text-white hover:text-bg transition"
      >
        Se reconnecter maintenant
      </button>
    </div>
  </div>
</template>
