<script setup>
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'

const emit = defineEmits(['created', 'close'])
const stores = useAppStore()

const error = ref(false)
const errormsg = ref('')
const loading = ref(false)
const teamipt = ref('')

const add_team = async () => {
  if (teamipt.value.trim() === '') {
    error.value = true
    errormsg.value = 'Le champ ne peut être vide'
    setTimeout(() => {
      error.value = false
    }, 3000)
    return
  }

  loading.value = true
  try {
    await stores.createTeamAPI({ name: teamipt.value })
    emit('created')
    emit('close')
  } catch (err) {
    errormsg.value = 'Erreur lors de la création'
    error.value = true
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md  p-4"
  @click.self="emit('close')">
    <!-- Loading state -->
    <div
      v-if="loading"
      class="w-full max-w-sm p-6 rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg animate-pulse text-white text-center"
    >
      <p class="text-lg font-semibold mb-2">Ajout en cours...</p>
      <p class="text-zinc-400">Veuillez patienter</p>
    </div>

    <!-- Form modal -->
    <div
      v-else
      class="w-full max-w-lg bg-zinc-900 text-white rounded-xl border border-zinc-700 shadow-lg p-6"
    >
      <h2 class="text-xl font-bold mb-4">Ajouter une nouvelle équipe</h2>

      <form @submit.prevent="add_team" class="space-y-4">
        <div>
          <label for="tname" class="block text-sm mb-1">Nom de l'équipe</label>
          <input
            id="tname"
            v-model="teamipt"
            type="text"
            placeholder="Nom de la nouvelle équipe"
            class="w-full px-4 py-2 rounded-md bg-zinc-800 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-150 ease-in-out"
            :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
          />
          <p v-if="error" class="text-red-400 mt-1 text-sm">{{ errormsg }}</p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 rounded-md border border-zinc-600 text-zinc-300 hover:bg-zinc-700 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded-md bg-primary hover:bg-primary-dark text-white transition"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
