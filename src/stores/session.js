// stores/session.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const showExpiredModal = ref(false)

  const user = ref(null)        // Contiendra l'ID ou les infos du user
  const role = ref(null)        // 'admin', 'operateur', etc.
  const token = ref(null)       // Token JWT

  // Gérer l’expiration de session
  const triggerSessionExpired = () => {
    clearSession()
    showExpiredModal.value = true
  }

  const hideSessionExpired = () => {
    showExpiredModal.value = false
  }

  // Enregistre les infos de session
  const setSession = ({ user: u, role: r, token: t }) => {
    user.value = u
    role.value = r
    token.value = t
  }

  // Réinitialise tout
  const clearSession = () => {
    user.value = null
    role.value = null
    token.value = null
  }

  return {
    user,
    role,
    token,
    showExpiredModal,
    triggerSessionExpired,
    hideSessionExpired,
    setSession,
    clearSession
  }
}, {
  persist: true // ← Nécessite pinia-plugin-persistedstate
})
