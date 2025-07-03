import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const showExpiredModal = ref(false)
  const triggerSessionExpired = () => {
    showExpiredModal.value = true
  }
  const hideSessionExpired = () => {
    showExpiredModal.value = false
  }

  return { showExpiredModal, triggerSessionExpired, hideSessionExpired }
})
