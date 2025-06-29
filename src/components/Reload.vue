<script setup>
defineProps({
  show: Boolean,
})
const emit = defineEmits(['accept', 'cancel'])
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center bg-surface/50 backdrop-blur-md"
  >
    <h2 class="text-center text-text">Impossible de joindre le serveur, recharger la page ?</h2>
    <div>
      <button
        @click="emit('accept')"
        class="mx-1 px-5 py-2 border-2 border-primary rounded-lg hover:bg-primary-dark hover:text-bg hover:border-none active:bg-primary-dark active:text-bg active:border-none"
      >
        Oui
      </button>
      <button
        @click="emit('cancel')"
        class="mx-1 px-5 py-2 border-2 border-error rounded-lg hover:bg-error-dark hover:text-bg hover:border-none active:bg-error-dark active:text-bg active:border-none"
      >
        Non
      </button>
    </div>
  </div>
</template>
