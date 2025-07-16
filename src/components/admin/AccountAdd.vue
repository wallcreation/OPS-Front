<script setup>
import { ref } from 'vue'
import { createAccount, safeCall } from '@/api'
import TeamSelector from './TeamSelector.vue'
import { useAppStore } from '@/stores/app'
const props = defineProps({
  teams: Array,
})
const emit = defineEmits(['close', 'created'])
// Variable
const accountipt = ref('')
const loading = ref(false)
const error = ref([false, ''])
const stores = useAppStore()

const addaccount = async () => {
  if (!accountipt.value) {
    error.value = [true, 'Le nom du compte ne peut être vide']
    setTimeout(() => {
      error.value = [false, '']
    }, 5000)
    return
  }
  stores.createAccountAPI({ name: accountipt.value })
  emit('close')
}

</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
    <div class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border bg-surface">
      <h1 class="text-xl text-center font-bold">Ajouter un compte</h1>
      <form action="">
        <input
          type="text"
          name="aname"
          id="aname"
          required
          placeholder="Nom du compte"
          v-model="accountipt"
          class="w-full mb-2 border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
      </form>
      <div v-if="error[0]" class="w-full rounded-lg bg-error">
        <p class="text-lg text-center">{{ error[1] }}</p>
      </div>
      <div class="flex gap-2 items-center justify-end mt-1">
        <button
          @click="addaccount"
          class="px-2 border-2 border-primary rounded-lg hover:border-primary-dark hover:bg-primary-dark"
          :class="loading ? 'animate-pulse' : ''"
          :disabled="loading"
        >
          {{ loading ? 'Créaton..' : 'Valider' }}
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
