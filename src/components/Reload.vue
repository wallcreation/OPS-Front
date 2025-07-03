<script setup>
defineProps({
  show: Boolean,
})
const emit = defineEmits(['accept', 'cancel'])
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center backdrop-blur-md"
  >
    <div class="flex flex-col gap-2 items-center justify-center">
      <h2 class="text-center text-text">Impossible de joindre le serveur, recharger la page ?</h2>
      <div>
        <button
          @click="emit('accept')"
          class="mx-1 px-5 py-2 border-2 border-primary rounded-lg hover:border-primary-dark hover:text-bg hover:bg-primary-dark active:bg-primary-dark active:text-bg active:border-primary-dark"
        >
          Oui
        </button>
        <button
          @click="emit('cancel')"
          class="mx-1 px-5 py-2 border-2 border-error rounded-lg hover:bg-error-dark hover:text-bg hover:border-error-dark active:bg-error-dark active:text-bg active:border-error-dark"
        >
          Non
        </button>
      </div>
    </div>
  </div>
</template>
