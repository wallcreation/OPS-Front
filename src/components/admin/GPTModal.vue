<script setup>
defineProps({
  show: Boolean,
})
const emit = defineEmits(['close'])

const close = () => {
  // émet l'événement "close" pour que le parent ferme la modal
  emit('close')
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="bg-surface text-text rounded-2xl p-6 max-w-lg w-full">
      <!-- Slot pour contenu dynamique -->
      <slot />
      <!-- Bouton de fermeture -->
      <div class="mt-4 text-right">
        <button @click="close" class="text-sm text-error hover:underline">Fermer</button>
      </div>
    </div>
  </div>
</template>