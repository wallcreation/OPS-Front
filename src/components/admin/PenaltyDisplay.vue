<script setup>
import { ref } from 'vue'

const props = defineProps({
  penalties: {
    type: Object, // format attendu : { "2025-07-13": [ {...}, {...} ], ... }
    required: true,
  },
  stores: {
    type: Object,
    required: true,
  },
})

const showModal = ref(false)
const selectedPenalty = ref(null)
const selectedDate = ref('')

function openModal(penalty, date) {
  selectedPenalty.value = penalty
  selectedDate.value = date
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedPenalty.value = null
}
</script>

<template>
  <div v-if="penalties" class="space-y-3">
    <div v-for="(penaltyList, date) in penalties" :key="date">
      <h2 class="text-xl font-semibold text-muted mb-1">
        {{ new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' }) }}
      </h2>

      <div class="grid md:grid-cols-2 gap-2 mb-1">
        <div
          v-for="penalty in penaltyList"
          :key="penalty.id"
          class="bg-surface border border-border rounded-lg p-2 shadow-sm"
        >
          <div class="flex justify-between items-center">
            <p class="text-text font-medium">
              {{ stores.getOperatorById(penalty.operator_id)?.fname || 'Inconnu' }}
            </p>
            <button
              class="text-muted hover:text-primary-dark"
              @click="openModal(penalty, date)"
              title="Voir les détails"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                  10-10S17.52 2 12 2zm0 18c-4.41 
                  0-8-3.59-8-8s3.59-8 8-8 8 3.59 
                  8 8-3.59 8-8 8zm1-13h-2v2h2V7zm0 
                  4h-2v6h2v-6z"
                />
              </svg>
            </button>
          </div>
          <p class="text-sm no-wrap">
            <strong class="font-bold">{{ penalty.amount }}</strong> FCFA — <em>{{ penalty.reason }}</em>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-muted text-center py-4">Aucune pénalité trouvée.</div>

  <!-- ✅ Modale -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center"
    @click.self="closeModal"
  >
    <div class="bg-surface border border-warning rounded-lg p-4 w-full max-w-md">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-bold text-warning">Détails de la pénalité</h2>
        <button @click="closeModal" class="text-error hover:text-error-dark text-xl">×</button>
      </div>

      <div class="space-y-2 text-text">
        <p>
          <span class="font-semibold">Opérateur :</span>
          {{ stores.getOperatorById(selectedPenalty?.operator_id)?.fullname || 'Inconnu' }}
        </p>
        <p>
          <span class="font-semibold">Montant :</span>
          {{ selectedPenalty?.amount }} FCFA
        </p>
        <p>
          <span class="font-semibold">Raison :</span>
          {{ selectedPenalty?.raison }}
        </p>
        <p>
          <span class="font-semibold">Date :</span>
          {{ new Date(selectedPenalty?.created_at).toLocaleString('fr-FR') }}
        </p>
      </div>

      <div class="mt-3 text-right">
        <button
          @click="closeModal"
          class="px-3 py-1 bg-warning text-white rounded hover:bg-warning-dark"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
