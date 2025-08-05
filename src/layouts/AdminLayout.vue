<script setup>
import { RouterView } from 'vue-router'
import { useErrorStore } from '@/stores/error'
import { useSessionStore } from '@/stores/session'
import ErrorModal from '@/components/utils/ErrorModal.vue'
import Header from '@/components/admin/Header.vue'
import Notification from '@/components/utils/Notification.vue'
import SessionExpired from '@/components/utils/SessionExpired.vue'
import { ref, onMounted, watch } from 'vue'

const session = useSessionStore()
const error = useErrorStore()
const isSidebarOpen = ref(false)
const isDarkMode = ref(false)


// Charger le mode préféré au chargement
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    isDarkMode.value = JSON.parse(savedMode)
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }
})

// Suivre les préférences système
watch(isDarkMode, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <header
      class=" w-full bg-surface flex items-center justify-between text-text shadow-md"
    >
      <Header />
    </header>
    <main class="h-[90%] w-full overflow-auto px-1 text-text">
      <RouterView />
    </main>
  </div>

  <Notification />
  <ErrorModal v-if="error.showErrorModal" :error="error.error" @close="error.clearError"/>
  <SessionExpired v-if="session.showExpiredModal" @close="session.hideSessionExpired" />
</template>
