import { refresh } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isRefreshing = ref(false)
  const refreshQueue = []

  function waitQueue() {
    return new Promise(resolve => refreshQueue.push(resolve))
  }

  function resolveQueue() {
    refreshQueue.forEach(res => res())
    refreshQueue.length = 0
  }

  async function refreshTokens() {
    if (isRefreshing.value) {
      return await waitQueue()
    }

    isRefreshing.value = true
    try {
      refresh() // ton backend renvoie les tokens dans les headers
    } catch (e) {
      console.error('Échec du rafraîchissement des tokens', e)
    } finally {
      isRefreshing.value = false
      resolveQueue()
    }
  }

  return {
    isRefreshing,
    refreshTokens,
  }
}, { persist: true })
