<script setup>
import { RouterView } from 'vue-router'
import { useErrorStore } from '@/stores/error'
import { useSessionStore } from '@/stores/useSessionStore'
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
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <!-- Sidebar -->
    <aside 
      class="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 z-50"
      :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
    >
      <div class="h-16 flex items-center justify-center border-b border-gray-300 dark:border-gray-700">
        <span class="text-xl font-bold flex items-center text-gray-800 dark:text-white"><img src="../assets/ops_white.png" alt="" height="120" width="120"> Admin</span>
      </div>
      <nav class="mt-4">
        <ul class="space-y-2">
          <li>
            <a href="#" class="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Utilisateurs
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Paramètres
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-800 shadow dark:shadow-gray-900">
        <button 
          @click="toggleSidebar"
          class="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        
        <Header />

      </header>

      <!-- Main Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="container mx-auto px-6 py-8">
          <RouterView />
        </div>
      </main>
    </div>

    <!-- Mobile Overlay -->
    <div 
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-bg/50 backdrop-blur-md z-40"
      @click="isSidebarOpen = false"
    ></div>
  </div>

  <Notification />
  <ErrorModal v-if="error.showErrorModal" :error="error.error" @close="error.clearError"/>
  <SessionExpired v-if="session.showExpiredModal" @close="session.hideSessionExpired" />
</template>
