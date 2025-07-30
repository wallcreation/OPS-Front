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
    operator_id: operatorid,
    amount: amount.value,
    reason: reason.value,
  }
  const [res, err] = await safeCall(addOperatorPenalty(data))
  if(res) {
    notification.notify("Pénalités créé")
    emit("created")
  } else {
    notification.notify("Ereur lors de la création", 'error')
    emit("close")
  }
}
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-sm">
    <div class="w-full max-w-lg mx-4 bg-surface border border-border rounded-xl p-4">
      <h2 class="text-xl font-bold text-text mb-4">Ajouter une pénalité</h2>
      <form class="grid gap-3">
        <!-- Champ raison -->
        <input
          v-model="reason"
          type="text"
          placeholder="Raison"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <!-- Champ montant -->
        <input
          v-model="amount"
          type="number"
          placeholder="Montant"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <div class="flex justify-end gap-3 mt-2">
          <!-- Bouton pour ajouter la pénalité -->
          <button
            class="text-primary hover:border-b-2 hover:border-primary-light"
            @click.prevent="addPenality"
          >
            Ajouter
          </button>
          <!-- Bouton pour fermer la modale -->
          <button
            class="text-error hover:border-b-2 hover:border-error"
            @click="emit('close')"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
