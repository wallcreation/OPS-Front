// stores/error.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const error = ref(null)
  const showErrorModal = ref(false)

  function triggerError(message) {
    error.value = message
    showErrorModal.value = true
  }

  function clearError() {
    error.value = null
    showErrorModal.value = false
  }

  return { error, showErrorModal, triggerError, clearError }
})
