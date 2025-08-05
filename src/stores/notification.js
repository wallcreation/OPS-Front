// stores/notification.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const queue = ref([])
  const show = ref(false)
  const message = ref('')
  const type = ref('info') // 'success', 'error', 'warning', 'info'
  let timer = null

  function notify(msg, msgType = 'info') {
    queue.value.push({ msg, msgType })
    if (!show.value) {
      displayNext()
    }
  }

  function displayNext() {
    if (queue.value.length === 0) return

    const next = queue.value.shift()
    message.value = next.msg
    type.value = next.msgType
    show.value = true

    clearTimeout(timer)
    timer = setTimeout(() => {
      show.value = false
      displayNext()
    }, 2000)
  }

  function reset() {
    queue.value = []
    show.value = false
    message.value = ''
    type.value = 'info'
    clearTimeout(timer)
  }

  return {
    show,
    message,
    type,
    notify,
    reset,
  }
})
