<script setup>
import { RouterView } from 'vue-router'
import { useErrorStore } from '@/stores/error'
import { useSessionStore } from '@/stores/useSessionStore'
import ErrorModal from '@/components/utils/ErrorModal.vue'
import Header from '@/components/admin/Header.vue'
import Notification from '@/components/utils/Notification.vue'
import SessionExpired from '@/components/utils/SessionExpired.vue'
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
  <Notification />
  <ErrorModal v-if="error.showErrorModal" :error="error.error" @close="error.clearError"/>
  <SessionExpired v-if="session.showExpiredModal" @close="session.hideSessionExpired" />
</template>
