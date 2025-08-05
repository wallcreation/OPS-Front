<script setup>
import { addOperatorPenalty, safeCall } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { ref } from 'vue'

const emit = defineEmits(['close', 'created'])
const props = defineProps({ operatorid: { type: String, required: true } })
const amount = ref(0)
const reason = ref('')
const loading = ref(false)
const notification = useNotificationStore()
async function addPenality() {
  loading.value = true
  const data = {
    operator_id: props.operatorid,
    amount: amount.value,
    reason: reason.value,
  }
  const [res, err] = await safeCall(addOperatorPenalty(data))
  if (res) {
    notification.notify('Pénalités créé', 'success')
    emit('created')
    emit('close')
  } else {
    notification.notify('Ereur lors de la création', 'error')
    emit('close')
  }
}
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-sm">
    <div class="w-full max-w-lg mx-4 bg-surface border border-border rounded-xl p-4">
      <div class="mb-2 flex items-center justify-between">
        <h2 class="text-xl font-bold text-text">Ajouter une pénalité</h2>
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
      <form class="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <!-- Champ raison -->
        <input
          v-model="reason"
          type="text"
          placeholder="Raison"
          required
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent"
        />
        <!-- Champ montant -->
        <input
          v-model="amount"
          type="number"
          placeholder="Montant"
          required
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent"
        />
        <div class="sm:col-span-2 flex justify-end gap-3 mt-2">
          <!-- Bouton pour ajouter la pénalité -->
          <button
            class="px-2 py-1 border-2 rounded-lg border-primary hover:border-primary-dark hover:bg-primary-dark"
            :disabled="loading"
            :class="loading ? 'animate-pulse' : ''"
            @click.prevent="addPenality"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
