<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

const emit = defineEmits(['created', 'close'])
const stores = useAppStore()

const loading = ref(false)
const error = ref(false)
const errormsg = ref('')
const accountipt = ref('')
const tariff = ref(35) // 👈 Champ tarif

const addaccount = async () => {
  if (accountipt.value.trim() === '') {
    error.value = true
    errormsg.value = 'Tous les champs sont obligatoires'
    setTimeout(() => {
      error.value = false
    }, 3000)
    return
  }


  loading.value = true
  try {
    await stores.createAccountAPI({
      name: accountipt.value,
      rates: tariff.value,
    })
    emit('created')
    emit('close')
  } catch (e) {
    errormsg.value = 'Erreur lors de la création du compte'
    error.value = true
    loading.value = false
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4"
    @click.self="emit('close')"
  >
    <!-- Loading -->
    <div
      v-if="loading"
      class="w-full max-w-sm p-6 rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg animate-pulse text-white text-center"
    >
      <p class="text-lg font-semibold mb-2">Ajout en cours...</p>
      <p class="text-zinc-400">Veuillez patienter</p>
    </div>

    <!-- Form -->
    <div
      v-else
      class="w-full max-w-lg bg-zinc-900 text-white rounded-xl border border-zinc-700 shadow-lg p-6"
    >
      <h2 class="text-xl font-bold mb-4">Ajouter un nouveau compte</h2>

      <form @submit.prevent="addaccount" class="space-y-4">
        <!-- Nom du compte -->
        <div>
          <label for="aname" class="block text-sm mb-1">Nom du compte</label>
          <input
            id="aname"
            v-model="accountipt"
            type="text"
            placeholder="Nom du compte"
            class="w-full px-4 py-2 rounded-md bg-zinc-800 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
          />
        </div>

        <!-- Tarif -->
        <div>
          <label for="atariff" class="block text-sm mb-1">Tarif (FCFA/Message)</label>
          <input
            id="atariff"
            v-model="tariff"
            type="number"
            min="30"
            max="40"
            step="5"
            placeholder="Tarif en euros"
            class="w-full px-4 py-2 rounded-md bg-zinc-800 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
          />
        </div>

        <!-- Message d'erreur -->
        <p v-if="error" class="text-red-400 mt-1 text-sm">{{ errormsg }}</p>

        <!-- Boutons -->
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
