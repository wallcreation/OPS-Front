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
      <div class="flex justify-between">
        <h1 class="text-xl text-center font-bold">Ajouter un compte</h1>
        <button @click="emit('close')" class="text-error hover:text-error-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
            />
          </svg>
        </button>
      </div>
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
          class="ml-auto px-2 outline-2 outline-primary outline-offset-2 rounded hover:bg-primary-dark hover:outline-primary-dark"
          :class="loading ? 'animate-pulse' : ''"
          :disabled="loading"
        >
          {{ loading ? 'Créaton..' : 'Valider' }}
        </button>

      </div>
    </div>
  </div>
</template>
