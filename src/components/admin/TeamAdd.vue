<script setup>
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'
const emit = defineEmits(['created', 'close'])
const stores = useAppStore()
const error = ref(false)
const errormsg = ref('')
const loading = ref(false)
const teamipt = ref('')
// Functions
const add_team = async () => {
  if (teamipt.value.trim() === '') {
    error.value = true
    errormsg.value = 'Le champ ne peut être vide'
    setTimeout(() => {
      error.value = false
    }, 3000)
  }
  stores.createTeamAPI({ name: teamipt.value })
  emit('close')
}
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
    <div
      v-if="loading"
      class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border backdrop-blur-md animate-bounce"
    >
      <h1 class="text-xl text-center">Ajout en cours, veuillez patienter...</h1>
    </div>
    <div v-else class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border bg-surface">
      <h1 class="text-xl font-bold">Ajouter une équipe</h1>
      <form action="" class="my-2">
        <input
          type="text"
          name="tname"
          id="tname"
          required
          placeholder="Nom de la nouvelle équipe"
          v-model="teamipt"
          :class="
            error
              ? 'border-error focus:border-error hover:border-error-dark'
              : 'border-border focus:border-primary hover:border-primary-dark'
          "
          class="w-full border-b-2 outline-none"
        />
      </form>
      <p v-if="error" class="bg-error-dark rounded-lg text-center">{{ errormsg }}</p>
      <div class="flex gap-2 justify-end mt-1">
        <button
          @click="add_team"
          class="px-2 border-2 border-primary rounded-lg hover:border-primary-dark hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Valider
        </button>
        <button
          @click="emit('close')"
          class="px-2 border-2 border-error rounded-lg hover:border-error-dark hover:bg-error-dark"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>
