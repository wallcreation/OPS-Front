<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/admin/Header.vue'
import SessionExpired from '@/components/utils/SessionExpired.vue'
import { useSessionStore } from '@/stores/useSessionStore'
import { useErrorStore } from '@/stores/error'
import ErrorModal from '@/components/utils/ErrorModal.vue'
const session = useSessionStore()
const error = useErrorStore()
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <header
      class="h-[10%] w-full bg-surface px-4 py-2 flex items-center justify-between text-text shadow-md"
    >
      <Header />
    </header>
    <main class="h-[90%] w-full overflow-auto px-1 text-text">
      <RouterView />
    </main>
  </div>
  <ErrorModal v-if="error.showErrorModal" :error="error.error" @close="error.clearError"/>
  <SessionExpired v-if="session.showExpiredModal" @close="session.hideSessionExpired" />
</template>
