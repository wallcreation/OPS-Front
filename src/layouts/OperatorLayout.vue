<script setup>
import { useSessionStore } from '@/stores/session'
import { useErrorStore } from '@/stores/error'
import { RouterView } from 'vue-router'
import Header from '@/components/ops/Header.vue'
import ErrorModal from '@/components/utils/ErrorModal.vue'
import SessionExpired from '@/components/utils/SessionExpired.vue'
const error = useErrorStore()
const session = useSessionStore()
</script>

<template>
  <Header :profile="session.user" class="text-text" />
  <div class="p-2 text-text">
    <RouterView />
  </div>
  <ErrorModal v-if="error.showErrorModal" :error="error.error" @close="error.clearError" />
  <SessionExpired v-if="session.showExpiredModal" @close="session.hideSessionExpired" />
</template>
