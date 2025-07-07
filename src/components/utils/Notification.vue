<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notification = useNotificationStore()

const bgColor = computed(() => {
  switch (notification.type) {
    case 'success':
      return 'bg-green-600'
    case 'error':
      return 'bg-red-600'
    case 'warning':
      return 'bg-yellow-600 text-black'
    case 'info':
    default:
      return 'bg-blue-600'
  }
})
</script>
<template>
  <transition name="slide-fade">
    <div
      v-if="notification.show"
      class="fixed bottom-4 right-4 px-4 py-2 rounded-lg border-2 border-border text-white z-50"
      :class="bgColor"
    >
      <p class="text-sm">{{ notification.message }}</p>
    </div>
  </transition>
</template>


<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
