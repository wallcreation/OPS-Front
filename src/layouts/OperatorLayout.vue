<script setup>
import { useSessionStore } from '@/stores/session'
import { useErrorStore } from '@/stores/error'
import { RouterView } from 'vue-router'
import Header from '@/components/ops/Header.vue'
import ErrorModal from '@/components/utils/ErrorModal.vue'
import SessionExpired from '@/components/utils/SessionExpired.vue'
import Notification from '@/components/utils/Notification.vue'
const error = useErrorStore()
const session = useSessionStore()
</script>

<template>
  <Header :profile="session.user" class="h-[8%] md:h-[10%] w-full text-text" />
  <main class="h-[90%] w-full overflow-auto px-1 text-text">
    <RouterView />
  </main>
  <Notification />
  <ErrorModal v-if="error.showErrorModal" :error="error.error" @close="error.clearError" />
  <SessionExpired v-if="session.showExpiredModal" @close="session.hideSessionExpired" />
</template>
